import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {});

// Rotas protegidas (só precisa de autenticação)
Route.group(() => {
  Route.get('/attendances', 'AttendancesController.index');
  Route.get('/attendances/:id', 'AttendancesController.show');
  Route.patch('/attendances/cancel/:id', 'AttendancesController.cancel');
}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.post('/attendances', 'AttendancesController.create');
  Route.put('/attendances/:id', 'AttendancesController.update');
  Route.patch('/attendances/delete/:id', 'AttendancesController.delete');
  Route.patch('/attendances/restore/:id', 'AttendancesController.restore');
}).middleware(['auth', 'customerPermission']);
