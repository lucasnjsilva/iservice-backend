import { schema, type CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateEvaluationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    comment: schema.string.optional(),
  });

  public messages: CustomMessages = {};
}
