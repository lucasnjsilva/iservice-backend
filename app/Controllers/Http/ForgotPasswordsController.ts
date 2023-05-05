import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import ForgotPasswordService from 'App/Services/ForgotPasswordService';
import { IUserRoles } from 'App/interfaces/IUserRoles';

export default class CustomerForgotPasswordsController {
  public async send({ request, response }: HttpContextContract) {
    try {
      const { email, userType } = request.body();
      const passwordReset = await ForgotPasswordService.send(email, IUserRoles[userType]);

      return Response.Success(response, passwordReset);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async verify({ request, response }: HttpContextContract) {
    try {
      const { token, userType } = request.body();
      const isValid = await ForgotPasswordService.verify(token, IUserRoles[userType]);

      return Response.Success(response, isValid);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async reset({ request, response }: HttpContextContract) {
    try {
      const { token, password, userType } = request.body();

      const user = await ForgotPasswordService.reset(
        token,
        password,
        IUserRoles[userType]
      );

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
