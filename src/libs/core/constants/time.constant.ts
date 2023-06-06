import { TimeFormat, WorkingDays } from '@core/enum';

export enum TimeUnit {
  YEAR = 'YEAR',
  MONTH = 'MONTH',
  DAY = 'DAY',
  HOUR = 'HOUR',
  MINUTE = 'MINUTE',
  SECOND = 'SECOND',
}

export const DEFAULT_TIME_ZONE = 'Asia/Bangkok';
export const TIMEZONE_SPLIT = ' - ';
export const TIME_SPLIT = ':';
export const START_DAY = WorkingDays.MON;
export const HOURS_IN_CIRCLE = 12;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const SETTING_FORMAT_DATE = 'dd/MM/yyyy';
export const DEFAULT_FORMAT_DATE = 'yyyy/MM/dd';
export const DEFAULT_FORMAT_TIME = TimeFormat['HH:mm:ss'];
export const HOUR_MINUTE_FORMAT_TIME = TimeFormat['HH:mm'];

export const DEFAULT_VALUE_TIME = '00:00';
export const FORMAT_HOLIDAY_DATE = 'MMM dd,yyyy (EEE)';
