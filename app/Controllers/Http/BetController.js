'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bet = use('App/Models/Bet')
const User = use('App/Models/User')
const Game = use('App/Models/Game')

const Mail = use('Mail')

class BetController {
  async index ({ request, response }) {
    try {
      const { id } = request.get()
      if (!id) {
        return response.status(401).json({ Error: 'Id not found' })
      }
      const bets = await Bet.query().with('game').where('user_id', id).fetch()
      return bets
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(['user_id', 'game_id', 'numbers'])
      const game = await Game.findOrFail(data.game_id)
      const user = await User.findOrFail(data.user_id)
      const bet = await Bet.create(data)
      await bet.load('game')
      Mail.send(
        ['emails.create_bet'],
        { email: user.email, numbers: bet.numbers, type: game.type },
        message => {
          message.to(user.email)
            .from('alberto.silva5456@gmail.com', 'José Alberto')
            .subject('Nova aposta criada')
        }
      )
      return bet
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }

  async show ({ params, response }) {
    try {
      const bet = await Bet.findOrFail(params.id)

      await bet.load('game')
      return bet
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }

  async update ({ params, request, response }) {
    try {
      const bet = await Bet.findOrFail(params.id)
      const data = request.only(['numbers'])
      bet.merge(data)
      await bet.save()
      return bet
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const bet = await Bet.findOrFail(params.id)
      await bet.delete()
      return response.status(200).send({ Sucess: true })
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }
}

module.exports = BetController
