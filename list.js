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

        const tdName = document.createElement("td")
        tdName.innerText=file.name
        tr.appendChild(tdName)

        const tdEdit = document.createElement("td")
        tdEdit.innerText="RN"
        tdEdit.style.cursor="pointer";
        tdEdit.title="ReName"
        tdEdit.addEventListener("click", ()=>{
            const newname = prompt("New name", file.name)
            if(!newname) return
            const alreadyExists = files.findIndex(f=>f.name===newname)
            if(alreadyExists !== -1) return alert("Already exists!")
            file.name = newname;
            files[f].name = newname
            tr.dataset.file = newname;
            tdName.innerText = newname;
            if(selectedFile === f) selection(files[f]);
        })
        tr.appendChild(tdEdit)

        const tdExport = document.createElement("td")
        tdExport.innerText="E"
        tdExport.title="Export"
        tdExport.style.cursor="pointer";
        tdExport.addEventListener("click", ()=>{
            if(f !== selectedFile) return
            exportOne()
        })
        tr.appendChild(tdExport)

        const tdDel = document.createElement("td")
        tdDel.innerText="D"
        tdDel.style.cursor="pointer";
        tdDel.title="Delete"
        tdDel.addEventListener("click", ()=>{
            if(f !== selectedFile) return
            selectedViewCtx.clearRect(0, 0, selectedView.width, selectedView.height);
            selectedFileElement.innerText = `Selected: none`
            files.splice(selectedFile, 1);
            selectedFile = -1;
            sorting();
            findSelection();
        })
        tr.appendChild(tdDel)

        list.appendChild(tr)
    });
}