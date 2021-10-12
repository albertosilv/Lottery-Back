'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')

class UserController {
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['name', 'email', 'password'])
      if (data.password.length < 6 || data.password.length > 16) {
        return response.status(401).send({ Error: 'Senha deve conter entre 6 a 16 caracteres' })
      }
      const user = await User.create(data)
      const token = await auth.attempt(data.email, data.password)
      Mail.send(
        ['emails.create_user'],
        { name: data.name, email: user.email },
        message => {
          message.to(user.email)
            .from('alberto.silva5456@gmail.com', 'José Alberto')
            .subject('Novo usuário cadastrado')
        }
      )
      return { token, user }
    } catch (err) {
      return response.status(err.status).send({ Error: err.message })
    }
  }

  async update ({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id)
      const data = request.only(['name', 'email'])
      user.merge(data)

      await user.save()
      return user
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }
}

module.exports = UserController
