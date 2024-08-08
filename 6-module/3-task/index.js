import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement("div");
    this.elem.className = "carousel";
    this.arrowR = createElement(`
        <div class="carousel__arrow carousel__arrow_right">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </div>`);
    this.arrowL = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`);
    this.elem.append(this.arrowR);
    this.elem.append(this.arrowL);
    this.collection = document.createElement("div");
    this.collection.className = "carousel__inner";
    slides.map((plate) => {
      let newLine = document.createElement("div");
      newLine.className = "carousel__slide";
      newLine.id = plate.id;
      newLine.innerHTML = `
        <img src="../../assets/images/carousel/${
          plate.image
        }" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${plate.price.toFixed(2)}</span>
          <div class="carousel__title">${plate.name}</div>
          <button type="button" class="carousel__button">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>`;
      this.collection.append(newLine);
    });
    this.elem.append(this.collection);
    this.initCarousel();
    this.addToCart();
  }

  initCarousel() {
    let carouselSection = this.elem;
    let slideNumber = 0;
    let slidesLength =
      this.collection.getElementsByClassName("carousel__slide").length;

    this.arrowL.style.display = "none";

    carouselSection.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__arrow")) {
        if (event.target.closest(".carousel__arrow_left")) {
          slideNumber -= 1;
        }
        if (event.target.closest(".carousel__arrow_right")) {
          slideNumber += 1;
        }
        let slideWidth = this.elem.offsetWidth;
        this.collection.style.transform = `translateX(-${
          slideNumber * slideWidth
        }px)`;
        if (slideNumber == 0) {
          this.arrowL.style.display = "none";
        } else {
          this.arrowL.style.display = "";
        }
        if (slideNumber == slidesLength - 1) {
          this.arrowR.style.display = "none";
        } else {
          this.arrowR.style.display = "";
        }
      }
    });
  }

  addToCart() {
    this.elem.addEventListener("product-add", (event) => {
      console.log(event.detail);
    });

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__button")) {
        let ce = new CustomEvent("product-add", {
          detail: event.target.closest(".carousel__slide").id,
          bubbles: true,
        });
        this.elem.dispatchEvent(ce);
      }
    });
  }
}
