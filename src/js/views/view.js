import icons from "url:../..img/icons.svg";

export default class View {
  _data;

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data the data to be rendered
   * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined || string} A markup string is returned if render=false
   * @this (object) View instance
   * @author Faith Umunnakwe
   * @todo Finish implementation
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.lenght === 0))
      return this._renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //createcontextualfragments converts to real dom node element
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    const curElement = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];

      //update change text
      if (
        newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      //change attribute
      if (newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._clear();
    this._parentEL.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
