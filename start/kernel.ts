import Server from '@ioc:Adonis/Core/Server';

Server.middleware.register([
  async () => await import('@ioc:Adonis/Core/BodyParser'),
  async () => await import('App/Middleware/SilentAuth'),
]);

Server.middleware.registerNamed({
  auth: async () => await import('App/Middleware/Auth'),
  customerPermission: async () => await import('App/Middleware/CustomerPermission'),
  providerPermission: async () => await import('App/Middleware/ProviderPermission'),
  adminPermission: async () => await import('App/Middleware/AdminPermission'),
});
