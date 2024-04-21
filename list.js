const list = document.getElementById("list")
const generateList = () => {
    list.innerHTML=""
    files.forEach((file, f) => {
        const tr = document.createElement("tr")
        tr.addEventListener("mousemove", ()=>{
            if (f !== -1 && selectedFile !== f) {
                selectedFile = f;
                if(!files[selectedFile]) return
                selection(files[selectedFile], false);
                selectedFileElement.innerText = `Selected: ${files[selectedFile].name}`;
            }
        })
        tr.dataset.file = file.name;
        tr.innerHTML=`<td>${file.name}</td>`
        list.appendChild(tr)
    });
}