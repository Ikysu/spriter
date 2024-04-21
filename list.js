const list = document.getElementById("list")
const generateList = () => {
    list.innerHTML=""
    files.forEach((file, f) => {
        const tr = document.createElement("tr")
        tr.addEventListener("mousemove", ()=>{
            if (f !== -1 && files[f] && selectedFile !== f) {
                selectedFile = f;
                selection(files[selectedFile]);
            }
        })
        tr.dataset.file = file.name;
        tr.addEventListener("dblclick", ()=>{
            const newname = prompt("New name")
            const alreadyExists = files.findIndex(f=>f.name===newname)
            if(alreadyExists !== -1) return alert("Already exists!")
            file.name = newname;
            files[f].name = newname
            tr.dataset.file = newname;
            tr.innerHTML=`<td>${file.name}</td>`
            if(selectedFile === f) selection(files[f]);
        })
        tr.innerHTML=`<td>${file.name}</td>`
        list.appendChild(tr)
    });
}