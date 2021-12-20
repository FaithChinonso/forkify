import icons from "url:../..img/icons.svg";


import View from './view.js';

import {Fraction} from fractional;

class AddRecipeView extends View {
  
  _data;
  _errorMessage = `We could not find that recipe, Please try another one`;
  _message = `Recope was sucessfully uploaded`;
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.nav--close-modal');

  constructor() {
      super();
      this._addHandlerShowWindow();
  }

  toggleView(){
    this._overlay.classList.toggle('.hidden');
    this._window.classList.toggle('.hidden');
  }

  _addHandlerShowWindow() {
      this._btnOpen.addEventListener('click', this.toggleView.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleView.bind(this));
    this._overlay.addEventListener('click', this.toggleView.bind(this));
  }

  addHandlerUpload(handler) {
      this._parentElement.addEventListener('click', function(e){
          e.preventDefault();
          const dataArr = [...new FormData(this)];
          const data = Object.fromEntries(dataArr);
          handler(data);
      })
  }



  

  

  


  _generateMarkup() {}
    
};

export default new AddRecipeView();
