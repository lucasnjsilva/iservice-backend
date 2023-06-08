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
import { IUserRoles } from 'App/interfaces/IUserRoles';

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
        const result = query.toJSON();
        result.role = IUserRoles.admin;

        return result;
      }

      if (auth.name === 'customer') {
        const query = await CustomerService.show(auth.user!.id);
        const result = query.toJSON();
        result.role = IUserRoles.customer;

        return result;
      }

      if (auth.name === 'provider') {
        const query = await ProviderService.show(auth.user!.id);
        const result = query.toJSON();
        result.role = IUserRoles.provider;

        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async update(auth: AuthContract, payload: any) {
    try {
      if (auth.name === 'admin') {
        const query = await AdminService.update(auth.user!.id, payload);
        const result = query.toJSON();
        result.role = IUserRoles.admin;

        return result;
      }

      if (auth.name === 'customer') {
        const query = await CustomerService.update(auth.user!.id, payload);
        const result = query.toJSON();
        result.role = IUserRoles.customer;

        return result;
      }

      if (auth.name === 'provider') {
        const query = await ProviderService.update(auth.user!.id, payload);
        const result = query.toJSON();
        result.role = IUserRoles.provider;

        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async changePassword(auth: AuthContract, oldPass: string, newPass: string) {
    try {
      if (auth.name === 'admin') {
        const query = await AdminService.changePassword(auth.user!.id, oldPass, newPass);
        const result = query.toJSON();
        result.role = IUserRoles.admin;

        return result;
      }

      if (auth.name === 'customer') {
        const query = await CustomerService.changePassword(
          auth.user!.id,
          oldPass,
          newPass
        );
        const result = query.toJSON();
        result.role = IUserRoles.customer;

        return result;
      }

      if (auth.name === 'provider') {
        const query = await ProviderService.changePassword(
          auth.user!.id,
          oldPass,
          newPass
        );
        const result = query.toJSON();
        result.role = IUserRoles.provider;

        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}
