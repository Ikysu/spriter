const saveTable = () => {
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  a.setAttribute("href", canvas.toDataURL("image/png"));
  a.setAttribute("download", "spritesheet.png");
  a.click();
  a.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," +
      encodeURIComponent(JSON.stringify(spritesheet, null, 2))
  );
  a.setAttribute("download", "spritesheet.json");
  a.click();
  a.remove();
};
document.getElementById("btn-save").addEventListener("click", saveTable);

const exportFiles = async () => {
  const zip = new JSZip();
  await Promise.all(files.map((f) => zip.file(f.name, f.blob)));
  const blob = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  a.setAttribute("href", url.createObjectURL(blob));
  a.setAttribute("download", "spritesheet.zip");
  a.click();
  a.remove();
};
document.getElementById("btn-export").addEventListener("click", exportFiles);

document.body.addEventListener("keydown", (ev) => {
  if (ev.ctrlKey) {
    console.info(ev.keyCode);
    if (ev.keyCode === 83) {
      ev.preventDefault();
      saveTable();
    }
    if (ev.keyCode === 69) {
      ev.preventDefault();
      exportFiles();
    }
    if (ev.keyCode === 67) {
      navigator.clipboard.writeText(files[selectedFile].name);
      selectedFileElement.innerText =
        selectedFileElement.innerText + " (Copied!)";
    }
  }
});
  