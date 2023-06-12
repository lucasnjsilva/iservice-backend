import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import AttendanceService from 'App/Services/AttendanceService';
import CreateAttendanceValidator from 'App/Validators/CreateAttendanceValidator';
import UpdateAttendanceValidator from 'App/Validators/UpdateAttendanceValidator';

export default class AttendancesController {
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const {
        page,
        limit,
        provider,
        customer,
        phone,
        service,
        solicitationDate,
        attendanceDate,
        status,
      } = request.qs();

      const userId = auth.user!.id;
      const userType = auth.name;
      const filters = {
        provider,
        customer,
        phone,
        service,
        solicitationDate,
        attendanceDate,
        status,
      };

      const result = await AttendanceService.index(
        page,
        userId,
        userType,
        limit,
        filters
      );

      return Response.Pagination(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const userId = auth.user!.id;
      const userType = auth.name;
      const result = await AttendanceService.show(id, userId, userType);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response, auth }: HttpContextContract) {
    try {
      const customerId = auth.user!.id;
      const payload = await request.validate(CreateAttendanceValidator);
      const result = await AttendanceService.create(payload, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const userId = auth.user!.id;
      const userType = auth.name;
      const payload = await request.validate(UpdateAttendanceValidator);
      const result = await AttendanceService.update(payload, id, userId, userType);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const userId = auth.user!.id;
      const result = await AttendanceService.delete(id, userId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const userId = auth.user!.id;
      const result = await AttendanceService.restore(id, userId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async cancel({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const userId = auth.user!.id;
      const userType = auth.name;
      const result = await AttendanceService.cancel(id, userId, userType);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async total({ response }: HttpContextContract) {
    try {
      const result = await AttendanceService.total();

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async topContractedServices({ response }: HttpContextContract) {
    try {
      const result = await AttendanceService.topContractedServices();

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async topContractedProfessionals({ response }: HttpContextContract) {
    try {
      const result = await AttendanceService.topContractedProfessionals();

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async getEvaluations({ request, response, params }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const { serviceId } = params;
      const result = await AttendanceService.getEvaluations(serviceId, page);

      return Response.Pagination(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async countContractsByService({ request, response }: HttpContextContract) {
    try {
      const { user } = request.qs();
      const result = await AttendanceService.countContractsByService(user);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
