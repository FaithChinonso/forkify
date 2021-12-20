import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./confiq.js";
import RecipeView from "./views/recipeView.js";
import SearchView from "./views/searchView.js";
import ResultView from "./views/resultView.js";
import PaginationView from "./views/paginationView.js";
import BookmarkView from "./views/bookmarksView.js";
import AddRecipeView from "./views/addRecipeView.js";

import "core.js/stable";
import "regenerator-runtime";

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //loading spinner
    RecipeView.renderSpinner();

    //update results view to mark search result
    resultView.update(model.getSearchResultPage());

    //loading recipe
    await model.loadRecipe(id);

    //rendering recipe
    RecipeView.render(model.state.recipe);

    //updating bookmaarks
    BookmarkView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //get search query
    const query = SearchView.getQuery();
    if (!query) return;

    //load result
    await model.loadSearchResult();

    //render result
    ResultView.render(model.getSearchResultPage(1));

    //render initial pargination

    PaginationView.render(state.search);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const controlPargination = function (page) {
  //render new results
  ResultView.render(model.getSearchResultPage(page));
  //render new pargination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings in the state
  model.updateServings(newServings);

  //updating the recipe view
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.state.recipe.bookmarked;
  model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  RecipeView.update(model.state.bookmarks);

  //render to bookmarks

  RecipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function () {
  try {
    //add spinner
    AddRecipeView.renderSpinner();

    //upload new recipe data
    await model.uploadRecipe(newRecipe);

    //render recipe
    RecipeView.render(model.state.recipe);

    //Success Message
    AddRecipeView.renderMessage();

    //render bookmark view
    BookmarkView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //clear form window
    setTimeout(function () {
      AddRecipeView.toggleView();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    AddRecipeView.renderError(err.message);
  }
};

const controlSortSearchResult = async function () {
  try {
  } catch (err) {
    throw err;
  }
  //
};
const init = function () {
  BookmarkView.addHandlerRender(controlBookmarks);
  SearchView.addHandlerSearch(controlSearchResults);
  RecipeView.addHandlerUpdateServings(controlServings);
  PaginationView.addHandlerClick(controlPargination);
  controlServings();
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
//a link between the dom and our code using the costom-data attribute
