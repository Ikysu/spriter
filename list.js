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
        const td = document.createElement("td")
        td.innerText=file.name;
        td.contenteditable=true;
        td.addEventListener("change", ()=>{
            const alreadyExists = files.findIndex(f=>f.name===td.innerText)
            if(alreadyExists !== -1) {
                alert("Already exists!")
                td.innerText = file.name;
                return
            }
            files[alreadyExists].name = td.innerText
            tr.dataset.file = td.innerText;
            if(selectedFile === alreadyExists) selection(files[selectedFile]);
        })
        tr.innerHTML=`<td>${file.name}</td>`
        list.appendChild(tr)
    });
}