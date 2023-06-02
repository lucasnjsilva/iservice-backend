import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateProviderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
    name: schema.string({}, [rules.required()]),
    aboutMe: schema.string.optional(),
    phone: schema.string({}, [rules.required()]),
    cnpj: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'providers', column: 'cnpj' }),
    ]),
    profileImage: schema.file.optional({ size: '2mb', extnames: ['jpg', 'jpeg', 'png'] }),
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
    unique: 'The {{ field }} already is registered.',
  };
}
