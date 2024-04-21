let renderAspect = 1;
const selectedFileElement = document.getElementById("selected-file");
const render = () => {
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
    ctx.clearRect(x,y,w,h);
    ctx.drawImage(file, 0, 0, w, h, x, y, w, h);
  }

  renderAspect = canvas.width / canvas.offsetWidth;
};

let selectedFile = -1,
  mouseX = -1,
  mouseY = -1;

const padding = 10;
const selection = (f) => {
  if(!f) return;
  render()
  const { file, frame: { x, y, w, h }, name } = f;
  [...list.children].map(e=>e.style.backgroundColor="")
  list.querySelector(`tr[data-file="${name}"]`).style.backgroundColor="red"
  selectedView.width = w;
  selectedView.height = h;
  selectedViewCtx.clearRect(0, 0, w, h);
  selectedViewCtx.drawImage(file, 0, 0, w, h);
  ctx.drawImage(file, 0, 0, w, h, x, y, w, h);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "red";

  ctx.beginPath();

  ctx.moveTo(x + padding, y + padding);
  ctx.lineTo(x + w - padding, y + h - padding);
  ctx.stroke();

  ctx.moveTo(x + w - padding, y + padding);
  ctx.lineTo(x + padding, y + h - padding);
  ctx.stroke();
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
    selectedFile = f;
    if(!files[selectedFile]) return
    selection(files[selectedFile], false);
    selectedFileElement.innerText = `Selected: ${files[selectedFile].name}`;
  }
};

canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
  (mouseX = offsetX), (mouseY = offsetY);
  findSelection();
});

window.addEventListener("resize", () => {
  renderAspect = canvas.width / canvas.offsetWidth;
});
