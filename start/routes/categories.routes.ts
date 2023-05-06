import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.get('/categories', 'CategoriesController.index');
  Route.get('/categories/:id', 'CategoriesController.show');
});

// Rotas protegidas (só precisa de autenticação)
Route.group(() => {}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.post('/categories', 'CategoriesController.create');
  Route.put('/categories/:id', 'CategoriesController.update');
  Route.patch('/categories/delete/:id', 'CategoriesController.delete');
  Route.patch('/categories/restore/:id', 'CategoriesController.restore');
  Route.delete('/categories/:id', 'CategoriesController.destroy');
}).middleware(['auth']);
