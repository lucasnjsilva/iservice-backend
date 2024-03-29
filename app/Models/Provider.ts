import { DateTime } from 'luxon';
import {
  BaseModel,
  HasMany,
  beforeCreate,
  beforeSave,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import { v4 as uuidv4 } from 'uuid';
import ForgotPassword from './ForgotPassword';
import Service from './Service';

export default class Provider extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

  @column()
  public aboutMe: string;

  @column()
  public cnpj: string;

  @column()
  public phone: string;

  @column()
  public profileImage: string;

  @column()
  public address: string;

  @column()
  public number: string;

  @column()
  public neighborhood: string;

  @column()
  public complement: string;

  @column()
  public reference: string;

  @column()
  public city: string;

  @column()
  public uf: string;

  @column()
  public cep: string;

  @column({ serializeAs: null })
  public rememberMeToken: string | null;

  @hasMany(() => Service, { foreignKey: 'providerId' })
  public services: HasMany<typeof Service>;

  @column.dateTime({ serializeAs: null, autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(provider: Provider) {
    provider.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(provider: Provider) {
    if (provider.$dirty.password) {
      provider.password = await Hash.make(provider.password);
    }
  }

  @beforeSave()
  public static async cleanData(provider: Provider) {
    if (provider.phone) {
      provider.phone = provider.phone.trim().replace(/[^0-9 ]|\s/g, '');
    }

    if (provider.cnpj) {
      provider.cnpj = provider.cnpj.trim().replace(/[^0-9 ]/g, '');
    }
  }

  @hasMany(() => ForgotPassword)
  public providerForgotPassword: HasMany<typeof ForgotPassword>;

  @hasMany(() => ForgotPassword, {
    onQuery: async (query) => await query.where('status', 'EMAIL_SENT'),
  })
  public passwordResetTokens: HasMany<typeof ForgotPassword>;
}
