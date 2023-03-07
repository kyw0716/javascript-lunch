import type { Category, Distance, Restaurant } from "../../types/restaurant";

import { Modal } from "./Modal";

export class RestaurantAddForm extends HTMLFormElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="form-item form-item--required">
            <label for="category text-caption">카테고리</label>
            <select is="custom-select" name="category" id="category" required></select>
        </div>
        <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="name" id="name" required />
        </div>
        <div class="form-item form-item--required">
            <label for="distance text-caption">거리(도보 이동 시간) </label>
            <select is="custom-select" name="distance" id="distance" required></select>
        </div>
        <div class="form-item">
            <label for="description text-caption">설명</label>
            <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
            ></textarea>
            <span class="help-text text-caption">
              s메뉴 등 추가 정보를 입력해 주세요.
            </span>
        </div>
        <div class="form-item">
            <label for="link text-caption">참고 링크</label>
            <input type="text" name="link" id="link" />
            <span class="help-text text-caption">
              매장 정보를 확인할 수 있는 링크를 입력해 주세요.
            </span>
        </div>
        <div class="button-container">
            <button
                type="button"
                class="button button--secondary text-caption"
            >
                취소하기
            </button>
            <button class="button button--primary text-caption">
                추가하기
            </button>
        </div>
    `;
  }

  bindEvent(handleSubmit: (restaurant: Restaurant) => void) {
    this.querySelector(".button--secondary")?.addEventListener("click", () => {
      document.querySelector<Modal>(".modal")?.closeModal();
    });

    this.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      handleSubmit(this.getSubmitData());
      this.resetFormValues();
    });
  }

  getSubmitData(): Restaurant {
    const category = (this.querySelector("#category") as HTMLSelectElement)
      .value as Category;
    const name = (this.querySelector("#name") as HTMLInputElement).value;
    const distance = Number(
      (this.querySelector("#distance") as HTMLSelectElement).value
    ) as Distance;
    const description = (
      this.querySelector("#description") as HTMLTextAreaElement
    ).value;
    const link = (this.querySelector("#link") as HTMLInputElement).value;

    return { category, name, distance, description, link };
  }

  resetFormValues() {
    (this.querySelector("#category") as HTMLSelectElement).value = "";
    (this.querySelector("#name") as HTMLInputElement).value = "";
    (this.querySelector("#distance") as HTMLSelectElement).value = "";
    (this.querySelector("#description") as HTMLTextAreaElement).value = "";
    (this.querySelector("#link") as HTMLInputElement).value = "";
  }
}

export const createRestaurantAddForm = () => {
  customElements.define("restaurant-add-form", RestaurantAddForm, {
    extends: "form",
  });
};