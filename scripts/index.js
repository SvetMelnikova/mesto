const popupElement = document.querySelector('.popup');
const popupCloseButtomElement = popupElement.querySelector('.popup__close');
const popupOpenButtomElement = document.querySelector('.profile__edit');
const popupSaveButtomElement =popupElement.querySelector('.form__submit');

const togglePopupVisibility = function() {
  popupElement.classList.toggle('popup_opened');

}

popupOpenButtomElement.addEventListener('click', togglePopupVisibility);
popupCloseButtomElement.addEventListener('click', togglePopupVisibility);

// Изменение формы
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');


function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Выбераем элементы, куда должны быть вставлены значения полей
  let avtor = document.querySelector('.profile__name');
  let newJob = document.querySelector('.profile__job');

  // Вставляем новые значения с помощью textContent
  avtor.textContent = name;
  newJob.textContent = job;
}

formElement.addEventListener('submit', formSubmitHandler);
popupSaveButtomElement.addEventListener('click', togglePopupVisibility); //Попап закрывается при клике на "Сохранить"

// Загрузка карточек на страницу

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


const popupAddElement = document.querySelector(".popup_form_add-card");
const popupCloseAddButtomElement = popupAddElement.querySelector('.popup__close');
const popupOpenAddButtomElement = document.querySelector('.profile__add-button');
const popupSaveAddButtomElement =popupAddElement.querySelector('.form__submit');
const cardList = document.querySelector(".elements__group");
const cardAddForm = popupAddElement.querySelector(".form_type_profile");
const zoomCardElement = document.querySelector(".popup_view-image");
const closeZoomElemnt = zoomCardElement.querySelector(".form__close");

const toggleAddPopupVisibility = function() {
  popupAddElement.classList.toggle('popup_opened');

}

popupOpenAddButtomElement.addEventListener('click', toggleAddPopupVisibility);
popupCloseAddButtomElement.addEventListener('click', toggleAddPopupVisibility);


cardAddForm.addEventListener("submit", addCard);
popupSaveAddButtomElement.addEventListener('click', toggleAddPopupVisibility);

function renderCardList(links) {
  const cards = document.querySelector("#card-template").content
  .firstElementChild.cloneNode(true);

  cards.querySelector(".element__title").textContent = links.name;
  cards.querySelector(".element__image").src  = links.link;

  setCardAction(cards);
  likeAction(cards);
  zoomCardAction(cards);

  cardList.prepend(cards);

}

function addCard(event) {
  event.preventDefault();

  const newAddText = event.currentTarget.querySelector(".form__input_type_title").value;
  const newAddUrl = event.currentTarget.querySelector(".form__input_type_link").value;

  let newCard = {name: newAddText, link: newAddUrl};

  renderCardList(newCard);
  
  event.currentTarget.reset();
}

function removeCard(event) {
  const card = event.currentTarget.closest(".element");
  card.remove();
}

function setCardAction(card) {
  card.querySelector(".element__btn-trash").addEventListener("click", removeCard);
}
// лайки карточек

function likeCard (event) {
  const card = event.currentTarget.closest(".element__like-button");
  card.classList.toggle("element__like-button_active");

}

function likeAction(card) {
  card.querySelector(".element__like-button").addEventListener('click', likeCard);
}

function zoomCard(event){
  const card = event.currentTarget.closest(".element");
  let image = card.querySelector(".element__image").src;
  let title = card.querySelector(".element__title").textContent;
  let zoomimage = document.querySelector(".popup__image");
  let zoomtitle = document.querySelector(".popup__description");
  zoomtitle.textContent = title;
  zoomimage.src = image;
  zoomCardElement.classList.add('popup_opened');

}

function zoomCardAction(card) {
  card.querySelector(".element__image").addEventListener('click', zoomCard);
}

const closeZoomCard = function(){
  zoomCardElement.classList.remove('popup_opened');
}

closeZoomElemnt.addEventListener('click', closeZoomCard);


initialCards.map(renderCardList);
