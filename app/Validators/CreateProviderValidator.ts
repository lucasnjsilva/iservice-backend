import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateProviderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
    name: schema.string({}, [rules.required()]),
    phone: schema.string({}, [rules.required()]),
    cnpj: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'providers', column: 'cnpj' }),
    ]),
  });

  public messages: CustomMessages = {
    required: 'The {{ field }} is required.',
    unique: 'The {{ field }} already is registered.',
  };
}
