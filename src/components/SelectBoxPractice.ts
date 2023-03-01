import {
  categoryFilterOptions,
  categoryOptions,
  distanceOptions,
  distanceValues,
  sortingFilterOptions,
} from "../constants/options";
import type { OptionType } from "../types/option";

const getOptionsByOptionType = (optionType: OptionType): readonly string[] => {
  switch (optionType) {
    case "category-filter":
      return categoryFilterOptions;
    case "category":
      return categoryOptions;
    case "sorting-filter":
      return sortingFilterOptions;
    case "distance":
      return distanceOptions;
  }
};

const getOptionValuesByOptionType = (
  optionType: OptionType
): readonly string[] => {
  switch (optionType) {
    case "category-filter":
      return categoryFilterOptions;
    case "category":
      return categoryOptions;
    case "sorting-filter":
      return sortingFilterOptions;
    case "distance":
      return distanceValues;
  }
};

const generateSelectBox = (
  handleSelectCategoryFilter: (selectedValue: string) => void,
  handleSelectCategory: (selectedValue: string) => void,
  handleSelectSortingFilter: (selectedValue: string) => void,
  handleSelectDistance: (selectedValue: string) => void
) => {
  customElements.define(
    "my-select",
    class MySelect extends HTMLElement {
      id;
      eventHandler;

      constructor() {
        super();

        this.id = this.getAttribute("id") as string;

        const optionType = this.getAttribute("id") as OptionType;
        const className = this.getAttribute("class");
        const name = this.getAttribute("name");

        const options = getOptionsByOptionType(optionType);
        const optionValues = getOptionValuesByOptionType(optionType);

        switch (optionType) {
          case "category-filter":
            this.eventHandler = handleSelectCategoryFilter;
            break;
          case "category":
            this.eventHandler = handleSelectCategory;
            break;
          case "sorting-filter":
            this.eventHandler = handleSelectSortingFilter;
            break;
          case "distance":
            this.eventHandler = handleSelectDistance;
            break;
        }

        this.innerHTML = `
            <select name=${name} id=${this.id} class=${className}>
                ${options
                  .map(
                    (option, index) =>
                      `<option value=${optionValues[index]}>${option}</option>`
                  )
                  .join("")}
            </select>
        `;
      }

      connectedCallback() {
        (
          document.querySelector(`#${this.id}`) as HTMLSelectElement
        ).addEventListener("change", (event) => {
          this.eventHandler((event.target as HTMLOptionElement).value);
        });
      }
    }
  );
};

export { generateSelectBox };
