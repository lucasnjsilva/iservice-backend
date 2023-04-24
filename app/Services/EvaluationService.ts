import AppError from 'App/Helpers/AppError';
import Evaluation from 'App/Models/Evaluation';
import {
  type IUpdateEvaluation,
  type ICreateEvaluation,
} from 'App/interfaces/IEvaluation';
import { DateTime } from 'luxon';

export default class EvaluationService {
  static async index(page: number = 1, attendanceId: string) {
    try {
      const limit = 20;
      const query = await Evaluation.query()
        .whereNull('deletedAt')
        .where('attendanceId', attendanceId)
        .paginate(page, limit);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async show(id: string) {
    try {
      const query = await Evaluation.query()
        .preload('attendance', async (attQuery) => await attQuery.preload('service'))
        .whereNull('deletedAt')
        .where('id', id)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateEvaluation) {
    try {
      const query = await Evaluation.create(payload);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(payload: IUpdateEvaluation, id: string, customerId: string) {
    try {
      const query = await Evaluation.query()
        .select('evaluations.*')
        .join('attendances', 'evaluations.attendance_id', 'attendances.id')
        .preload('attendance')
        .whereNull('evaluations.deleted_at')
        .where('evaluations.id', id)
        .where('attendances.customer_id', customerId)
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
      const query = await Evaluation.query()
        .select('evaluations.*')
        .join('attendances', 'evaluations.attendance_id', 'attendances.id')
        .preload('attendance')
        .whereNull('evaluations.deleted_at')
        .where('evaluations.id', id)
        .where('attendances.customer_id', customerId)
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
      const query = await Evaluation.query()
        .select('evaluations.*')
        .join('attendances', 'evaluations.attendance_id', 'attendances.id')
        .preload('attendance')
        .whereNull('evaluations.deleted_at')
        .where('evaluations.id', id)
        .where('attendances.customer_id', customerId)
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
      const query = await Evaluation.query()
        .select('evaluations.*')
        .join('attendances', 'evaluations.attendance_id', 'attendances.id')
        .preload('attendance')
        .whereNull('evaluations.deleted_at')
        .where('evaluations.id', id)
        .where('attendances.customer_id', customerId)
        .first();

      if (!query) throw AppError.E_NOT_FOUND();

      await query.delete();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
