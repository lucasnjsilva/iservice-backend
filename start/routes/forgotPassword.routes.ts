import Route from '@ioc:Adonis/Core/Route';

Route.post('/forgot_password/send', 'ForgotPasswordsController.send');
Route.post('/forgot_password/verify', 'ForgotPasswordsController.verify');
Route.post('/forgot_password/reset', 'ForgotPasswordsController.reset');
