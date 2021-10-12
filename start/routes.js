'use strict'

const Route = use('Route')

Route.post('user', 'UserController.store').validator('User')
Route.post('login', 'AuthController.store').validator('Auth')

Route.post('password', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('password', 'ForgotPasswordController.update').validator('ResetPassword')
Route.resource('game', 'GameController').apiOnly().validator(new Map(
  [
    [
      ['game.store'],
      ['Game']
    ]
  ]
))
Route.group(() => {
  Route.resource('bet', 'BetController').apiOnly()
  Route.put('update/:id', 'UserController.update')
}).middleware(['auth'])
