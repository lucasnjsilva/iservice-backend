import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateAdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string.optional({}, [rules.email()]),
    password: schema.string.optional({}, [rules.minLength(8)]),
    name: schema.string.optional({}, []),
    phone: schema.string.optional({}, []),
  });

  public messages: CustomMessages = {
    unique: 'The {{ field }} already is registered.',
  };
}
