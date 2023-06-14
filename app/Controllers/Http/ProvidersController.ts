import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ProviderService from 'App/Services/ProviderService';
import Response from 'App/Helpers/Response';
import CreateProviderValidator from 'App/Validators/CreateProviderValidator';
import UpdateProviderValidator from 'App/Validators/UpdateProviderValidator';
import { type IQueryFilters } from 'App/interfaces/IProvider';

export default class ProvidersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const filters = request.qs() as IQueryFilters;
      const customers = await ProviderService.index(page, filters);

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
      const profileImage = request.file('profileImage');
      const customer = await ProviderService.create({ ...payload, profileImage });

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateProviderValidator);
      const profileImage = request.file('profileImage');

      const customer = await ProviderService.update(id, { ...payload, profileImage });

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

  public async changePassword({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const { oldPassword, newPassword } = request.body();
      const user = await ProviderService.changePassword(id, oldPassword, newPassword);

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async total({ response }: HttpContextContract) {
    try {
      const result = await ProviderService.total();

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async deleteProfileImage({ response, auth }: HttpContextContract) {
    try {
      const id = auth.user!.id;
      const customer = await ProviderService.deleteProfileImage(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
