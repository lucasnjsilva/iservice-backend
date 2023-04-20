import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
    name: schema.string({}, [rules.required()]),
    phone: schema.string({}, [rules.required()]),
    cpf: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'customers', column: 'cpf' }),
    ]),
  });

  public messages: CustomMessages = {
    required: 'The {{ field }} is required.',
    unique: 'The {{ field }} already is registered.',
  };
}
