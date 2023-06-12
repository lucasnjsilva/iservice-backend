import AppError from 'App/Helpers/AppError';
import Category from 'App/Models/Category';
import { type ICreateCategory, type IUpdateCategory } from 'App/interfaces/ICategory';
import { DateTime } from 'luxon';

export default class CategoryService {
  static async index(page: number = 1) {
    try {
      const limit = 20;
      const query = await Category.query().whereNull('deletedAt').paginate(page, limit);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async show(id?: string, name?: string) {
    try {
      if (id) {
        const query = await Category.query()
          .whereNull('deletedAt')
          .where('id', id)
          .first();

        if (!query) throw AppError.E_NOT_FOUND();

        return query;
      }

      if (name) {
        const query = await Category.query()
          .whereNull('deletedAt')
          .where('name', 'like', `%${name}%`)
          .first();

        if (!query) throw AppError.E_NOT_FOUND();

        return query;
      }
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateCategory) {
    try {
      const query = await Category.create(payload);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, payload: IUpdateCategory) {
    try {
      const query = await Category.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ name: payload.name }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const query = await Category.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: DateTime.now() }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async restore(id: string) {
    try {
      const query = await Category.query()
        .whereNotNull('deletedAt')
        .where('id', id)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.merge({ deletedAt: null }).save();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id: string) {
    try {
      const query = await Category.query().whereNull('deletedAt').where('id', id).first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.delete();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async total() {
    try {
      const query = await Category.query().whereNull('deletedAt').count('* as total');

      return { total: query[0].$extras.total };
    } catch (error) {
      throw error;
    }
  }
}
