import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.post('/providers', 'ProvidersController.create');
  Route.get('/providers', 'ProvidersController.index');
  Route.get('/providers/:id', 'ProvidersController.show');
});

// Rotas Protegidas (só precisa de autenticação)
Route.group(() => {}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.put('/providers/:id', 'ProvidersController.update');
  Route.patch('/providers/delete/:id', 'ProvidersController.delete');
  Route.patch('/providers/restore/:id', 'ProvidersController.restore');
  Route.delete('/providers/:id', 'ProvidersController.destroy');
}).middleware(['auth', 'providerPermission']);
