import AppError from 'App/Helpers/AppError';
import Provider from 'App/Models/Provider';
import { type ICreateProvider, type IUpdateProvider } from 'App/interfaces/IProvider';
import { DateTime } from 'luxon';
import { cuid } from '@ioc:Adonis/Core/Helpers';
import Drive from '@ioc:Adonis/Core/Drive';

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
      const query = await Provider.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateProvider) {
    try {
      const { email, cnpj, profileImage } = payload;

      // Verifications
      const providerEmailExists = await Provider.query()
        .whereNull('deletedAt')
        .where('email', email)
        .first();

      if (providerEmailExists) {
        throw AppError.E_GENERIC_ERROR("The provider's e-mail is already registered.");
      }

      const providerCNPJExists = await Provider.query()
        .whereNull('deletedAt')
        .where('cnpj', cnpj)
        .first();

      if (providerCNPJExists) {
        throw AppError.E_GENERIC_ERROR("The provider's cnpj is already registered.");
      }

      // Upload
      const filename = `${cuid()}.${profileImage.extname}`;
      let profileImagePath = '';

      if (profileImage) {
        await profileImage.moveToDisk('profile_images', { name: filename });
        profileImagePath = filename;
      }

      // Create Data
      const query = await Provider.create({ ...payload, profileImage: profileImagePath });

      return query;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async update(id: string, payload: IUpdateProvider) {
    try {
      const provider = await Provider.query()
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!provider) throw AppError.E_NOT_FOUND();

      let email: string | undefined = '';
      let cnpj: string | undefined = '';
      if (provider.email !== payload.email) email = payload.email;
      if (provider.cnpj !== payload.cnpj) cnpj = payload.cnpj;

      if (payload.profileImage) {
        const currentFilename = provider.profileImage;
        const newFilename = `${cuid()}.${payload.profileImage.extname}`;

        await Drive.delete(`profile_images/${currentFilename}`);
        await payload.profileImage.moveToDisk('profile_images', { name: newFilename });

        const data = {
          ...payload,
          email: email ?? payload.email,
          cnpj: cnpj ?? payload.email,
          profileImage: newFilename,
        };

        await provider.merge(data).save();

        return provider;
      }

      const data = {
        ...payload,
        email: email ?? payload.email,
        cnpj: cnpj ?? payload.email,
      };

      await provider.merge(data).save();

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

      if (!provider) throw AppError.E_NOT_FOUND();

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

      if (!provider) throw AppError.E_NOT_FOUND();

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

      if (!provider) throw AppError.E_NOT_FOUND();

      const currentFilename = provider.profileImage;
      await Drive.delete(`profile_images/${currentFilename}`);

      await provider.delete();

      return provider;
    } catch (error) {
      throw error;
    }
  }
}
