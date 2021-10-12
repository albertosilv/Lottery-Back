'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Game = use('App/Models/Game')
class GameController {
  async index ({ response }) {
    try {
      const games = (await Game.all()).rows
      if (games.length === 0) {
        return response.status(401).json({ Error: 'Não foram encontrados games' })
      }
      return games
    } catch (err) {
      return response.status(err.status).json({ Error: err.message })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(['type', 'description', 'range', 'price', 'max-number', 'color', 'min-cart-value'])
      const game = await Game.create(data)
      return game
    } catch (err) {
      return response.status(err.status).send({ Error: err.message })
    }
  }

  async show ({ params, request, response }) {
    try {
      const game = await Game.findOrFail(params.id)
      return game
    } catch (err) {
      return response.status(err.status).send({ Error: err.message })
    }
  }

  async update ({ params, request, response }) {
    try {
      const game = await Game.findOrFail(params.id)
      const data = request.only(['type', 'description', 'range', 'price', 'max-number', 'color', 'min-cart-value'])
      game.merge(data)
      await game.save()
      return game
    } catch (err) {
      return response.status(err.status).send({ Error: err.message })
    }
  }

  async destroy ({ response, params }) {
    try {
      const game = await Game.findOrFail(params.id)
      await game.delete()
      return response.status(200).send({ Sucess: true })
    } catch (err) {
      return response.status(err.status).send({ Error: err.message })
    }
  }
}

module.exports = GameController
