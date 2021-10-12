'use strict'
const crypton = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
const moment = require('moment')
const Hash = use('Hash')
class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypton.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()
      Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token },
        message => {
          message.to(user.email)
            .from('alberto.silva5456@gmail.com', 'José Alberto')
            .subject('Recuperação de senha')
        }
      )
      return user
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)
      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)
      if (tokenExpired) {
        return response.status(401).send({ Error: 'Token expirado' })
      }
      if (await Hash.verify(password, user.password)) {
        return response.status(401).send({ Error: 'Senha deve ser diferente da atual' })
      }
      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()
      return user
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }
}

module.exports = ForgotPasswordController
