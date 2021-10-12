'use strict'

class Auth {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(401).json({ Error: errorMessages })
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'Preencha o campo email',
      'email.email': 'Email não existe',
      'password.required': 'Preencha o campo password'
    }
  }
}

module.exports = Auth
