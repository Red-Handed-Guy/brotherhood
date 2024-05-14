const popup = document.querySelector('.popup')

const popupForm = popup.querySelector('.popup__form')

class FormLogo {
  constructor(formSelector) {
    this._formSelector = formSelector
    this._logoInput = this._formSelector.querySelector('.form__logo-input')
    this._logoImg = this._formSelector.querySelector('.form__logo-img')
  }

  _changeLogo = e => {
    const image = e.target.files[0]
    const src = URL.createObjectURL(image)
    console.log(src)
    console.log(this._logoImg)
    this._logoImg.src = src
    this._logoImg.classList.add('form__logo-img_visible')
  }

  _setLogoInputListeners() {
    this._logoInput.addEventListener('change', this._changeLogo)
  }

  listenInput() {
    this._setLogoInputListeners()
  }
}

const formLogo = new FormLogo(popupForm)

formLogo.listenInput()
