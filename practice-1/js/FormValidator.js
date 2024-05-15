export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.input__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  labelClass: 'form__input',
  inputErrorLableClass: 'input_type_error',
}

export class FormValidator {
  constructor(config, formItem) {
    this._config = config
    this._formItem = formItem
    this._imputsList = this._formItem.querySelectorAll(
      this._config.inputSelector,
    )
    this._formSaveButton = this._formItem.querySelector(
      this._config.submitButtonSelector,
    )
  }

  //скрытие ошибки валидации!
  hideError(inputItem) {
    const label = inputItem.closest(`label`)
    label.classList.remove(this._config.inputErrorLableClass)
  }

  //отображение ошибки валидации
  _showError(inputItem) {
    const label = inputItem.closest(`label`)
    label.classList.add(this._config.inputErrorLableClass)
  }

  //проверка валидации кнопки submit
  toggleButtonState() {
    if (this._formItem.checkValidity()) {
      this._formSaveButton.disabled = false
      this._formSaveButton.classList.remove(this._config.inactiveButtonClass)
    } else {
      this._formSaveButton.disabled = 'disabled'
      this._formSaveButton.classList.add(this._config.inactiveButtonClass)
    }
  }

  //валидация полей input
  checkInputVailidity(inputItem) {
    const inputValidity = inputItem.checkValidity()
    if (inputValidity) {
      this.hideError(inputItem)
    } else {
      this._showError(inputItem)
    }
  }

  //валидация формы
  enableValidation() {
    this.toggleButtonState()
    ;[...this._imputsList].forEach(inputItem => {
      inputItem.addEventListener('change', () => {
        //проверка валидации кнопки submit после каждого события 'input'
        this.toggleButtonState()
        //валидация полей input после каждого события 'input'
        this.checkInputVailidity(inputItem)
      })
    })
    //проверка валидации формы после события submit для того, чтобы окно заново открывалось чистое и с заблокированной кнопкой (актуально для формы с добавлением карточек)
    this._formItem.addEventListener('submit', () => {
      this.toggleButtonState()
    })
  }
}

export const formValidators = {}

export const enableValidation = config => {
  const formList = [...document.querySelectorAll(config.formSelector)]
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator
    validator.enableValidation()
  })
}

enableValidation(configValidation)
