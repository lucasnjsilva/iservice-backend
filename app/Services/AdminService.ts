import AppError from 'App/Helpers/AppError';
import Admin from 'App/Models/Admin';
import { type ICreateAdmin, type IUpdateAdmin } from 'App/interfaces/IAdmin';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';

export default class AdminService {
  static async index(page: number = 1) {
    try {
      const limit = 20;
      const query = await Admin.query().whereNull('deletedAt').paginate(page, limit);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async show(id: string) {
    try {
      const query = await Admin.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateAdmin) {
    try {
      // Verifications
      const adminEmailExists = await Admin.query()
        .whereNull('deletedAt')
        .where('email', payload.email)
        .first();

      if (adminEmailExists) {
        throw AppError.E_GENERIC_ERROR("The admin's e-mail is already registered.");
      }

      // Create Data
      const query = await Admin.create(payload);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, payload: IUpdateAdmin) {
    try {
      const query = await Admin.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      let email: string | undefined = '';
      if (query.email !== payload.email) email = payload.email;

      const data = {
        ...payload,
        email: email ?? payload.email,
      };

      await query.merge(data).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const query = await Admin.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: DateTime.now() }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async restore(id: string) {
    try {
      const query = await Admin.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: null }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id: string) {
    try {
      const query = await Admin.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.delete();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async changePassword(id: string, oldPassword: string, newPassword: string) {
    try {
      const query = await Admin.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      if (!(await Hash.verify(query.password, oldPassword))) {
        throw AppError.E_GENERIC_ERROR('Invalid old password.');
      }

      await query.merge({ password: newPassword }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
