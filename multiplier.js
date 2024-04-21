document.getElementById("multi-w").value = spritesheet.meta.multiplier.w;
document.getElementById("multi-w-value").innerText =
  spritesheet.meta.multiplier.w;
document.getElementById("multi-h").value = spritesheet.meta.multiplier.h;
document.getElementById("multi-h-value").innerText =
  spritesheet.meta.multiplier.h;
document.getElementById("multi-w").addEventListener("input", () => {
  spritesheet.meta.multiplier.w = +document.getElementById("multi-w").value;
  document.getElementById("multi-w-value").innerText =
    spritesheet.meta.multiplier.w;
  sorting();
});
document.getElementById("multi-h").addEventListener("input", () => {
  spritesheet.meta.multiplier.h = +document.getElementById("multi-h").value;
  document.getElementById("multi-h-value").innerText =
    spritesheet.meta.multiplier.h;
  sorting();
});


const decreaseMultiplier = () => {
  const what = spritesheet.meta.multiplier.w >= spritesheet.meta.multiplier.h ? "w" : "h"
  if(what===1) return console.error("Fuck")
  spritesheet.meta.multiplier[what]--;
  document.getElementById(`multi-${what}`).value = spritesheet.meta.multiplier[what];
  document.getElementById(`multi-${what}-value`).innerText =
    spritesheet.meta.multiplier[what];
}