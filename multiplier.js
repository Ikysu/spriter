const multiW = document.getElementById("multi-w"),
      multiWvalue = document.getElementById("multi-w-value"),
      multiH = document.getElementById("multi-h"),
      multiHvalue = document.getElementById("multi-h-value");

multiW.value = spritesheet.meta.multiplier.w;
multiWvalue.innerText = spritesheet.meta.multiplier.w;
multiH.value = spritesheet.meta.multiplier.h;
multiHvalue.innerText = spritesheet.meta.multiplier.h;
multiW.addEventListener("input", () => {
  spritesheet.meta.multiplier.w = +multiW.value;
  multiWvalue.innerText = spritesheet.meta.multiplier.w;
  sorting();
});
multiH.addEventListener("input", () => {
  spritesheet.meta.multiplier.h = +multiH.value;
  multiHvalue.innerText = spritesheet.meta.multiplier.h;
  sorting();
});


const decreaseMultiplier = () => {
  const what = spritesheet.meta.multiplier.w >= spritesheet.meta.multiplier.h ? "w" : "h"
  if(what===1) throw new Error("Fuck")
  spritesheet.meta.multiplier[what]--;
  document.getElementById(`multi-${what}`).value = spritesheet.meta.multiplier[what];
  document.getElementById(`multi-${what}-value`).innerText =
    spritesheet.meta.multiplier[what];
}