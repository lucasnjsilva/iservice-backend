import Route from '@ioc:Adonis/Core/Route';

Route.get('/customers', 'CustomersController.index');
Route.get('/customers/:id', 'CustomersController.show');
Route.post('/customers', 'CustomersController.create');
Route.put('/customers/:id', 'CustomersController.update');
Route.patch('/customers/:id', 'CustomersController.delete');
Route.patch('/customers/:id', 'CustomersController.restore');
Route.delete('/customers/:id', 'CustomersController.destroy');
