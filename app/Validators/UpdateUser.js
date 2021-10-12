'use strict'

class UpdateUser {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(401).json({ Error: errorMessages })
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email'
    }
  }

  get messages () {
    return {
      'name.required': 'Preencha o campo nome',
      'email.required': 'Preencha o campo email',
      'email.email': 'Email não existe'
    }
  }
}

module.exports = UpdateUser
