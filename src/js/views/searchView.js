class SearchView {
  _parentElement = document.querySelector(".search");
  _searchInput = this._parentElement.querySelector(".search__field");

  getQuery() {
    const query = this._searchInput.value.lowerCase().trim();
    this._clearInput();
    return query;
  }

  _clearInput() {
    _searchInput.value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
