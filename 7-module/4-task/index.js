export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement("div");
    this.elem.className = "slider";
    this.elem.innerHTML = `<!--Корневой элемент слайдера-->
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <!--Полоска слайдера-->
        <div class="slider__progress"></div>

        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
        </div>
      </div>`;
    for (let i = 0; i < steps; i++) {
      let span = document.createElement("span");
      if (i == value) {
        span.className = "slider__step-active";
      }
      this.elem.querySelector(".slider__steps").append(span);
    }
    this.elem.addEventListener("click", (event) => {
      let sliderLength = this.elem.getBoundingClientRect().width;
      let segmentLength = sliderLength / (steps - 1);
      let selectedPoint = Math.round(
        (event.clientX - this.elem.getBoundingClientRect().left) / segmentLength
      );
      this.elem.querySelector(".slider__value").innerHTML = selectedPoint;
      let pointsList = Array.from(
        this.elem.querySelector(".slider__steps").getElementsByTagName("span")
      );
      pointsList.map((item, index) => {
        item.classList.remove("slider__step-active");
        if (index == selectedPoint) {
          item.classList.add("slider__step-active");
        }
      });
      let thumb = this.elem.querySelector(".slider__thumb");
      let progress = this.elem.querySelector(".slider__progress");
      thumb.style.left = `${(selectedPoint * 100) / (steps - 1)}%`;
      progress.style.width = `${(selectedPoint * 100) / (steps - 1)}%`;

      let ce = new CustomEvent("slider-change", {
        detail: selectedPoint,
        bubbles: true,
      });
      this.elem.dispatchEvent(ce);
    });
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.thumb.ondragstart = () => false;
    this.thumb.onpointerdown = function (event) {
      document.querySelector(".slider").classList.add("slider_dragging");
      let thumb = document.querySelector(".slider__thumb");
      document.onpointermove = (pointermoveEvent) => {
        let elem = document.querySelector(".slider");
        let thumb = document.querySelector(".slider__thumb");
        let progress = document.querySelector(".slider__progress");
        let left = pointermoveEvent.clientX - elem.getBoundingClientRect().left;
        let leftRelative = left / elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
      };
    };
    document.onpointerup = function (event) {
      document.removeEventListener("pointermove", onpointermove);
      document.onpointermove = () => null;
      console.log(document.onpointermove);

      let elem = document.querySelector(".slider");
      let thumb = document.querySelector(".slider__thumb");
      let progress = document.querySelector(".slider__progress");
      let sliderLength = elem.getBoundingClientRect().width;
      let segmentLength = sliderLength / (steps - 1);
      let selectedPoint = Math.round(
        (event.clientX - elem.getBoundingClientRect().left) / segmentLength
      );
      thumb.style.left = `${Math.round((selectedPoint * 100) / (steps - 1))}%`;
      progress.style.width = `${Math.round(
        (selectedPoint * 100) / (steps - 1)
      )}%`;
      document.querySelector(".slider").classList.remove("slider_dragging");
      let ce = new CustomEvent("slider-change", {
        detail: selectedPoint,
        bubbles: true,
      });
      elem.dispatchEvent(ce);
    };
  }
}
