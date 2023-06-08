import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import SessionService from 'App/Services/SessionService';
import AuthenticateValidator from 'App/Validators/AuthenticateValidator';
import UpdateAdminValidator from 'App/Validators/UpdateAdminValidator';
import UpdateCustomerValidator from 'App/Validators/UpdateCustomerValidator';
import UpdateProviderValidator from 'App/Validators/UpdateProviderValidator';

export default class SessionsController {
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(AuthenticateValidator);
      const user = await SessionService.login(payload, auth);

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      const user = await SessionService.logout(auth);

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = await SessionService.show(auth);

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    try {
      const authName = auth.name;
      let payload: any;

      if (authName === 'admin') {
        payload = await request.validate(UpdateAdminValidator);
      }

      if (authName === 'customer') {
        payload = await request.validate(UpdateCustomerValidator);
      }

      if (authName === 'provider') {
        payload = await request.validate(UpdateProviderValidator);
      }

      const user = await SessionService.update(auth, payload);

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async changePassword({ auth, request, response }: HttpContextContract) {
    try {
      const { oldPassword, newPassword } = request.body();
      const user = await SessionService.changePassword(auth, oldPassword, newPassword);

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
