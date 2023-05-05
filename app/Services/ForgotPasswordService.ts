import Env from '@ioc:Adonis/Core/Env';
import Mail from '@ioc:Adonis/Addons/Mail';
import View from '@ioc:Adonis/Core/View';
import ForgotPassword from 'App/Models/ForgotPassword';
import Customer from 'App/Models/Customer';
import { IUserRoles } from 'App/interfaces/IUserRoles';
import Provider from 'App/Models/Provider';
import AppError from 'App/Helpers/AppError';
import { ForgotPasswordStatus } from 'App/interfaces/IForgotPassword';

export default class ForgotPasswordService {
  static async send(email: string, userType: IUserRoles) {
    try {
      let model: Customer | Provider | null = null;

      if (userType === IUserRoles.customer) {
        model = await Customer.query()
          .whereNull('deletedAt')
          .where('email', email)
          .firstOrFail();
      }

      if (userType === IUserRoles.provider) {
        model = await Provider.query()
          .whereNull('deletedAt')
          .where('email', email)
          .firstOrFail();
      }

      if (!model) throw AppError.E_GENERIC_ERROR('User type not found.');

      const token = await ForgotPassword.generateToken(model);
      const link = `${Env.get('DOMAIN')}/users/password/reset?token=${token}`;
      const html = await View.render('ForgotPassword.index', { link });

      await ForgotPassword.changeStatus(token, ForgotPasswordStatus.PENDING);

      const mail = await Mail.sendLater((message) => {
        message
          .from(Env.get('EMAIL'))
          .to(model!.email)
          .subject('Recuperar senha - iService')
          .html(html);
      }).catch(async () => {
        await ForgotPassword.changeStatus(token, ForgotPasswordStatus.ERROR);
      });

      await ForgotPassword.changeStatus(token, ForgotPasswordStatus.EMAIL_SENT);

      return mail;
    } catch (error) {
      throw error;
    }
  }

  static async verify(token: string, userType: IUserRoles) {
    try {
      const isValid = await ForgotPassword.verify(token, userType);

      if (!isValid) {
        await ForgotPassword.changeStatus(token, ForgotPasswordStatus.EXPIRED);
      }

      return { isValid, token };
    } catch (error) {
      throw error;
    }
  }

  static async reset(token: string, password: string, userType: IUserRoles) {
    try {
      const user = await ForgotPassword.getPasswordReset(token, userType);

      if (!user) {
        throw AppError.E_GENERIC_ERROR(
          'Token expired or associated user could not be found.'
        );
      }

      await user.merge({ password }).save();
      await ForgotPassword.changeStatus(token, ForgotPasswordStatus.RESETED);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
