import { type HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { responseError } from 'App/Helpers/ApiResponse';

export default class CustomersController {
  public async index({ response }: HttpContextContract) {
    try {
      //
    } catch (error) {
      return responseError(response, error);
    }
  }

  public async show({ response }: HttpContextContract) {
    try {
      //
    } catch (error) {
      return responseError(response, error);
    }
  }

  public async create({ response }: HttpContextContract) {
    try {
      //
    } catch (error) {
      return responseError(response, error);
    }
  }

  public async update({ response }: HttpContextContract) {
    try {
      //
    } catch (error) {
      return responseError(response, error);
    }
  }

  public async delete({ response }: HttpContextContract) {
    try {
      //
    } catch (error) {
      return responseError(response, error);
    }
  }
}
