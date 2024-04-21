const list = document.getElementById("list")
const generateList = () => {
    list.innerHTML=""
    files.forEach((file, index) => {
        const tr = document.createElement("tr")
        tr.addEventListener("mousemove", ()=>{
            selectedFile = index;
        })
        tr.innerHTML=`<td>${file.name}</td>`
        list.appendChild(tr)
    });
}