const url = window.URL || window.webkitURL;
let spritesheet = {
  frames: {},
  meta: {
    app: "https://spriter.iky.su",
    version: "1.0",
    image: "spritesheet.png",
    format: "RGBA8888",
    size: {
      w: 0,
      h: 0,
    },
    multiplier: {
      w: 4,
      h: 1,
    },
    scale: "1",
  },
};
const files = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
