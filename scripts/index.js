import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupProfile = document.querySelector(".popup_form_edit-profile");
const popupProfileNameInput = popupProfile.querySelector(".form__input_type_name");
const popupProfileJobInput = popupProfile.querySelector(".form__input_type_job")
const profileUserName = document.querySelector(".profile__name");
const profileUserJob = document.querySelector(".profile__job");
const popupOpenButtomElement = document.querySelector(".profile__edit");

const popupAddElement = document.querySelector(".popup_form_add-card");
const popupOpenAddButtomElement = document.querySelector(".profile__add-button");

const cardList = document.querySelector(".elements__group");
const cardAddForm = popupAddElement.querySelector(".form_type_profile");
export const zoomCardElement = document.querySelector(".popup_view-image");
export const zoomImage = document.querySelector(".popup__image");
export const zoomTitle = document.querySelector(".popup__description");

const cardTemplate = document.querySelector("#card-template");
const newAddText = document.querySelector(".form__input_type_title");
const newAddUrl = document.querySelector(".form__input_type_link");

const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type-error',
  errorClass: 'form__input-error_active'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открытие popup-окон
export function openModalWindow(popup) {
  popup.classList.add("popup_opened")
  document.addEventListener('keydown', handleEscUp);
}

popupOpenButtomElement.addEventListener("click", function(){
  popupProfileNameInput.value = profileUserName.textContent;
  popupProfileJobInput.value = profileUserJob.textContent;

  openModalWindow(popupProfile);
});

// Изменение формы профайла

function handleProfileFormSubmit (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileUserName.textContent = popupProfileNameInput.value;
  profileUserJob.textContent = popupProfileJobInput.value;

  closePopupWindow(popupProfile);
}

function createCard(item, cardTemplate) {
  const cardElement = new Card(item, cardTemplate);
  return cardElement;
}

function renderCardList(initialCards){
  initialCards.forEach((item) => {
    const cardCreate = createCard(item, cardTemplate).createCard();
    cardList.append(cardCreate); 
  })
}

function addCard(event) {
  event.preventDefault();
  const newCard = {
    "name": newAddText.value,
    "link": newAddUrl.value
  }
  const cardCreate = createCard(newCard, cardTemplate).createCard();
  cardList.prepend(cardCreate);
  cardAddForm.reset();
  closePopupWindow(popupAddElement);
  addCardFormValidator.setDisabledOnSubmitButton();
}

cardAddForm.addEventListener("submit", addCard);

// Открытие popup-окна для добавления карточки
popupOpenAddButtomElement.addEventListener("click", () => openModalWindow(popupAddElement));

popupProfile.addEventListener("submit", handleProfileFormSubmit);

popupAddElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
      closePopupWindow(popupAddElement);
  }
});
popupProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
      closePopupWindow(popupProfile);
  }
});

zoomCardElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
      closePopupWindow(zoomCardElement);
  }
});

const closePopupWindow = (modalWindow) => {
  document.removeEventListener('keydown', handleEscUp);   // удаляем событие keydown
  modalWindow.classList.remove('popup_opened');   // скрываем попап
};
// И дальше внутри коллбэка у нас есть объект event и мы можем узнать в каком месте произошел клик:
const handleEscUp = (event) => {
  if (event.key == "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopupWindow(activePopup);
  };
};

// Отрисовка карточек на странице из массива
renderCardList(initialCards);

  // Валидация форм
const profileFormValidator = new FormValidator(settings, popupProfile);
const addCardFormValidator = new FormValidator(settings, popupAddElement);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();