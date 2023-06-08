import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  hasMany,
  HasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidv4 } from 'uuid';
import ForgotPassword from './ForgotPassword';
import CustomerAddress from './CustomerAddress';

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public phone: string;

  @hasOne(() => CustomerAddress, { foreignKey: 'customerId' })
  public address: HasOne<typeof CustomerAddress>;

  @column({ serializeAs: null })
  public rememberMeToken: string | null;

  @column.dateTime({ serializeAs: null, autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(customer: Customer) {
    customer.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(customer: Customer) {
    if (customer.$dirty.password) {
      customer.password = await Hash.make(customer.password);
    }
  }

  @beforeSave()
  public static async cleanData(customer: Customer) {
    if (customer.phone) {
      customer.phone = customer.phone.trim().replace(/[^0-9 ]|\s/g, '');
    }

    if (customer.cpf) {
      customer.cpf = customer.cpf.trim().replace(/[^0-9 ]/g, '');
    }
  }

  @hasMany(() => ForgotPassword)
  public customerForgotPassword: HasMany<typeof ForgotPassword>;

  @hasMany(() => ForgotPassword, {
    onQuery: async (query) => await query.where('status', 'EMAIL_SENT'),
  })
  public passwordResetTokens: HasMany<typeof ForgotPassword>;
}
