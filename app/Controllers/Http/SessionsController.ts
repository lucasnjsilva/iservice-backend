import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import SessionService from 'App/Services/SessionService';
import AuthenticateValidator from 'App/Validators/AuthenticateValidator';

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
}
