import icons from "url:../..img/icons.svg";

import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__inline");
    });
    if (!btn) return;
    const goToPage = +btn.dataset.goto;
    handler(goToPage);
  }

  _rightButton() {
    return `<button data-goto = ${
      curPage + 1
    } class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1} of numPages</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }
  _leftButton() {
    return `<button data-goto = ${
      curPage - 1
    } class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    //page 1 and there are other pages
    if (curPage === 1 && numPages > 1) this._rightButton;

    //last page
    if (curPage === numPages && numPages > 1) this._leftButton;
    //some other page
    if (curPage < numPages) {
      this._rightButton;
      this._leftButton;
    }

    //page 1 and there are no other pages
    return "";
  }
}

export default new PaginationView();
