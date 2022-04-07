const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type-error',
  errorClass: 'form__input-error_active'
};
// валидация форм
const isValid = (formElement, inputElement, arrayList) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, arrayList);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, arrayList);
  }
}; 

const showInputError = (formElement, inputElement, errorMessage, arrayList) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(arrayList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(arrayList.errorClass);
};

const hideInputError = (formElement, inputElement, arrayList) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(arrayList.inputErrorClass);
  errorElement.classList.remove(arrayList.errorClass);
  errorElement.textContent = '';
}; 

const setEventListeners = (formElement, arrayList) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(arrayList.inputSelector));
  const buttonElement = formElement.querySelector(arrayList.submitButtonSelector);
   // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
   toggleButtonState(inputList, buttonElement, arrayList);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, arrayList)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, arrayList);
    });
  });
};

const enableValidation = (arrayList) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(arrayList.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, arrayList);
  });
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, arrayList) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(arrayList.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(arrayList.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}; 

// Вызовем функцию
enableValidation(settings); 