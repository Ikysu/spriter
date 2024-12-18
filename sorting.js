let sorted = [];

const preSorting = (mw, mh, padding) => {
  const s = files.sort((a, b) => a.frame.h - b.frame.h).reverse();

  const cW = files.reduce((a, b) => a + b.frame.w, 0) / mw,
    cH = files.reduce((a, b) => a + b.frame.h, 0) / mh;

  const start_node = new Node();
  start_node.rect = new Rect(0, 0, cW, cH);

  let maxWidth = 0;
  let maxHeight = 0;

  let usedS = 0;

  for (let i = 0; i < s.length; i++) {
    const frameW = s[i].frame.w + padding.width + padding.right + padding.left;
    const frameH = s[i].frame.h + padding.height + padding.bottom + padding.top;

    const rect = new Rect(0, 0, frameW, frameH);
    const ir = start_node.insert_rect(rect);
    if (!ir) return;
    const node = ir.rect;
    s[i].frame.x = node.x;
    s[i].frame.y = node.y;
    s[i].frame.px = node.x + padding.left;
    s[i].frame.py = node.y + padding.top;
    s[i].frame.pw = s[i].frame.w + padding.left;
    s[i].frame.ph = s[i].frame.h + padding.top;
    usedS += frameW * frameH;
    if (maxWidth < s[i].frame.x + frameW) maxWidth = s[i].frame.x + frameW;
    if (maxHeight < s[i].frame.y + frameH) maxHeight = s[i].frame.y + frameH;
  }

  if (s.length !== files.length) return;

  return {
    mw,
    mh,
    good: usedS / (maxWidth * maxHeight),
    maxWidth,
    maxHeight,
    s,
  };
};

const sorting = () => {
  delBlock = true;

  let goodest = { mw: 1, mh: 1, good: 0 };
  if (autoGoodest.checked) {
    for (let mw = 1; mw <= 10; mw++) {
      for (let mh = 1; mh <= 10; mh++) {
        const pre = preSorting(mw, mh, spritesheet.meta.paddings);
        if (pre && goodest.good < pre.good) {
          goodest = pre;
        }
      }
    }
    // idk but fix
    goodest = preSorting(goodest.mw, goodest.mh, spritesheet.meta.paddings);
  } else {
    const pre = preSorting(
      spritesheet.meta.multiplier.w,
      spritesheet.meta.multiplier.h,
      spritesheet.meta.paddings
    );
    if (!pre) {
      decreaseMultiplier();
      return sorting();
    }
    goodest = pre;
  }

  const { s, maxWidth, maxHeight, mw, mh } = goodest;

  canvas.width = maxWidth;
  canvas.height = maxHeight;

  ctx.clearRect(0, 0, maxWidth, maxHeight);

  spritesheet.meta.size.w = maxWidth;
  spritesheet.meta.size.h = maxHeight;

  spritesheet.meta.multiplier.w = mw;
  spritesheet.meta.multiplier.h = mh;

  multiW.value = spritesheet.meta.multiplier.w;
  multiWvalue.innerText = spritesheet.meta.multiplier.w;
  multiH.value = spritesheet.meta.multiplier.h;
  multiHvalue.innerText = spritesheet.meta.multiplier.h;

  sorted = s;

  console.info("Sotted", sorted);
  render();
  generateList();
  delBlock = false;
};
