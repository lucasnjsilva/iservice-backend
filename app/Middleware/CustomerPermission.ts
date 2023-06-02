import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type Admin from 'App/Models/Admin';
import type Customer from 'App/Models/Customer';
import type Provider from 'App/Models/Provider';
import Response from 'App/Helpers/Response';
import AccessControllService from 'App/Services/AccessControllService';
import AppError from 'App/Helpers/AppError';

export default class CustomerPermission {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      const { customerPermission } = AccessControllService;

      if (auth.name === 'customer') {
        const hasPermission = await customerPermission(auth.user as Customer);
        if (!hasPermission) throw AppError.E_UNAUTHORIZED();
        await next();
      }

      if (auth.name === 'provider') {
        const hasPermission = await customerPermission(auth.user as Provider);
        if (!hasPermission) throw AppError.E_UNAUTHORIZED();
        await next();
      }

      if (auth.name === 'admin') {
        const hasPermission = await customerPermission(auth.user as Admin);
        if (!hasPermission) throw AppError.E_UNAUTHORIZED();
        await next();
      }
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
