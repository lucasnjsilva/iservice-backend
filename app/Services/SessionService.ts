import { type AuthContract } from '@ioc:Adonis/Addons/Auth';
import AppError from 'App/Helpers/AppError';
import { IAccountType, type IAuthenticate } from 'App/interfaces/IAuthentication';
import type ApiTokens from 'App/Models/ApiTokens';
import Customer from 'App/Models/Customer';
import Provider from 'App/Models/Provider';

export default class SessionService {
  static async login(data: IAuthenticate, auth: AuthContract): Promise<ApiTokens> {
    const { email, password, type } = data;

    if (!IAccountType[type]) throw AppError.E_GENERIC_ERROR('This type does not exist.');

    const checkAccount = {
      customer: async () =>
        await Customer.query().whereNull('deletedAt').where('email', email).firstOrFail(),

      provider: async () =>
        await Provider.query().whereNull('deletedAt').where('email', email).firstOrFail(),
    };

    await checkAccount[IAccountType[type]]();

    const token = await auth.use(IAccountType[type]).attempt(email, password);

    return token;
  }

  static async logout(auth: AuthContract) {
    try {
      await auth.logout();
    } catch (error) {
      throw error;
    }
  }
}
