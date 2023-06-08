import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'SessionsController.login');
Route.post('/logout', 'SessionsController.logout').middleware('auth');
Route.get('/me', 'SessionsController.show').middleware('auth');
Route.put('/me', 'SessionsController.update').middleware('auth');
Route.put('/me/password', 'SessionsController.changePassword').middleware('auth');

Route.get('/healthcheck', () => ({ now: new Date().getTime() }));
