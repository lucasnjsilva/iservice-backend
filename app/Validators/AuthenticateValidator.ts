import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthenticateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    password: schema.string({}, [rules.minLength(8), rules.required()]),
    type: schema.enum(['customer', 'provider'], [rules.required()]),
  });

  public messages: CustomMessages = {
    'password.minLength': 'Minimum password length is 8 characters.',
    'type.enum': 'The options are "customer" and "provider".',
  };
}
