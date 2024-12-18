let renderAspect = 1;
const selectedFileElement = document.getElementById("selected-file");
const render = () => {
  for (let i = 0; i < sorted.length; i++) {
    const { name, frame, file } = sorted[i];
    let { w, h, x, y, pw, ph, px, py } = frame;
    spritesheet.frames[name] = {
      frame: {
        x: px,
        y: py,
        w,
        h,
      },
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
    ctx.clearRect(px, py, w, h);
    ctx.drawImage(file, 0, 0, w, h, px, py, w, h);
  }

  renderAspect = canvas.width / canvas.offsetWidth;
};

let selectedFile = -1,
  mouseX = -1,
  mouseY = -1;

const padding = 10;
const selection = (f, scrilling = false) => {
  if (!f) return;
  render();
  const {
    file,
    frame: { x, y, w, h },
    name,
  } = f;
  [...list.children].map((e) => (e.style.backgroundColor = ""));
  const element = list.querySelector(`tr[data-file="${name}"]`);
  element.style.backgroundColor = "red";
  if (scrilling) list.scrollTo(0, element.offsetTop);
  selectedView.width = w;
  selectedView.height = h;
  selectedViewCtx.clearRect(0, 0, w, h);
  selectedViewCtx.drawImage(file, 0, 0, w, h);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "red";

  ctx.beginPath();

  ctx.moveTo(x + padding, y + padding);
  ctx.lineTo(x + w - padding, y + h - padding);
  ctx.stroke();

  ctx.moveTo(x + w - padding, y + padding);
  ctx.lineTo(x + padding, y + h - padding);
  ctx.stroke();
  selectedFileElement.innerText = `Selected: ${name}`;
};

const findSelection = () => {
  const f = files.findIndex(
    ({ frame: { x, y, w, h }, name }) =>
      mouseX * renderAspect >= x &&
      mouseX * renderAspect <= x + w &&
      mouseY * renderAspect >= y &&
      mouseY * renderAspect <= y + h
  );
  if (f !== -1 && files[f] && selectedFile !== f) {
    selectedFile = f;
    selection(files[selectedFile]);
  }
};

canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
  (mouseX = offsetX), (mouseY = offsetY);
  findSelection();
});

window.addEventListener("resize", () => {
  renderAspect = canvas.width / canvas.offsetWidth;
});
