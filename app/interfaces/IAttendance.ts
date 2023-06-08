import { type DateTime } from 'luxon';

export enum AttendanceStatus {
  'PENDING' = 'PENDING',
  'CANCELED_BY_CUSTOMER' = 'CANCELED BY CUSTOMER',
  'CANCELED_BY_PROVIDER' = 'CANCELED BY PROVIDER',
  'ATTENDED' = 'ATTENDED',
}

export interface ICreateAttendance {
  serviceId: string;
  attendanceDate: DateTime;
}

export interface IUpdateAttendance {
  attendanceDate?: DateTime;
  status?: string;
}

export interface IQueryFilters {
  customer?: string;
  phone?: string;
  service?: string;
  solicitationDate?: string;
  attendanceDate?: string;
  status?: string;
}
