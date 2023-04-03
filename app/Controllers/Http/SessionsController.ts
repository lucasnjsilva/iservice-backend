import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { responseError, responseSuccess } from 'App/Helpers/ApiResponse';
import SessionService from 'App/Services/SessionService';
import AuthenticateValidator from 'App/Validators/AuthenticateValidator';

export default class SessionsController {
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(AuthenticateValidator);
      const user = await SessionService.login(payload, auth);

      return responseSuccess(response, user);
    } catch (error) {
      return responseError(response, error);
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      const user = await SessionService.logout(auth);

      return responseSuccess(response, user);
    } catch (error) {
      return responseError(response, error);
    }
  }
}
