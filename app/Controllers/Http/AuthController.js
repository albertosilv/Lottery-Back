'use strict'
const User = use('App/Models/User')
class AuthController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const user = await User.query().where('email', email).select('id', 'name', 'email').first()
      if (!user) {
        return response.status(401).json({ Error: 'Usuário não encontrado' })
      }
      const token = await auth.attempt(email, password)
      return { token, user }
    } catch (err) {
      if (err.name === 'PasswordMisMatchException') {
        return response.status(err.status).json({ Error: 'Senha incorreta' })
      }
      return response.status(err.status).json({ Error: err.message })
    }
  }
}

module.exports = AuthController
