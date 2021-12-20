import { async } from "regenerator-runtime";
import { API_URL } from "./confiq.js";
import { AJAX } from "./helper.js";
import { RES_PER_PAGE, KEY } from "./confiq.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    result: [],
    page: 1,
    resultPerPage = RES_PER_PAGE,

  },
  bookmarks = [],
};

const createRecipeObject = function(data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key})
  };
}

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

   

    if(state.bookmarks.some(bookmark => bookmark.id == id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {

    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.result = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
        ...(rec.key && {key: recipe.key})
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.result.slice(start, end);
};

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

    state.recipe.servings = newServings;
  })
}
const persistBookmarks = function() {
  localStorage.setItem('bookmarks'.JSON.stringify(state.bookmarks()))
}

export const addBookmark = function(recipe) {
  //add bookmark
  state.bookmarks.push(recipe);

  //add current recipe as bookmarked
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  //save bookmark to localstorage
  persistBookmarks();
}

export const deleteBookmark = function(id) {
 //delete bookmark
   const index = state.bookmarks.findIndex(el => el.id == id);
   state.bookmarks.splice(index, 1);

   //mark recipe as not a bookmark anymore
   if(id === state.recipe.id) state.recipe.bookmarked = false;

}
const init = function(){
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookmarks = JSON.parse(storage);
}
init();

const clearBookmarks = function() {
  localStorage.clear('bookmarks');
}

export const uploadRecipe = async function (newRecipe){
  try{
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ing => {
      const ingArr = ing[1].replaceAll(' ', '').split(',').map(el => el.trim());

      
      if(ingArr.lenght !== 3) throw new Error(`wrong ingredient format please use the correct format`);

      const [quantity, unit, description] =ingArr;


      return { quantity: quantity ? +quantity : null, unit, description};
      });

    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.imageUrl,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      } 

      const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
      state.recipe = createRecipeObject(data);

      addBookmark(state.recipe);

  } catch(err) {
    throw err;
  }

  
}

const getSortedResult = function(result) {
  const sortedResult = sort ? result.slice().sort((a, b) => a - b) : result;
}