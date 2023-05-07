import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SilentAuthMiddleware {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const customer = await auth.use('customer').check();
    const provider = await auth.use('provider').check();
    const admin = await auth.use('admin').check();

    if (customer) {
      auth.defaultGuard = 'customer';
    }

    if (provider) {
      auth.defaultGuard = 'provider';
    }

    if (admin) {
      auth.defaultGuard = 'admin';
    }

    await auth.check();
    await next();
  }
}
