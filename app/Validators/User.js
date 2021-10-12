'use strict'

class User {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(401).json({ Error: errorMessages })
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return {
      'name.required': 'Preencha o campo nome',
      'email.required': 'Preencha o campo email',
      'email.unique': 'Email já cadastrado',
      'email.email': 'Email não existe',
      'password.required': 'Preencha o campo senha',
      'password.confirmed': 'Senhas não coincidem'
    }
  }
}

module.exports = User
