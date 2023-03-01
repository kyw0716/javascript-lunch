import { generateSelectBox } from "./components/SelectBoxPractice";

class App {
  constructor() {
    this.init();
  }

  init() {
    generateSelectBox(
      this.handleSelectCategoryFilter.bind(this),
      this.handleSelectCategory.bind(this),
      this.handleSelectSortingFilter.bind(this),
      this.handleSelectDistance.bind(this)
    );
    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <header class="gnb"></header>
      <main>
        <section class="restaurant-filter-container">
          <my-select name="category" id="category-filter" class="restaurant-filter"></my-select>
          <my-select name="sorting" id="sorting-filter" class="restaurant-filter"></my-select>
        </section>
        <section class="restaurant-list-container"></section>
        <div class="modal modal--open">
          <div class="modal-backdrop"></div>
          <div class="modal-container"></div>
        </div>
      </main>
    `;
  }

  handleSelectCategoryFilter(selectedValue: string) {
    console.log(selectedValue);
  }

  handleSelectCategory(selectedValue: string) {
    console.log(selectedValue);
  }

  handleSelectSortingFilter(selectedValue: string) {
    console.log(selectedValue);
  }

  handleSelectDistance(selectedValue: string) {
    console.log(selectedValue);
  }
}

export default App;
