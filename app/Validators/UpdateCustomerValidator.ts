import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [rules.nullable(), rules.minLength(8)]),
    name: schema.string({}, [rules.nullable()]),
    phone: schema.string({}, [rules.nullable()]),
  });

  public messages: CustomMessages = {};
}
