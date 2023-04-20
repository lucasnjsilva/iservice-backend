import { type ICreateProvider, type IUpdateProvider } from 'App/interfaces/IProvider';
import Provider from 'App/Models/Provider';
import { DateTime } from 'luxon';

export default class ProviderService {
  static async index(page: number = 1) {
    try {
      const limit = 20;
      const query = await Provider.query().whereNull('deletedAt').paginate(page, limit);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async show(id: string) {
    try {
      const query = await Provider.query()
        .whereNull('deletedAt')
        .where('id', id)
        .firstOrFail();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateProvider) {
    try {
      const { email } = payload;
      const providerExists = await Provider.query()
        .whereNull('deletedAt')
        .where('email', email)
        .first();

      if (providerExists) throw new Error("The provider's e-mail is already registered.");

      const query = await Provider.create(payload);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, payload: IUpdateProvider) {
    try {
      const provider = await Provider.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!provider) throw new Error('Provider not found.');

      await provider.merge(payload).save();

      return provider;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const provider = await Provider.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!provider) throw new Error('Provider not found.');

      await provider.merge({ deletedAt: DateTime.now() }).save();

      return provider;
    } catch (error) {
      throw error;
    }
  }

  static async restore(id: string) {
    try {
      const provider = await Provider.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!provider) throw new Error('Provider not found.');

      await provider.merge({ deletedAt: null }).save();

      return provider;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id: string) {
    try {
      const provider = await Provider.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!provider) throw new Error('Provider not found.');

      await provider.delete();

      return provider;
    } catch (error) {
      throw error;
    }
  }
}
