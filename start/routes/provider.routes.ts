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
  Route.patch(
    '/providers/profile_image/delete',
    'ProvidersController.deleteProfileImage'
  );
  Route.delete('/providers/:id', 'ProvidersController.destroy');
}).middleware(['auth', 'providerPermission']);

Route.group(() => {
  Route.put('/providers/password/:id', 'ProvidersController.changePassword');
}).middleware(['auth', 'adminPermission']);
