'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.string('type', 80).notNullable().unique()
      table.text('description', 254).notNullable()
      table.integer('range').notNullable()
      table.float('price', 2).notNullable()
      table.integer('max-number').notNullable()
      table.string('color').notNullable()
      table.integer('min-cart-value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema
