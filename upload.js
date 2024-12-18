const hello = document.getElementById("hello");
let loading = false;
document.body.ondragover = (e) => e.preventDefault();
document.body.ondrop = async (ev) => {
  ev.preventDefault();
  if (loading) {
    return;
  }
  loading = true;
  hello.innerText = "Loading...";
  let importing = [];
  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        importing.push(file);
      }
    });
  } else {
    [...ev.dataTransfer.files].forEach((file, i) => {
      importing.push(file);
    });
  }

  const jsonFile = importing.findIndex((f) => f.name === "spritesheet.json");
  const imgFile = importing.findIndex((f) => f.name === "spritesheet.png");

  if (jsonFile !== -1 && imgFile !== -1) {
    const json = JSON.parse(await SFR.text(importing[jsonFile]));
    const img = await loadImage(
      new Blob([await SFR.arrayBuffer(importing[imgFile])], {
        type: importing[imgFile].type,
      })
    );

    const frames = Object.keys(json.frames);

    async function loop(id) {
      if (!frames[id]) return;

      let { frame, original } = json.frames[frames[id]];

      canvas.width = frame.w;
      canvas.height = frame.h;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        img,
        frame.x,
        frame.y,
        frame.w,
        frame.h,
        0,
        0,
        frame.w,
        frame.h
      );
      const blob = await canvas2blob(canvas);
      const file = await loadImage(blob);
      const alreadyExists = files.findIndex((f) => f.name === frames[id]);
      if (alreadyExists !== -1) files.splice(alreadyExists, 1);
      files.push({
        file,
        blob,
        frame: {
          w: file.width,
          h: file.height,
        },
        name: frames[id],
      });

      return loop(id + 1);
    }
    await loop(0);
  }

  await Promise.all(
    importing
      .filter(
        (i) =>
          i.name !== "spritesheet.png" &&
          i.name !== "spritesheet.json" &&
          i.name.endsWith(".png")
      )
      .map(async (file) => {
        const blob = new Blob([await SFR.arrayBuffer(file)], {
          type: file.type,
        });
        const img = await loadImage(blob);
        const alreadyExists = files.findIndex((f) => f.name === file.name);
        if (alreadyExists !== -1) files.splice(alreadyExists, 1);
        files.push({
          file: img,
          blob,
          frame: {
            w: img.width,
            h: img.height,
          },
          name: file.name,
        });
      })
  );
  sorting();

  loading = false;
  hello.innerHTML =
    "Drop (<b>spritesheet.json</b> and <b>spritesheet.png</b>) OR <b>png-sprites</b>";
};
