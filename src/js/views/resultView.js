import icons from "url:../..img/icons.svg";

import View from "./view.js";
import PreviewView from "./view.js";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No Recipes found for your query, please try again`;
  _message = ``;

  _generateMarkup() {
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join("");
  }
}
export default new ResultView();
