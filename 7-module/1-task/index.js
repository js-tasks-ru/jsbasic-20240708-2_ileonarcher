import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement("div");
    this.elem.className = "ribbon";
    this.arrowLeft =
      createElement(`<button class="ribbon__arrow ribbon__arrow_left">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);
    this.arrowRight =
      createElement(`<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);
    this.ribbonInner = document.createElement("nav");
    this.ribbonInner.className = "ribbon__inner";
    categories.map((el) => {
      let catLine = createElement(
        `<a href="#" class="ribbon__item" data-id="${el.id}">${el.name}</a>`
      );
      this.ribbonInner.append(catLine);
    });
    this.render();
  }
  render() {
    this.elem.append(this.arrowLeft);
    this.elem.append(this.ribbonInner);
    this.elem.append(this.arrowRight);
    this.scrollBar();
    this.select();
  }
  scrollBar() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_left")) {
        this.ribbonInner.scrollBy(-350, 0);
      }
      if (event.target.closest(".ribbon__arrow_right")) {
        this.ribbonInner.scrollBy(350, 0);
      }
      this.ribbonInner.addEventListener("scroll", (scrol) => {
        let scrollLeft = this.ribbonInner.scrollLeft;
        let scrollWidth = this.ribbonInner.scrollWidth;
        let clientWidth = this.ribbonInner.clientWidth;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;
        if (scrollLeft < 1) {
          this.arrowLeft.classList.remove("ribbon__arrow_visible");
        }
        if (scrollLeft > 1 && scrollRight > 1) {
          if (!this.arrowLeft.classList.contains("ribbon__arrow_visible")) {
            this.arrowLeft.classList.add("ribbon__arrow_visible");
          }
          if (!this.arrowRight.classList.contains("ribbon__arrow_visible")) {
            this.arrowRight.classList.add("ribbon__arrow_visible");
          }
        }
        if (scrollRight < 1) {
          this.arrowRight.classList.remove("ribbon__arrow_visible");
        }
      });
    });
  }
  select() {
    this.ribbonInner.addEventListener("ribbon-select", (event) => {
      console.log(event.detail);
    });
    this.ribbonInner.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__item")) {
        event.preventDefault();
        let ribbonItem = document.getElementsByClassName("ribbon__item");
        for (let item of ribbonItem) {
          if (item.classList.contains("ribbon__item_active")) {
            item.classList.remove("ribbon__item_active");
          }
        }
        if (!event.target.classList.contains("ribbon__item_active")) {
          event.target.classList.add("ribbon__item_active");
        }
        let ce = new CustomEvent("ribbon-select", {
          detail: event.target.closest(".ribbon__item").dataset["id"],
          bubbles: true,
        });
        this.ribbonInner.dispatchEvent(ce);
      }
    });
  }
}
