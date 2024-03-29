import { type HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import CustomerService from 'App/Services/CustomerService';
import CreateCustomerValidator from 'App/Validators/CreateCustomerValidator';
import UpdateCustomerValidator from 'App/Validators/UpdateCustomerValidator';
import { type IQueryFilters } from 'App/interfaces/ICustomer';

export default class CustomersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const filters = request.qs() as IQueryFilters;
      const customers = await CustomerService.index(page, filters);

      return Response.Pagination(response, customers);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await CustomerService.show(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateCustomerValidator);
      const customer = await CustomerService.create(payload);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateCustomerValidator);
      const customer = await CustomerService.update(id, payload);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await CustomerService.delete(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await CustomerService.restore(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const customer = await CustomerService.destroy(id);

      return Response.Success(response, customer);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async changePassword({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const { oldPassword, newPassword } = request.body();
      const user = await CustomerService.changePassword(id, oldPassword, newPassword);

      return Response.Success(response, user);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async total({ response }: HttpContextContract) {
    try {
      const result = await CustomerService.total();

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
