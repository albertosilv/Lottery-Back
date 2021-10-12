'use strict'

class Bet {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      user_id: 'required',
      game: 'required',
      numbers: 'required'
    }
  }
}

module.exports = Bet
