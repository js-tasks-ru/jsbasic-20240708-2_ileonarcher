function toggleText() {
  let btn = document.querySelector(".toggle-text-button");
  let target = document.querySelector("#text");
  btn.addEventListener("click", (event) => {
    target.hidden = !target.hidden;
  });
}
