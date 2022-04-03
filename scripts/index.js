const popupProfile = document.querySelector(".popup_form_edit-profile");
const popupProfileNameInput = popupProfile.querySelector(".form__input_type_name");
const popupProfileJobInput = popupProfile.querySelector(".form__input_type_job")
const profileUserName = document.querySelector(".profile__name");
const profileUserJob = document.querySelector(".profile__job");
const popupCloseButtomElement = popupProfile.querySelector(".popup__close");
const profileForm = popupProfile.querySelector(".form_type_profile")
const popupOpenButtomElement = document.querySelector(".profile__edit");
const popupSaveButtomElement = popupProfile.querySelector('.form__submit');

const popupAddElement = document.querySelector(".popup_form_add-card");
const popupOpenAddButtomElement = document.querySelector(".profile__add-button");
const popupCloseAddButtomElement = popupAddElement.querySelector(".popup__close");
const popupSaveAddButtomElement =popupAddElement.querySelector(".form__submit");

const cardList = document.querySelector(".elements__group");

const cardAddForm = popupAddElement.querySelector(".form_type_profile");
const zoomCardElement = document.querySelector(".popup_view-image");
const closeZoomElement = zoomCardElement.querySelector(".popup__close");

const cardElement = document.querySelector("#card-template");
const newAddText = document.querySelector(".form__input_type_title");
const newAddUrl = document.querySelector(".form__input_type_link");

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
function openModalWindow(popupProfile) {
  popupProfile.classList.add("popup_opened")
  document.addEventListener('keydown', handleEscUp);
} 
// Закрытие popup-окон
function closeModalWindow(popupProfile) {
  popupProfile.classList.remove("popup_opened")
} 

popupOpenButtomElement.addEventListener("click", function(){
  popupProfileNameInput.value = profileUserName.textContent;
  popupProfileJobInput.value = profileUserJob.textContent;

  openModalWindow(popupProfile);
});

// Изменение формы профайла

function formSubmitHandler (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileUserName.textContent = popupProfileNameInput.value;
  profileUserJob.textContent = popupProfileJobInput.value;

  closeModalWindow(popupProfile)
  profileForm.reset();
}

// Создание карточки
function createCard(cardLink, cardName) {
  const card = cardElement.content.firstElementChild.cloneNode(true);

  card.querySelector(".element__title").textContent = cardName;
  card.querySelector(".element__image").src  = cardLink;

  removeCardAction(card);
  setLikeButtonListener(card);
  zoomCardAction(card);

  return card
}

// Удаление карточки
function removeCard(event) {
  const card = event.currentTarget.closest(".element");
  card.remove();
}

function removeCardAction(card) {
  card.querySelector(".element__btn-trash").addEventListener("click", removeCard);
}
// лайки карточек

function likeCard (event) {
  const card = event.currentTarget.closest(".element__like-button");
  card.classList.toggle("element__like-button_active");

}

function setLikeButtonListener(card) {
  card.querySelector(".element__like-button").addEventListener("click", likeCard);
}

// Увеличение картинки
function zoomCard(event){
  const card = event.currentTarget.closest(".element");
  const image = card.querySelector(".element__image").src;
  const title = card.querySelector(".element__title").textContent;
  const zoomImage = document.querySelector(".popup__image");
  const zoomTitle = document.querySelector(".popup__description");
  zoomTitle.textContent = title;
  zoomImage.src = image;
  openModalWindow(zoomCardElement);
}

function zoomCardAction(card) {
  card.querySelector(".element__image").addEventListener("click", zoomCard);
}

function renderCardList(initialCards){
  initialCards.forEach((item) => {
    cardList.append(createCard(item.link, item.name)); 
  })
}

function addCard(event) {
  event.preventDefault();

  cardList.prepend(createCard(newAddUrl.value, newAddText.value));
  cardAddForm.reset();
}

cardAddForm.addEventListener("submit", addCard);

// Открытие(закрытие) popup-окна для добавления карточки
popupOpenAddButtomElement.addEventListener("click", () => openModalWindow(popupAddElement));
popupCloseAddButtomElement.addEventListener("click", () => closeModalWindow(popupAddElement));
popupCloseButtomElement.addEventListener("click", () => closeModalWindow(popupProfile));
popupSaveAddButtomElement.addEventListener("click", () => closeModalWindow(popupAddElement));
closeZoomElement.addEventListener("click", () => closeModalWindow(zoomCardElement));

popupProfile.addEventListener("submit", formSubmitHandler);

popupAddElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
    closeModalWindow(popupAddElement);
  }
});
popupProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
    closeModalWindow(popupProfile);
  }
});

const closePopupWindow = (modalWindow) => {
  document.removeEventListener('keydown', handleEscUp);   // удаляем событие keydown
  modalWindow.classList.remove('popup_opened');   // скрываем попап
};
// И дальше внутри коллбэка у нас есть объект event и мы можем узнать в каком месте произошел клик:
const handleEscUp = (event) => {
  event.preventDefault();
  const activePopup = document.querySelector('.popup_opened');
  if (event.key === "Escape") {
    closePopupWindow(activePopup);
  }else{
    document.removeEventListener('keydown', handleEscUp);  
  }
};

// Отрисовка карточек на странице из массива
renderCardList(initialCards);
