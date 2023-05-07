import { type AuthContract } from '@ioc:Adonis/Addons/Auth';
import AppError from 'App/Helpers/AppError';
import { IAccountType, type IAuthenticate } from 'App/interfaces/IAuthentication';
import Admin from 'App/Models/Admin';
import type ApiTokens from 'App/Models/ApiTokens';
import Customer from 'App/Models/Customer';
import Provider from 'App/Models/Provider';
import CustomerService from './CustomerService';
import ProviderService from './ProviderService';
import AdminService from './AdminService';

export default class SessionService {
  static async login(data: IAuthenticate, auth: AuthContract): Promise<ApiTokens> {
    const { email, password, type } = data;

    if (!IAccountType[type]) throw AppError.E_GENERIC_ERROR('This type does not exist.');

    const checkAccount = {
      admin: async () =>
        await Admin.query().whereNull('deletedAt').where('email', email).firstOrFail(),

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

  static async show(auth: AuthContract) {
    try {
      if (auth.name === 'admin') {
        const query = await AdminService.show(auth.user!.id);

        return query;
      }

      if (auth.name === 'customer') {
        const query = await CustomerService.show(auth.user!.id);

        return query;
      }

      if (auth.name === 'provider') {
        const query = await ProviderService.show(auth.user!.id);

        return query;
      }
    } catch (error) {
      throw error;
    }
  }
}
