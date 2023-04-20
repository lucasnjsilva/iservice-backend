import Customer from 'App/Models/Customer';
import { type IUpdateCustomer, type ICreateCustomer } from 'App/interfaces/ICustomer';
import { DateTime } from 'luxon';

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
      const query = await Customer.query()
        .whereNull('deletedAt')
        .where('id', id)
        .firstOrFail();

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

      if (customerExists) throw new Error("The customer's e-mail is already registered.");

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

      if (!customer) throw new Error('Customer not found.');

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

      if (!customer) throw new Error('Customer not found.');

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

      if (!customer) throw new Error('Customer not found.');

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

      if (!customer) throw new Error('Customer not found.');

      await customer.delete();

      return customer;
    } catch (error) {
      throw error;
    }
  }
}
