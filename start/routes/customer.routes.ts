import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.post('/customers', 'CustomersController.create');
});

// Rotas Protegidas (só precisa de autenticação)
Route.group(() => {
  Route.get('/customers', 'CustomersController.index');
}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.get('/customers/:id', 'CustomersController.show');
  Route.put('/customers/:id', 'CustomersController.update');
  Route.patch('/customers/delete/:id', 'CustomersController.delete');
  Route.patch('/customers/restore/:id', 'CustomersController.restore');
  Route.delete('/customers/:id', 'CustomersController.destroy');
}).middleware(['auth', 'customerPermission']);

Route.group(() => {
  Route.put('/customers/password/:id', 'CustomersController.changePassword');
}).middleware(['auth', 'adminPermission']);
