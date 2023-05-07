import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import AdminService from 'App/Services/AdminService';
import CreateAdminValidator from 'App/Validators/CreateAdminValidator';
import UpdateProviderValidator from 'App/Validators/UpdateProviderValidator';

export default class AdminsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const result = await AdminService.index(page);

      return Response.Pagination(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await AdminService.show(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateAdminValidator);
      const result = await AdminService.create(payload);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateProviderValidator);
      const result = await AdminService.update(id, payload);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await AdminService.delete(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await AdminService.restore(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await AdminService.destroy(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
