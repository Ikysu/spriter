const exportOne = () => {
  if(selectedFile === -1 || !files[selectedFile]) return;
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  a.setAttribute("href", url.createObjectURL(files[selectedFile].blob));
  a.setAttribute("download", files[selectedFile].name);
  a.click();
  a.remove();
};
document.getElementById("btn-export-one").addEventListener("click", exportOne);

const saveTable = () => {
  render()
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
  selectedFile = -1;
  selectedViewCtx.clearRect(0, 0, selectedView.width, selectedView.height);
  selectedFileElement.innerText = `Selected: none`
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

let delBlock = true;
document.body.addEventListener("keydown", (ev) => {
  if (ev.ctrlKey) {
    switch(ev.keyCode) {
      case 83:
        ev.preventDefault();
        saveTable();
        break;
      case 69:
        ev.preventDefault();
        exportOne();
        break;
      case 65:
        ev.preventDefault();
        exportFiles();
        break;
      case 68:
        ev.preventDefault();
        if(delBlock) return;
        if (selectedFile === -1 || !files[selectedFile]) return;
        selectedViewCtx.clearRect(0, 0, selectedView.width, selectedView.height);
        selectedFileElement.innerText = `Selected: none`
        files.splice(selectedFile, 1);
        selectedFile = -1;
        sorting();
        findSelection();
        break;
      default:
        console.info(ev.keyCode)
        break;
    }
  }
});
  