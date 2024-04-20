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
  render();
});
document.getElementById("multi-h").addEventListener("input", () => {
  spritesheet.meta.multiplier.h = +document.getElementById("multi-h").value;
  document.getElementById("multi-h-value").innerText =
    spritesheet.meta.multiplier.h;
  render();
});