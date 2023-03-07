import { RestaurantAddForm } from "./form";

export class Modal extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.bindEvent();
  }

  render() {
    this.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form is="restaurant-add-form" hidden></form>
      </div>
    `;
  }

  bindEvent() {
    this.querySelector(".modal-backdrop")?.addEventListener("click", () => {
      this.closeModal();
    });

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Escape") this.closeModal();
    });
  }

  openFormModal() {
    this.classList.add("modal--open");
    this.querySelector("form")?.removeAttribute("hidden");
  }

  closeModal() {
    this.classList.remove("modal--open");
    this.querySelector("form")?.setAttribute("hidden", "true");
    this.querySelector<RestaurantAddForm>("form")?.resetFormValues();
  }
}

export const createModal = () => {
  customElements.define("custom-modal", Modal, { extends: "div" });
};
