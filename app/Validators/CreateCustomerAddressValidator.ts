import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateCustomerAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address: schema.string({}, [rules.required()]),
    number: schema.string.optional(),
    neighborhood: schema.string({}, [rules.required()]),
    complement: schema.string.optional(),
    reference: schema.string.optional(),
    city: schema.string({}, [rules.required()]),
    uf: schema.string({}, [rules.required()]),
    cep: schema.string({}, [rules.required()]),
  });

  public messages: CustomMessages = {
    required: 'The {{ field }} is required.',
  };
}
