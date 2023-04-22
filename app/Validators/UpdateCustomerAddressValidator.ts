import { schema, type CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateCustomerAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address: schema.string.optional(),
    number: schema.string.optional(),
    neighborhood: schema.string.optional(),
    complement: schema.string.optional(),
    reference: schema.string.optional(),
    city: schema.string.optional(),
    uf: schema.string.optional(),
    cep: schema.string.optional(),
  });

  public messages: CustomMessages = {};
}
