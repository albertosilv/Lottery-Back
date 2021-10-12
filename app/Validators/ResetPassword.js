'use strict'

class ResetPassword {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(401).json({ Error: errorMessages })
  }

  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return {
      'toke.required': 'Preencha o campo Token',
      'password.required': 'Preencha o campo senha',
      'password.confirmed': 'Senhas não coincidem'
    }
  }
}

module.exports = ResetPassword
