import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'SessionsController.login');
Route.post('/logout', 'SessionsController.logout').middleware('auth');

Route.get('/healthcheck', () => ({ now: new Date().getTime() }));
