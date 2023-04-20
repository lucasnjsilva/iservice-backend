import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ProviderService from 'App/Services/ProviderService';
import Response from 'App/Helpers/Response';
import CreateProviderValidator from 'App/Validators/CreateProviderValidator';
import UpdateProviderValidator from 'App/Validators/UpdateProviderValidator';

export default class ProvidersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const customers = await ProviderService.index(page);

      return Response.Pagination(response, customers);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await ProviderService.show(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateProviderValidator);
      const customer = await ProviderService.create(payload);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateProviderValidator);
      const customer = await ProviderService.update(id, payload);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await ProviderService.delete(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await ProviderService.restore(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await ProviderService.destroy(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
