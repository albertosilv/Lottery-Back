'use strict'

class ForgotPassword {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(401).json({ Error: errorMessages })
  }

  get rules () {
    return {
      email: 'required|email'
    }
  }

  get messages () {
    return {
      'email.required': 'Preencha o campo email',
      'email.email': 'Email não existe'
    }
  }
}

module.exports = ForgotPassword
