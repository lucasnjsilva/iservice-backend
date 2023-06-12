import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import CustomerAddressService from 'App/Services/CustomerAddressService';
import CreateCustomerAddressValidator from 'App/Validators/CreateCustomerAddressValidator';
import UpdateCustomerAddressValidator from 'App/Validators/UpdateCustomerAddressValidator';

export default class CustomerAddressesController {
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const customerId = auth.user!.id;
      const result = await CustomerAddressService.index(page, customerId);

      return Response.Pagination(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;
      const result = await CustomerAddressService.show(id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response, auth }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateCustomerAddressValidator);
      const customerId = auth.user!.id;
      const result = await CustomerAddressService.create(payload, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;
      const payload = await request.validate(UpdateCustomerAddressValidator);
      const result = await CustomerAddressService.update(payload, id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;

      const result = await CustomerAddressService.delete(id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;

      const result = await CustomerAddressService.restore(id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customerId = auth.user!.id;

      const result = await CustomerAddressService.destroy(id, customerId);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
