import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.get('/services', 'ServicesController.index');
});

// Rotas privadas
Route.group(() => {
  Route.get('/services/:id', 'ServicesController.show');
  Route.post('/services', 'ServicesController.create');
  Route.put('/services/:id', 'ServicesController.update');
  Route.patch('/services/delete/:id', 'ServicesController.delete');
  Route.patch('/services/restore/:id', 'ServicesController.restore');
  Route.delete('/services', 'ServicesController.destroy');
}).middleware(['auth', 'providerPermission']);

// Rotas protegidas
Route.group(() => {});
