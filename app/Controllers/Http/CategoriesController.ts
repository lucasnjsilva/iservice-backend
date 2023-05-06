import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Response from 'App/Helpers/Response';
import CategoryService from 'App/Services/CategoryService';
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator';
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator';

export default class CategoriesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.qs();
      const result = await CategoryService.index(page);

      return Response.Pagination(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await CategoryService.show(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateCategoryValidator);
      const result = await CategoryService.create(payload);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateCategoryValidator);
      const result = await CategoryService.update(id, payload);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await CategoryService.delete(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async restore({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await CategoryService.restore(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const result = await CategoryService.destroy(id);

      return Response.Success(response, result);
    } catch (error) {
      return Response.Error(response, error);
    }
  }
}
