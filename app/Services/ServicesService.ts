import AppError from 'App/Helpers/AppError';
import Service from 'App/Models/Service';
import {
  type ICreateService,
  type IUpdateService,
  type IQueryFilters,
} from 'App/interfaces/IService';
import { DateTime } from 'luxon';
import CategoryService from './CategoryService';

export default class ServicesService {
  static async index(page: number = 1, filters: IQueryFilters, userId: string | null) {
    try {
      const limit = 20;
      const query = Service.query()
        .select('services.*')
        .preload('category')
        .preload('provider')
        .join('providers', 'services.provider_id', 'providers.id')
        .join('categories', 'services.category_id', 'categories.id')
        .whereNull('services.deleted_at');

      if (filters.name) {
        query.where('services.name', 'like', `%${filters.name}%`);
      }

      if (filters.category) {
        query.where('categories.name', 'like', `%${filters.category}%`);
      }

      if (filters.uf) {
        query.where('providers.uf', filters.uf);
      }

      if (filters.city) {
        query.where('providers.city', filters.city);
      }

      if (filters.user) {
        query.where('services.provider_id', filters.user);
      }

      if (userId) {
        query.where('services.provider_id', userId);
      }

      return await query.paginate(page, limit);
    } catch (error) {
      throw error;
    }
  }

  static async show(id: number) {
    try {
      const query = await Service.query()
        .preload('provider')
        .preload('category')
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!query) throw AppError.E_NOT_FOUND('Service not found.');

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateService, providerId: string) {
    try {
      const category = await CategoryService.show(undefined, payload.category);

      if (!category) throw AppError.E_GENERIC_ERROR('Category not found.');

      const query = await Service.create({
        ...payload,
        categoryId: category.id,
        providerId,
      });

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(payload: IUpdateService, id: string, providerId: string) {
    try {
      let categoryId: string = '';
      if (payload.category) {
        const category = await CategoryService.show(undefined, payload.category);

        if (!category) throw AppError.E_GENERIC_ERROR('Category not found.');

        categoryId = category.id;
      }

      const query = await Service.query()
        .whereNull('deletedAt')
        .where('id', id)
        .where('providerId', providerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query
        .merge({
          ...payload,
          categoryId: categoryId ?? '',
        })
        .save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: number, providerId: string) {
    try {
      const query = await Service.query()
        .whereNull('deletedAt')
        .where('id', id)
        .where('providerId', providerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: DateTime.now() }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async restore(id: number, providerId: string) {
    try {
      const query = await Service.query()
        .whereNull('deletedAt')
        .where('id', id)
        .where('providerId', providerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: null }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id: number, providerId: string) {
    try {
      const query = await Service.query()
        .whereNull('deletedAt')
        .where('id', id)
        .where('providerId', providerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.delete();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
