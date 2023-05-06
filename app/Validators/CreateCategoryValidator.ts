import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'categories', column: 'name' }),
    ]),
  });

  public messages: CustomMessages = {
    required: 'The {{ field }} is required.',
    unique: 'The {{ field }} is already exists.',
  };
}
