import Route from '@ioc:Adonis/Core/Route';

// Rotas públicas
Route.group(() => {});

// Rotas Protegidas (só precisa de autenticação)
Route.group(() => {}).middleware('auth');

// Rotas privadas
Route.group(() => {}).middleware(['auth', 'customerPermission']);

Route.group(() => {
  Route.get('/dashboard/total_customers', 'CustomersController.total');
  Route.get('/dashboard/total_providers', 'ProvidersController.total');
  Route.get('/dashboard/total_categories', 'CategoriesController.total');
  Route.get('/dashboard/total_attendances', 'AttendancesController.total');
}).middleware(['auth', 'adminPermission']);
