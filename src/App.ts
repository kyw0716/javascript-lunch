import type { Category, Distance, Restaurant } from "./types/restaurant";
import type { CategoryOption, SortOption } from "./types/option";

import createCustomSelect from "./components/CustomSelect";
import createCustomModal from "./components/CustomModal";
import createCustomHeader from "./components/CustomHeader";
import createRestaurantCardList from "./components/RestaurantCardList";
import Restaurants from "./domain/Restaurants";
import { CustomModal } from "./components/CustomModal";
import RestaurantAddForm from "./components/RestaurantAddForm";

class App {
  #modal: HTMLElement | null;

  #restaurants;

  #showState: {
    filter: CategoryOption;
    sort: SortOption;
  };

  constructor() {
    const restaurants = JSON.parse(localStorage.getItem("restaurants") ?? "[]");

    this.#restaurants = new Restaurants(restaurants);
    this.#showState = {
      filter: "전체",
      sort: "name",
    };
    this.init();

    this.#modal = document.querySelector("custom-modal");
  }

  init() {
    createCustomSelect();
    createCustomModal();
    createCustomHeader();
    customElements.define("restaurant-add-form", RestaurantAddForm);

    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <custom-header></custom-header>
      <main>
        <section class="restaurant-filter-container">
          <select is="custom-select" name="category" id="category-filter" class="restaurant-filter"></select>
          <select is="custom-select" name="sorting" id="sorting-filter" class="restaurant-filter"></select>
        </section>
        <section class="restaurant-list-container">
          ${createRestaurantCardList(
            this.#restaurants.getListByOption(this.#showState)
          )}
        </section>
        <custom-modal class="modal"></custom-modal>
      </main>
    `;
  }

  onClickSortingOption(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    this.#showState.sort = event.target.value as SortOption;
    this.renderRestaurantList();
  }

  onClickFilteringOption(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    this.#showState.filter = event.target.value as CategoryOption;
    this.renderRestaurantList();
  }

  onSubmitNewRestaurant(event: Event) {
    event.preventDefault();

    this.addNewRestaurant();
    this.renderRestaurantList();

    localStorage.setItem(
      "restaurants",
      JSON.stringify(
        this.#restaurants.getListByOption({ filter: "전체", sort: "name" })
      )
    );

    this.closeModal();
    this.resetModalValue();
  }

  openModal() {
    const customModal = document.querySelector("custom-modal");

    if (!(customModal instanceof CustomModal)) return;

    customModal.renderContent("<restaurant-add-form></restaurant-add-form>");

    const restaurantAddForm = document.querySelector("restaurant-add-form");
    (restaurantAddForm as RestaurantAddForm).bindEvent(this.add.bind(this));

    customModal.open();
  }

  closeModal() {
    const customModal = document.querySelector("custom-modal");

    if (!(customModal instanceof CustomModal)) return;

    customModal.close();
  }

  renderRestaurantList() {
    const restaurantListContainer = document.querySelector(
      ".restaurant-list-container"
    );

    if (restaurantListContainer === null) return;

    restaurantListContainer.innerHTML = createRestaurantCardList(
      this.#restaurants.getListByOption(this.#showState)
    );
  }

  addNewRestaurant() {
    const category = (document.getElementById("category") as HTMLSelectElement)
      .value as Category;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const distance = Number(
      (document.getElementById("distance") as HTMLSelectElement).value
    ) as Distance;
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value;
    const link = (document.getElementById("link") as HTMLInputElement).value;

    this.#restaurants.add({
      category,
      name,
      distance,
      description,
      link,
    });
  }

  add(restaurant: Restaurant) {
    this.#restaurants.add(restaurant);

    localStorage.setItem(
      "restaurants",
      JSON.stringify(
        this.#restaurants.getListByOption({ filter: "전체", sort: "name" })
      )
    );

    this.renderRestaurantList();
    this.closeModal();
  }

  resetModalValue() {
    (document.getElementById("category") as HTMLSelectElement).value = "";
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("distance") as HTMLSelectElement).value = "";
    (document.getElementById("description") as HTMLTextAreaElement).value = "";
    (document.getElementById("link") as HTMLInputElement).value = "";
  }
}

export default App;
