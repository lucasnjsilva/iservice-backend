import AppError from 'App/Helpers/AppError';
import Service from 'App/Models/Service';
import { type IUpdateService, type ICreateService } from 'App/interfaces/IService';
import { DateTime } from 'luxon';
import CategoryService from './CategoryService';

export default class ServicesService {
  static async index(page: number = 1) {
    try {
      const limit = 20;
      const query = await Service.query().whereNull('deletedAt').paginate(page, limit);

      return query;
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

      if (!query) throw AppError.E_NOT_FOUND();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateService, providerId: string) {
    try {
      const category = await CategoryService.show(payload.categoryId);

      if (!category) throw AppError.E_GENERIC_ERROR('Category not found.');

      const query = await Service.create({ ...payload, providerId });

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(payload: IUpdateService, id: string, providerId: string) {
    try {
      if (payload.categoryId) {
        const category = await CategoryService.show(payload.categoryId);

        if (!category) throw AppError.E_GENERIC_ERROR('Category not found.');
      }

      const query = await Service.query()
        .whereNull('deletedAt')
        .where('id', id)
        .where('providerId', providerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge(payload).save();

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
