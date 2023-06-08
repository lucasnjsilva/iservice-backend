import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    description: schema.string({}, [rules.required()]),
    category: schema.string({}, [rules.required()]),
    cost: schema.number([rules.required()]),
  });

  public messages: CustomMessages = {
    required: 'The {{ field }} is required.',
  };
}
