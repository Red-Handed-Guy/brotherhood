export class FormLogo {
  constructor(formSelector, formValidators) {
    this._formSelector = formSelector
    this._formValidators = formValidators
    this._logoInput = this._formSelector.querySelector('.form__logo-input')
    this._logoImg = this._formSelector.querySelector('.form__logo-img')
    this._logoLabel = this._formSelector.querySelector(
      '.form__logo-input-label',
    )
    this._delButton = this._formSelector.querySelector('.form__logo-del-button')
  }

  _changeLogo = e => {
    const image = e.target.files[0]
    const src = URL.createObjectURL(image)
    console.log(src)
    console.log(this._logoImg)
    this._logoImg.src = src
    this._logoImg.classList.add('form__logo-img_visible')
    this._delButton.classList.add('form__logo-del-button_visible')
    this._logoLabel.classList.remove('form__logo-input-label_visible')
  }

  deleteLogo = () => {
    this._delButton.classList.remove('form__logo-del-button_visible')
    this._logoImg.classList.remove('form__logo-img_visible')
    this._logoLabel.classList.add('form__logo-input-label_visible')
    this._logoInput.value = ''
    this._logoImg.src = ''
    this._formValidators['form'].checkInputVailidity(this._logoInput)
    this._formValidators['form'].toggleButtonState()
  }

  _setLogoInputListeners() {
    this._logoInput.addEventListener('change', this._changeLogo)
    this._delButton.addEventListener('click', this.deleteLogo)
  }

  listenInput() {
    this._setLogoInputListeners()
  }
}
