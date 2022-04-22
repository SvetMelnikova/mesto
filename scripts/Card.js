import { openModalWindow, zoomImage,  zoomTitle, zoomCardElement} from "./index.js";

export class Card {
    constructor(data, template){
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    }
    
    _getTemplate() {
        const cardElement = this._template.content.firstElementChild.cloneNode(true);
        return cardElement;
    }

    _removeCard(event) {
      const card = event.currentTarget.closest(".element");
      card.remove();
    }
    
    _handleRemoveCard() {
      this._card.querySelector(".element__btn-trash").addEventListener("click", this._removeCard);
    }
    
    _likeCard (event) {
      const card = event.currentTarget;
      card.classList.toggle("element__like-button_active");
    }
    
    _setLikeButtonListener() {
      this._card.querySelector(".element__like-button").addEventListener("click", this._likeCard);
    }
    
    _zoomCard(event){
      const card = event.currentTarget.closest(".element");
      const image = event.currentTarget.src;
      const title = card.querySelector(".element__title").textContent;
      zoomTitle.textContent = title;
      zoomImage.src = image;
      zoomImage.alt = title;
      openModalWindow(zoomCardElement);
    }
    
    _zoomCardAction() {
      this._card.querySelector(".element__image").addEventListener("click", this._zoomCard);
    }

    _setEventListeners(){
      this._handleRemoveCard();
      this._setLikeButtonListener();
      this._zoomCardAction();
    }

    createCard() {
      this._card = this._getTemplate();
      const cardImage = this._card.querySelector(".element__image");
      this._card.querySelector(".element__title").textContent = this._name;
      cardImage.alt = this._name;
      cardImage.src  = this._link;
    
      this._setEventListeners();
    
      return this._card;
    }
}

