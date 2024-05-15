import { FormLogo } from './FormLogo.js'
import {
  enableValidation,
  configValidation,
  formValidators,
} from './FormValidator.js'

const popup = document.querySelector('.popup')
const popupForm = popup.querySelector('.popup__form')





const formLogo = new FormLogo(popupForm, formValidators)
formLogo.listenInput()
enableValidation(configValidation)
