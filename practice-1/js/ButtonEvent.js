export class ButtonEvent {
  constructor(buttonElement, onClick) {
    this._buttonElement = buttonElement
    this._onClick = onClick
  }

  _setEventListeners() {
    this._buttonElement.addEventListener('click', this._onClick)
  }

  listen() {
    this._setEventListeners()
    console.log('123')
  }
}