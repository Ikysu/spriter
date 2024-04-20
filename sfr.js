window._SFR = (func, file) => {
    return new Promise((resolve, reject) => {
      const FR = new FileReader();
      FR.addEventListener(
        "load",
        () => {
          resolve(FR.result);
        },
        false
      );
      FR[func](file);
    });
  };
  window.SFR = {
    arrayBuffer: (file) => window._SFR("readAsArrayBuffer", file),
    binaryString: (file) => window._SFR("readAsBinaryString", file),
    dataURL: (file) => window._SFR("readAsDataURL", file),
    text: (file) => window._SFR("readAsText", file),
  };
  const canvas2blob = (canvas) =>
    new Promise((r) => canvas.toBlob((b) => r(b), "image/png"));
  const loadImage = (blob) =>
    new Promise((r) => {
      const img = new Image();
      img.src = url.createObjectURL(blob);
      img.addEventListener("load", () => r(img));
    });
  