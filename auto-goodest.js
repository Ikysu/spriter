const autoGoodest = document.getElementById("auto-goodest")
autoGoodest.checked=true
if(localStorage.getItem("auto-goodest") === "0") {
  multiW.disabled = false;
  multiH.disabled = false;
  autoGoodest.checked=false;
}
autoGoodest.addEventListener("change", ()=>{
  localStorage.setItem("auto-goodest", autoGoodest.checked ? "1" : "0")
  multiW.disabled = autoGoodest.checked;
  multiH.disabled = autoGoodest.checked;
  sorting()
})