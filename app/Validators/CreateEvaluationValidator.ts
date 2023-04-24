import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateEvaluationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    comment: schema.string.optional(),
    vote: schema.number([rules.required()]),
    attendanceId: schema.string({}, [rules.required()]),
  });

  public messages: CustomMessages = {
    required: 'The {{ field }} is required.',
  };
}
