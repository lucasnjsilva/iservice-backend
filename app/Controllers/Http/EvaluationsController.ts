import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import EvaluationService from 'App/Services/EvaluationService';
import CreateEvaluationValidator from 'App/Validators/CreateEvaluationValidator';
import UpdateEvaluationValidator from 'App/Validators/UpdateEvaluationValidator';

export default class EvaluationsController {
  public async index({ request, response, params }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const { attendanceId } = params;
      const result = await EvaluationService.index(page, attendanceId);

      return Response.Pagination(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await EvaluationService.show(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateEvaluationValidator);
      const result = await EvaluationService.create(payload);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;
      const payload = await request.validate(UpdateEvaluationValidator);
      const result = await EvaluationService.update(payload, id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;
      const result = await EvaluationService.delete(id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;
      const result = await EvaluationService.restore(id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;
      const result = await EvaluationService.destroy(id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async searchForAttendanceId({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await EvaluationService.searchForAttendanceId(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
