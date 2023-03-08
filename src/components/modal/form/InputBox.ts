type InputHandleElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export class InputBox extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const labelText = this.getAttribute("labeltext");
    const inputId = this.getAttribute("inputid");
    const name = this.getAttribute("name");
    const caption = this.getAttribute("caption");
    const isTextArea = this.getAttribute("istextarea");
    const isSelect = this.getAttribute("isselect");

    this.innerHTML = `
        <label for="${inputId} text-caption">${labelText}</label>
        ${
          isTextArea === null && isSelect === null
            ? `
                <input 
                  type="text" 
                  name=${name} 
                  id=${inputId} 
                  ${caption === null && "required"} 
                />
              `
            : isSelect === null
            ? `
                <textarea
                  name=${name}
                  id=${inputId}
                  cols="30"
                  rows="5"
                  ${caption === null && "required"}
                ></textarea>
              `
            : `
                <select 
                  is="custom-select" 
                  name=${name} 
                  id=${inputId} 
                  ${caption === null && "required"}
                ></select>
              `
        }
        ${
          caption !== null
            ? `<span class="help-text text-caption">${caption}</span>`
            : ""
        }
    `;
  }

  getValue() {
    return (this.children[1] as InputHandleElement).value;
  }

  resetValue() {
    (this.children[1] as InputHandleElement).value = "";
  }
}

export const createInputBox = () => {
  customElements.define("input-box", InputBox, { extends: "div" });
};
