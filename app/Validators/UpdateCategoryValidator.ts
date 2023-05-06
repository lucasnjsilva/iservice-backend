import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.unique({ table: 'categories', column: 'name' })]),
  });

  public messages: CustomMessages = {
    unique: 'The {{ field }} is already exists.',
  };
}
