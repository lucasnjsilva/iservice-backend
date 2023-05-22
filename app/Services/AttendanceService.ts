import AppError from 'App/Helpers/AppError';
import Attendance from 'App/Models/Attendance';
import {
  AttendanceStatus,
  type IUpdateAttendance,
  type ICreateAttendance,
} from 'App/interfaces/IAttendance';
import { DateTime } from 'luxon';

export default class AttendanceService {
  static async index(page: number = 1, userId: string, userType: string) {
    try {
      const limit = 20;
      const query = Attendance.query()
        .select('attendances.*')
        .join('services', 'attendances.service_id', 'services.id')
        .preload('service')
        .whereNull('attendances.deleted_at');

      if (userType === 'customer') {
        query.where('attendances.customer_id', userId);
      }

      if (userType === 'provider') {
        query.where('services.provider_id', userId);
      }

      return await query.paginate(page, limit);
    } catch (error) {
      throw error;
    }
  }

  static async show(id: string, userId: string, userType: string) {
    try {
      const query = Attendance.query()
        .select('attendances.*')
        .join('services', 'attendances.service_id', 'services.id')
        .preload('service', async (service) => await service.preload('provider'))
        .preload('customer')
        .whereNull('attendances.deleted_at')
        .where('attendances.id', id);

      if (userType === 'customer') {
        query.where('attendances.customer_id', userId);
      }

      if (userType === 'provider') {
        query.where('services.provider_id', userId);
      }

      if (!query) throw AppError.E_NOT_FOUND();

      return await query.firstOrFail();
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: ICreateAttendance, customerId: string) {
    try {
      const data = {
        ...payload,
        customerId,
        solicitationDate: DateTime.now(),
        status: AttendanceStatus.PENDING,
      };

      const query = await Attendance.create(data);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async update(payload: IUpdateAttendance, id: string, customerId: string) {
    try {
      const query = await Attendance.query()
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
      const query = await Attendance.query()
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
      const query = await Attendance.query()
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

  static async cancel(id: string, userId: string, userType: string) {
    try {
      if (userType === 'customer') {
        const query = await Attendance.query()
          .whereNull('deletedAt')
          .where('id', id)
          .where('customerId', userId)
          .first();

        if (!query) throw AppError.E_NOT_FOUND();

        await query.merge({ status: AttendanceStatus.CANCELED_BY_CUSTOMER }).save();

        return query;
      }

      if (userType === 'provider') {
        const query = await Attendance.query()
          .select('attendances.*')
          .join('services', 'attendances.service_id', 'services.id')
          .preload('service', async (service) => await service.preload('provider'))
          .whereNull('attendances.deleted_at')
          .where('attendances.id', id)
          .where('services.provider_id', userId)
          .first();

        if (!query) throw AppError.E_NOT_FOUND();

        await query.merge({ status: AttendanceStatus.CANCELED_BY_PROVIDER }).save();

        return query;
      }
    } catch (error) {
      throw error;
    }
  }

  static async topContractedServices() {
    try {
      const query = await Attendance.query()
        .select('attendances.service_id')
        .join('services', 'attendances.service_id', 'services.id')
        .preload('service', (qs) => {
          qs.whereNull('deletedAt').preload('provider', (qp) => {
            qp.whereNull('deletedAt');
          });
        })
        .whereNull('attendances.deleted_at')
        .whereNull('services.deleted_at')
        .groupBy('attendances.service_id')
        .count('*', 'contractCount')
        .orderBy('contractCount', 'desc')
        .limit(4);

      return query;
    } catch (error) {
      throw error;
    }
  }

  static async topContractedProfessionals() {
    try {
      const query = await Attendance.query()
        .select('attendances.service_id')
        .join('services', 'attendances.service_id', 'services.id')
        .preload('service', (qs) => {
          qs.whereNull('deletedAt').preload('provider', (qp) => {
            qp.whereNull('deletedAt');
          });
        })
        .whereNull('attendances.deleted_at')
        .whereNull('services.deleted_at')
        .groupBy('services.provider_id')
        .count('*', 'contractCount')
        .orderBy('contractCount', 'desc')
        .limit(4);

      return query;
    } catch (error) {
      throw error;
    }
  }
}
