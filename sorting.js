let sorted = [];


const preSorting = (mw,mh) => {
  const s = files.sort((a, b) => a.frame.h - b.frame.h).reverse();

  const cW =
    files.reduce((a, b) => a + b.frame.w, 0) / mw,
  cH =
    files.reduce((a, b) => a + b.frame.h, 0) / mh;

  const start_node = new Node();
  start_node.rect = new Rect(0, 0, cW, cH);

  let maxWidth = 0;
  let maxHeight = 0;

  let usedS = 0;

  for (let i = 0; i < s.length; i++) {
    const rect = new Rect(0, 0, s[i].frame.w, s[i].frame.h);
    const ir = start_node.insert_rect(rect);
    if(!ir) return
    const node = ir.rect;
    s[i].frame.x = node.x;
    s[i].frame.y = node.y;
    usedS+=s[i].frame.w*s[i].frame.h
    if (maxWidth < s[i].frame.x + s[i].frame.w)
      maxWidth = s[i].frame.x + s[i].frame.w;
    if (maxHeight < s[i].frame.y + s[i].frame.h)
      maxHeight = s[i].frame.y + s[i].frame.h;
  }

  return {
    mw,
    mh,
    good: usedS / (maxWidth*maxHeight),
    maxWidth,
    maxHeight,
    s
  }
}


const sorting = () => {
  delBlock=true

  let goodest = {mw:1,mh:1,good:0};
  if(autoGoodest.checked) {
    for (let mw=1;mw<=10;mw++) {
      for (let mh=1;mh<=10;mh++) {
        const pre = preSorting(mw,mh);
        if(pre && goodest.good<pre.good) goodest = pre
      }
    }
  }else{
    const pre = preSorting(spritesheet.meta.multiplier.w,spritesheet.meta.multiplier.h);
    if(!pre) {
      decreaseMultiplier()
      return sorting()
    }
    goodest = pre
  }

  const { s, maxWidth, maxHeight, mw, mh } = goodest

  canvas.width = maxWidth;
  canvas.height = maxHeight;

  ctx.clearRect(0,0,maxWidth,maxHeight);

  spritesheet.meta.size.w = maxWidth;
  spritesheet.meta.size.h = maxHeight;

  spritesheet.meta.multiplier.w = mw
  spritesheet.meta.multiplier.h = mh

  sorted = s;
  render();
  generateList();
  delBlock=false;
}