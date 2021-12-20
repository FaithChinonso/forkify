import icons from "url:../..img/icons.svg";

import View from "./view.js";
import PreviewView from "./previewView.js";

class BookmarkView extends view {
  _parentElement = document.querySelector(".booksmark__list");
  _errorMessage = `No Bookmarks yet. Find a nice recipe and bookmark it`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join("");
  }
}
export default new BookmarkView();
