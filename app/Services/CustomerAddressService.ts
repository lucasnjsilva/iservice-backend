import AppError from 'App/Helpers/AppError';
import CustomerAddress from 'App/Models/CustomerAddress';
import {
  type IUpdateCustomerAddress,
  type ICreateCustomerAddress,
} from 'App/interfaces/ICustomerAddress';
import { DateTime } from 'luxon';

export default class CustomerAddressService {
  static async index(page: number = 1, customerId: string) {
    try {
      const limit = 20;
      const query = await CustomerAddress.query()
        .whereNull('deletedAt')
        .where('customerId', customerId)
        .paginate(page, limit);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async show(id: string, customerId: string) {
    try {
      const query = await CustomerAddress.query()
        .whereNull('deletedAt')
        .where('customerId', customerId)
        .where('id', id)
        .first();

      if (!query) {
        throw AppError.E_NOT_FOUND();
      }

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateCustomerAddress, customerId: string) {
    try {
      const query = await CustomerAddress.create({ ...payload, customerId });

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(payload: IUpdateCustomerAddress, id: string, customerId: string) {
    try {
      const query = await CustomerAddress.query()
        .whereNull('deletedAt')
        .where('id', id)
        .where('customerId', customerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge(payload).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string, customerId: string) {
    try {
      const query = await CustomerAddress.query()
        .whereNull('deletedAt')
        .where('id', id)
        .where('customerId', customerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: DateTime.now() }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async restore(id: string, customerId: string) {
    try {
      const query = await CustomerAddress.query()
        .whereNotNull('deletedAt')
        .where('id', id)
        .where('customerId', customerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: null }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id: string, customerId: string) {
    try {
      const query = await CustomerAddress.query()
        .whereNotNull('deletedAt')
        .where('id', id)
        .where('customerId', customerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.delete();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
