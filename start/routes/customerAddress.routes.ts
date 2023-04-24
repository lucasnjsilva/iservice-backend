import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {});

// Rotas protegidas (só precisa de autenticação)
Route.group(() => {}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.get('/customer_addresses', 'CustomerAddressesController.index');
  Route.get('/customer_addresses/:id', 'CustomerAddressesController.show');
  Route.post('/customer_addresses', 'CustomerAddressesController.create');
  Route.put('/customer_addresses/:id', 'CustomerAddressesController.update');
  Route.patch('/customer_addresses/delete/:id', 'CustomerAddressesController.delete');
  Route.patch('/customer_addresses/restore/:id', 'CustomerAddressesController.restore');
  Route.delete('/customer_addresses/:id', 'CustomerAddressesController.destroy');
}).middleware(['auth', 'customerPermission']);
