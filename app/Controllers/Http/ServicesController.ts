import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import ServicesService from 'App/Services/ServicesService';
import CreateServiceValidator from 'App/Validators/CreateServiceValidator';
import UpdateServiceValidator from 'App/Validators/UpdateServiceValidator';

export default class ServicesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const result = await ServicesService.index(page);

      return Response.Pagination(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await ServicesService.show(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response, auth }: HttpContextContract) {
    try {
      const providerId = auth.user!.id;
      const payload = await request.validate(CreateServiceValidator);
      const result = await ServicesService.create(payload, providerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const providerId = auth.user!.id;
      const payload = await request.validate(UpdateServiceValidator);
      const result = await ServicesService.update(payload, id, providerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const providerId = auth.user!.id;
      const result = await ServicesService.delete(id, providerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const providerId = auth.user!.id;
      const result = await ServicesService.restore(id, providerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const providerId = auth.user!.id;
      const result = await ServicesService.destroy(id, providerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}