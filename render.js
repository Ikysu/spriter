let renderAspect = 1;
const selectedFileElement = document.getElementById("selected-file");
const render = () => {
  const sorted = files.sort((a, b) => a.frame.h - b.frame.h).reverse();

  const cW =
      files.reduce((a, b) => a + b.frame.w, 0) / spritesheet.meta.multiplier.w,
    cH =
      files.reduce((a, b) => a + b.frame.h, 0) / spritesheet.meta.multiplier.h;

  const start_node = new Node();
  start_node.rect = new Rect(0, 0, cW, cH);

  let maxWidth = 0;
  let maxHeight = 0;

  for (let i = 0; i < sorted.length; i++) {
    const rect = new Rect(0, 0, sorted[i].frame.w, sorted[i].frame.h);
    const node = start_node.insert_rect(rect).rect;
    sorted[i].frame.x = node.x;
    sorted[i].frame.y = node.y;
    if (maxWidth < sorted[i].frame.x + sorted[i].frame.w)
      maxWidth = sorted[i].frame.x + sorted[i].frame.w;
    if (maxHeight < sorted[i].frame.y + sorted[i].frame.h)
      maxHeight = sorted[i].frame.y + sorted[i].frame.h;
  }

  canvas.width = maxWidth;
  canvas.height = maxHeight;

  spritesheet.meta.size.w = maxWidth;
  spritesheet.meta.size.h = maxHeight;

  for (let i = 0; i < sorted.length; i++) {
    const { name, frame, file } = sorted[i];
    let { w, h, x, y } = frame;
    spritesheet.frames[name] = {
      frame,
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w,
        h,
      },
      sourceSize: {
        w,
        h,
      },
    };

    ctx.drawImage(file, 0, 0, w, h, x, y, w, h);
  }

  renderAspect = canvas.width / canvas.offsetWidth;
};

let selectedFile = -1,
  mouseX = -1,
  mouseY = -1;

const selection = ({ file, frame: { x, y, w, h } }, remove = false) => {
  if (remove) {
    ctx.clearRect(x, y, w, h);
    ctx.drawImage(file, 0, 0, w, h, x, y, w, h);
  } else {
    ctx.drawImage(file, 0, 0, w, h, x, y, w, h);
    const padding = 5;
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.strokeRect(x + padding, y + padding, w - padding * 2, h - padding * 2);

    ctx.beginPath();

    ctx.moveTo(x + padding, y + padding);
    ctx.lineTo(x + w - padding, y + h - padding);
    ctx.stroke();

    ctx.moveTo(x + w - padding, y + padding);
    ctx.lineTo(x + padding, y + h - padding);
    ctx.stroke();
  }
};

const findSelection = () => {
  const f = files.findIndex(
    ({ frame: { x, y, w, h }, name }) =>
      mouseX * renderAspect >= x &&
      mouseX * renderAspect <= x + w &&
      mouseY * renderAspect >= y &&
      mouseY * renderAspect <= y + h
  );
  if (f !== -1 && selectedFile !== f) {
    if (selectedFile !== -1) {
      selection(files[selectedFile], true);
    }
    selectedFile = f;
    selection(files[selectedFile], false);
    selectedFileElement.innerText = `Selected (Ctrl+C to Copy): ${files[selectedFile].name}`;
  }
};

canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
  (mouseX = offsetX), (mouseY = offsetY);
  findSelection(offsetX, offsetY);
});

canvas.addEventListener("click", (e) => {
  if (selectedFile === -1) return;
  files.splice(selectedFile, 1);
  selectedFile = -1;
  render();
  findSelection();
});

window.addEventListener("resize", () => {
  renderAspect = canvas.width / canvas.offsetWidth;
});