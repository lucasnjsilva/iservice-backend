import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string.optional({}, [rules.minLength(8)]),
    name: schema.string.optional(),
    phone: schema.string.optional(),
  });

  public messages: CustomMessages = {};
}
