const popupElement = document.querySelector('.popup');
const popupCloseButtomElement = popupElement.querySelector('.popup__close')
const popupOpenButtomElement = document.querySelector('.profile__edit');

const togglePopupVisibility = function() {
  popupElement.classList.toggle('popup_opened')

}

popupOpenButtomElement.addEventListener('click', togglePopupVisibility);
popupCloseButtomElement.addEventListener('click', togglePopupVisibility);

// Изменение формы
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получаем значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Выбераем элементы, куда должны быть вставлены значения полей
  let avtor = document.querySelector('.profile__name')
  let newJob = document.querySelector('.profile__job');

  // Вставляем новые значения с помощью textContent
  avtor.textContent = name;
  newJob.textContent = job;
}

formElement.addEventListener('submit', formSubmitHandler);