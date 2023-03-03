import { Category, Distance, Restaurant } from "../types/restaurant";
import { CustomModal } from "./CustomModal";

class RestaurantAddForm extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="restaurant-form">
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
          <span class="help-text text-caption"
            >메뉴 등 추가 정보를 입력해 주세요.</span
          >
        </div>
        <div class="form-item">
          <label for="link text-caption">참고 링크</label>
          <input type="text" name="link" id="link" />
          <span class="help-text text-caption"
            >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
          >
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
      </form>
    `;
  }

  bindEvent(func: (restaurant: Restaurant) => void) {
    this.querySelector("#restaurant-form")?.addEventListener(
      "submit",
      (event) => this.onSubmitAddForm(event, func)
    );

    this.querySelector(".button--secondary")?.addEventListener("click", () => {
      const $modal = document.querySelector("custom-modal");

      if (!($modal instanceof CustomModal)) return;

      $modal.close();
    });
  }

  onSubmitAddForm(event: Event, func: (restaurant: Restaurant) => void) {
    event.preventDefault();

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

    func({ category, name, distance, description, link });
  }
}

export default RestaurantAddForm;
