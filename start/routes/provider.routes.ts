import Route from '@ioc:Adonis/Core/Route';

Route.get('/providers', 'ProvidersController.index');
Route.get('/providers/:id', 'ProvidersController.show');
Route.post('/providers', 'ProvidersController.create');
Route.put('/providers/:id', 'ProvidersController.update');
Route.patch('/providers/delete/:id', 'ProvidersController.delete');
Route.patch('/providers/restore/:id', 'ProvidersController.restore');
Route.delete('/providers/:id', 'ProvidersController.destroy');
