import { schema, type CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    description: schema.string.optional(),
    category: schema.string.optional(),
    cost: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}
