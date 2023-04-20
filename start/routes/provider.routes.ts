import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.post('/providers', 'ProvidersController.create');
});

// Rotas privadas
Route.group(() => {
  Route.get('/providers/:id', 'ProvidersController.show');
  Route.put('/providers/:id', 'ProvidersController.update');
  Route.patch('/providers/delete/:id', 'ProvidersController.delete');
  Route.patch('/providers/restore/:id', 'ProvidersController.restore');
  Route.delete('/providers/:id', 'ProvidersController.destroy');
}).middleware(['auth', 'providerPermission']);

// Rotas Protegidas (só precisa de autenticação)
Route.group(() => {
  Route.get('/providers', 'ProvidersController.index');
}).middleware('auth');
