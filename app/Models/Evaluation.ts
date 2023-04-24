import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  beforeCreate,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm';
import Attendance from './Attendance';
import { v4 as uuidv4 } from 'uuid';

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public comment: string;

  @column()
  public vote: number;

  @column()
  public attendanceId: string;

  @belongsTo(() => Attendance)
  public attendance: BelongsTo<typeof Attendance>;

  @column.dateTime({ serializeAs: null, autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(evaluation: Evaluation) {
    evaluation.id = uuidv4();
  }
}
