import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {
  Route.get(
    '/attendances/services/top-contracted',
    'AttendancesController.topContractedServices'
  );
  Route.get(
    '/attendances/professionals/top-contracted',
    'AttendancesController.topContractedProfessionals'
  );
  Route.get(
    '/attendances/evaluations/:serviceId',
    'AttendancesController.getEvaluations'
  );
  Route.get(
    '/attendances/contracts_by_service',
    'AttendancesController.countContractsByService'
  );
});

// Rotas protegidas (só precisa de autenticação)
Route.group(() => {
  Route.get('/attendances', 'AttendancesController.index');
  Route.get('/attendances/:id', 'AttendancesController.show');
  Route.patch('/attendances/cancel/:id', 'AttendancesController.cancel');
  Route.put('/attendances/:id', 'AttendancesController.update');
}).middleware('auth');

// Rotas privadas
Route.group(() => {
  Route.post('/attendances', 'AttendancesController.create');
  Route.patch('/attendances/delete/:id', 'AttendancesController.delete');
  Route.patch('/attendances/restore/:id', 'AttendancesController.restore');
}).middleware(['auth', 'customerPermission']);
