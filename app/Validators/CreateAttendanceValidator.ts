import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateAttendanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    serviceId: schema.string({}, [rules.required()]),
    attendanceDate: schema.date({}, [rules.required()]),
    addressId: schema.string({}, [rules.required()]),
  });

  public messages: CustomMessages = {
    required: 'The {{ field }} is required.',
  };
}
