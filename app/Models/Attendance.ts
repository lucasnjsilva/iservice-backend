import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  beforeCreate,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm';
import Service from './Service';
import Customer from './Customer';
import { v4 as uuidv4 } from 'uuid';

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
