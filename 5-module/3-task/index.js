function initCarousel() {
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let carousel = document.querySelector(".carousel__inner");
  let slideNumber = 0;
  let slideWidth = carousel.offsetWidth;
  let container = document.querySelector(".container");
  arrowLeft.style.display = "none";
  arrowRight.addEventListener("click", (event) => {
    if (event.target.closest(".carousel__arrow")) {
      slideNumber += 1;
      carousel.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
      if (slideNumber != 0) {
        arrowLeft.style.display = "";
      }
      if (slideNumber == 3) {
        arrowRight.style.display = "none";
      }
    }
  });
  arrowLeft.addEventListener("click", (event) => {
    if (event.target.closest(".carousel__arrow")) {
      slideNumber -= 1;
      carousel.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
      if (slideNumber != 3) {
        arrowRight.style.display = "";
      }
      if (slideNumber == 0) {
        arrowLeft.style.display = "none";
      }
    }
  });
}
