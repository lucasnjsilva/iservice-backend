import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.get('/services', 'ServicesController.index');
  Route.get('/services/:id', 'ServicesController.show');
});

// Rotas protegidas (só precisa de autenticação)
Route.group(() => {}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.post('/services', 'ServicesController.create');
  Route.put('/services/:id', 'ServicesController.update');
  Route.patch('/services/delete/:id', 'ServicesController.delete');
  Route.patch('/services/restore/:id', 'ServicesController.restore');
  Route.delete('/services', 'ServicesController.destroy');
}).middleware(['auth', 'providerPermission']);
