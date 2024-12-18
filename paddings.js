const reloadPaddingVisualizer = () => {
  const perSprite = document.getElementById(`pd-visual-per_sprite`);

  perSprite.style.paddingTop =
    spritesheet.meta.paddings.top > 0
      ? `${spritesheet.meta.paddings.top}em`
      : "2px";
  perSprite.style.paddingBottom =
    spritesheet.meta.paddings.bottom > 0
      ? `${spritesheet.meta.paddings.bottom}em`
      : "2px";
  perSprite.style.paddingRight =
    spritesheet.meta.paddings.right > 0
      ? `${spritesheet.meta.paddings.right}em`
      : "2px";
  perSprite.style.paddingLeft =
    spritesheet.meta.paddings.left > 0
      ? `${spritesheet.meta.paddings.left}em`
      : "2px";

  const frame = document.getElementById(`pd-visual-frame`);
  frame.style.paddingRight =
    spritesheet.meta.paddings.width > 0
      ? `${spritesheet.meta.paddings.width}em`
      : "1px";
  frame.style.paddingBottom =
    spritesheet.meta.paddings.height > 0
      ? `${spritesheet.meta.paddings.height}em`
      : "1px";
};

Object.keys(spritesheet.meta.paddings).forEach((key) => {
  const padding = document.getElementById(`padding-${key}`);
  padding.value = spritesheet.meta.paddings[key] || 0;
  padding.addEventListener("input", () => {
    const a = String(padding.value);
    if (a.length > 1) padding.value = Number(a[0] || 1);
    spritesheet.meta.paddings[key] = +padding.value;
    reloadPaddingVisualizer();
    sorting();
  });
});
