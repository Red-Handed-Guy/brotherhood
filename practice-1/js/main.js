import { FormLogo } from './FormLogo.js'
import {
  enableValidation,
  configValidation,
  formValidators,
} from './FormValidator.js'
import { ButtonEvent } from './ButtonEvent.js'

const popup = document.querySelector('.popup')
const popupForm = popup.querySelector('.popup__form')

const buttonPopupOpen = document.querySelector('.button-popup-open')
const buttonPopupClose = popup.querySelector('.popup__close-button')

const handlePopupOpen = () => {
  popup.classList.add('popup_opened')
}

const handlePopupClose = () => {
  popup.classList.remove('popup_opened')
}

class FormPopupController {
  constructor(popupSelector, deleteLogo) {
    this._deleteLogo = deleteLogo
    this._popupSelector = popupSelector
    this._popup = document.querySelector(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._formInputs = this._form.querySelectorAll('.input__input')
  }

  _onSubmit = e => {
    e.preventDefault()
    const inputList = {}
    ;[...this._formInputs].forEach(input => {
      const inputName = input.getAttribute('name')
      inputList[inputName] = input.value
    })
    this._deleteLogo()
    this._form.reset()
    this._popup.classList.remove('popup_opened')
    alert(JSON.stringify(inputList))
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._onSubmit)
  }

  listen() {
    this._setEventListeners()
  }
}

const formLogo = new FormLogo(popupForm, formValidators)

const handleDeleteLogo = () => {
  formLogo.deleteLogo()
}

const formPopup = new FormPopupController('.popup', handleDeleteLogo)

const formPopupOpenButton = new ButtonEvent(buttonPopupOpen, handlePopupOpen)
const formPopupCloseButton = new ButtonEvent(buttonPopupClose, handlePopupClose)

formPopupOpenButton.listen()
formPopupCloseButton.listen()
formLogo.listenInput()
formPopup.listen()
enableValidation(configValidation)
