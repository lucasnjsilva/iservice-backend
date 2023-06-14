import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  HasMany,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import Service from './Service';
import Customer from './Customer';
import { v4 as uuidv4 } from 'uuid';
import Evaluation from './Evaluation';
import CustomerAddress from './CustomerAddress';

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public serviceId: string;

  @belongsTo(() => Service)
  public service: BelongsTo<typeof Service>;

  @column()
  public customerId: string;

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>;

  @column.date()
  public solicitationDate: DateTime;

  @column.date()
  public attendanceDate: DateTime;

  @column()
  public status: string;

  @hasMany(() => Evaluation, { foreignKey: 'attendanceId' })
  public evaluations: HasMany<typeof Evaluation>;

  @column()
  public addressId: string;

  @belongsTo(() => CustomerAddress, { foreignKey: 'addressId' })
  public address: BelongsTo<typeof CustomerAddress>;

  @column.dateTime({ serializeAs: null, autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(attendance: Attendance) {
    attendance.id = uuidv4();
  }
}
