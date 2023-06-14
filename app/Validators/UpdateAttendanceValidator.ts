import { schema, type CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateAttendanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    attendanceDate: schema.date.optional(),
    addressId: schema.string.optional(),
    status: schema.enum.optional([
      'CANCELED_BY_CUSTOMER',
      'CANCELED_BY_PROVIDER',
      'ATTENDED',
    ]),
  });

  public messages: CustomMessages = {
    enum: "Options: 'CANCELED_BY_CUSTOMER', 'CANCELED_BY_PROVIDER' and 'ATTENDED'.",
  };
}
