const sorting = () => {
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
}