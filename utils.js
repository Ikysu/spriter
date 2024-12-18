const url = window.URL || window.webkitURL;
let spritesheet = {
  frames: {},
  meta: {
    app: "Spriter by iky.su",
    version: "1.0",
    image: "spritesheet.png",
    format: "RGBA8888",
    size: {
      w: 0,
      h: 0,
    },
    multiplier: {
      w: 1,
      h: 1,
    },
    paddings: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    },
    scale: "1",
  },
};
const files = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const selectedView = document.getElementById("selected-view");
const selectedViewCtx = selectedView.getContext("2d");
selectedView.height = selectedView.clientHeight - 5;

const fixName = (name) => {};
