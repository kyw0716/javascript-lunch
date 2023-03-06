import { getCategoryImage } from "../../constants/categoryImage";
import type { Category } from "../../types/restaurant";

class RestaurantCard extends HTMLLIElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const category = this.getAttribute("category");
    const name = this.getAttribute("name");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");

    this.innerHTML = `
      <div class="restaurant__category">
        <img
          src=${getCategoryImage(category as Category)}
          alt=${category}
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">
          캠퍼스부터 ${distance}분 내
        </span>
        <p class="restaurant__description text-body">
          ${description ?? ""}
        </p>
      </div>
    `;
  }
}

export const createRestaurantCard = () => {
  customElements.define("restaurant-card", RestaurantCard, { extends: "li" });
};
