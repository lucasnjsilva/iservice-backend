import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.get('/evaluations/:attendanceId', 'EvaluationsController.index');
  Route.get('/evaluations/detail/:id', 'EvaluationsController.show');
});

// Rotas protegidas (só precisa de autenticação)
Route.group(() => {}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.post('/evaluations', 'EvaluationsController.create');
  Route.put('/evaluations/:id', 'EvaluationsController.update');
  Route.patch('/evaluations/delete/:id', 'EvaluationsController.delete');
  Route.patch('/evaluations/restore/:id', 'EvaluationsController.restore');
  Route.delete('/evaluations/:id', 'EvaluationsController.destroy');
}).middleware(['auth', 'customerPermission']);
