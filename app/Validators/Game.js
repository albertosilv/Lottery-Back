'use strict'

class Game {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      type: 'required:unique:games',
      description: 'required|min:10',
      range: 'required',
      price: 'required',
      'max-number': 'required',
      color: 'required',
      'min-cart-value': 'required'
    }
  }
}

module.exports = Game
