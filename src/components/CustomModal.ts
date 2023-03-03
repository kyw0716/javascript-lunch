export class CustomModal extends HTMLElement {
  constructor() {
    super();

    this.renderContainer();
    this.bindEvent();
  }

  renderContainer() {
    this.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container"></div>
    `;
  }

  renderContent(children: string) {
    const modalContainer = this.querySelector(".modal-container");

    if (!(modalContainer instanceof HTMLElement)) return;

    modalContainer.innerHTML = children;
  }

  connectedCallback() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") this.close();
    });
  }

  bindEvent() {
    const modalBackdrop = this.querySelector(".modal-backdrop");

    if (!(modalBackdrop instanceof HTMLElement)) return;

    modalBackdrop.addEventListener("click", this.close.bind(this));
  }

  open() {
    this.classList.add("modal--open");
  }

  close() {
    const modalContainer = this.querySelector(".modal-container");

    if (!(modalContainer instanceof HTMLElement)) return;

    modalContainer.replaceChildren();

    this.classList.remove("modal--open");
  }
}

const createCustomModal = () => {
  customElements.define("custom-modal", CustomModal);
};

export default createCustomModal;
