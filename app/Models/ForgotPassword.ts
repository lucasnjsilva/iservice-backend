import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  beforeCreate,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidv4 } from 'uuid';
import Customer from './Customer';
import Provider from './Provider';
import { string } from '@ioc:Adonis/Core/Helpers';
import { IUserRoles } from 'App/interfaces/IUserRoles';
import { type ForgotPasswordStatus } from 'App/interfaces/IForgotPassword';

export default class ForgotPassword extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public customerId: string | null;

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>;

  @column()
  public providerId: string | null;

  @belongsTo(() => Provider)
  public provider: BelongsTo<typeof Provider>;

  @column()
  public status: string;

  @column()
  public token: string;

  @column.dateTime()
  public expiresAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @beforeCreate()
  public static async createUUID(model: ForgotPassword) {
    model.id = uuidv4();
  }

  public static async generateToken(model: Customer | Provider) {
    const token = string.generateRandom(64);

    if (model instanceof Customer) {
      const result = await model.related('customerForgotPassword').create({
        status: 'EMAIL_SENT',
        expiresAt: DateTime.now().plus({ hour: 1 }),
        token,
      });

      return result.token;
    }

    if (model instanceof Provider) {
      const result = await model.related('providerForgotPassword').create({
        status: 'EMAIL_SENT',
        expiresAt: DateTime.now().plus({ hour: 1 }),
        token,
      });

      return result.token;
    }

    return token;
  }

  public static async changeStatus(token: string, status: ForgotPasswordStatus) {
    await ForgotPassword.query().where('token', token).update({ status });
  }

  public static async verify(token: string, modelType: IUserRoles) {
    const modelId = modelType === IUserRoles.customer ? 'customerId' : 'providerId';

    const result = await ForgotPassword.query()
      .whereNotNull(modelId)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .where('token', token)
      .first();

    return !!result;
  }

  public static async getPasswordReset(token: string, modelType: IUserRoles) {
    if (modelType === IUserRoles.customer) {
      const result = await ForgotPassword.query()
        .preload('customer')
        .where('token', token)
        .where('expiresAt', '>', DateTime.now().toSQL())
        .orderBy('createdAt', 'desc')
        .first();

      return result?.customer;
    }

    if (modelType === IUserRoles.provider) {
      const result = await ForgotPassword.query()
        .preload('provider')
        .where('token', token)
        .where('expiresAt', '>', DateTime.now().toSQL())
        .orderBy('createdAt', 'desc')
        .first();

      return result?.provider;
    }
  }
}
