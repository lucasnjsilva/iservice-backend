import Route from '@ioc:Adonis/Core/Route';

// Rotas privadas
Route.group(() => {
  Route.get('/admins', 'AdminsController.index');
  Route.get('/admins/:id', 'AdminsController.show');
  Route.post('/admins', 'AdminsController.create');
  Route.put('/admins/:id', 'AdminsController.update');
  Route.patch('/admins/delete/:id', 'AdminsController.delete');
  Route.patch('/admins/restore/:id', 'AdminsController.restore');
  Route.delete('/admins/:id', 'AdminsController.destroy');
}).middleware(['auth', 'adminPermission']);

Route.group(() => {
  Route.put('/admins/password/:id', 'AdminsController.changePassword');
}).middleware(['auth', 'adminPermission']);
