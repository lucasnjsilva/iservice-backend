import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SilentAuthMiddleware {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const customer = await auth.use('customer').check();
    const provider = await auth.use('provider').check();

    if (customer) {
      auth.defaultGuard = 'customer';
    }

    if (provider) {
      auth.defaultGuard = 'provider';
    }

    await auth.check();
    await next();
  }
}
