import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = createElement(`
        <div class="modal">
          <!--Прозрачная подложка перекрывающая интерфейс-->
          <div class="modal__overlay"></div>

          <div class="modal__inner">
            <div class="modal__header">
              <!--Кнопка закрытия модального окна-->
              <button type="button" class="modal__close">
                <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>

              <h3 class="modal__title">
                Вот сюда нужно добавлять заголовок
              </h3>
            </div>

            <div class="modal__body">
              A сюда нужно добавлять содержимое тела модального окна
            </div>
          </div>

        </div>
    `);
  }
  open() {
    document.body.append(this.elem);
    document.body.classList.toggle("is-modal-open");
    this.closeButton();
  }
  setTitle(text) {
    let title = this.elem.querySelector(".modal__title");
    title.textContent = text;
  }
  setBody(node) {
    let body = this.elem.querySelector(".modal__body");
    body.innerHTML = null;
    body.append(node);
  }
  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
  }
  closeButton() {
    this.button = this.elem.querySelector(".modal__close");
    this.button.addEventListener("click", (event) => {
      if (event.target.closest(".modal__close")) {
        this.close();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.code == "Escape") {
        this.close();
      }
    });
  }
}