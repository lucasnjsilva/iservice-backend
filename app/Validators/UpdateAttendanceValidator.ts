import { schema, type CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateAttendanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    attendanceDate: schema.date.optional(),
  });

  public messages: CustomMessages = {};
}
