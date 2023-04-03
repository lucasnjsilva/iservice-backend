import { type AuthContract } from '@ioc:Adonis/Addons/Auth';
import { IAccountType, type IAuthenticate } from 'App/interfaces/IAuthentication';
import type ApiTokens from 'App/Models/ApiTokens';
import Customer from 'App/Models/Customer';
import Provider from 'App/Models/Provider';

export default class SessionService {
  static async login(data: IAuthenticate, auth: AuthContract): Promise<ApiTokens> {
    const { email, password, type } = data;

    if (!IAccountType[type]) throw new Error('This type does not exist.');

    if (type === IAccountType.customer) {
      await Customer.query().whereNull('deletedAt').where('email', email).firstOrFail();
    }

    if (type === IAccountType.provider) {
      await Provider.query().whereNull('deletedAt').where('email', email).firstOrFail();
    }

    const token: any = await auth.use(IAccountType[type]).attempt(email, password);

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
