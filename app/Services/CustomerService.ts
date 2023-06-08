import AppError from 'App/Helpers/AppError';
import Customer from 'App/Models/Customer';
import { type IUpdateCustomer, type ICreateCustomer } from 'App/interfaces/ICustomer';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';

export default class CustomerService {
  static async index(page: number = 1) {
    try {
      const limit = 20;
      const query = await Customer.query().whereNull('deletedAt').paginate(page, limit);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async show(id: string) {
    try {
      const query = await Customer.query().whereNull('deletedAt').where('id', id).first();

      if (!query) {
        throw AppError.E_NOT_FOUND();
      }

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateCustomer) {
    try {
      const { email } = payload;
      const customerExists = await Customer.query()
        .whereNull('deletedAt')
        .where('email', email)
        .first();

      if (customerExists)
        throw AppError.E_GENERIC_ERROR("The customer's e-mail is already registered.");

      const query = await Customer.create(payload);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, payload: IUpdateCustomer) {
    try {
      const customer = await Customer.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!customer) throw AppError.E_NOT_FOUND();

      await customer.merge(payload).save();

      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const customer = await Customer.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!customer) throw AppError.E_NOT_FOUND();

      await customer.merge({ deletedAt: DateTime.now() }).save();

      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async restore(id: string) {
    try {
      const customer = await Customer.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!customer) throw AppError.E_NOT_FOUND();

      await customer.merge({ deletedAt: null }).save();

      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id: string) {
    try {
      const customer = await Customer.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!customer) throw AppError.E_NOT_FOUND();

      await customer.delete();

      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async changePassword(id: string, oldPassword: string, newPassword: string) {
    try {
      const query = await Customer.query().whereNull('deletedAt').where('id', id).first();

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
