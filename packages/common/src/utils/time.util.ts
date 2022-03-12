import { DateTime } from 'luxon';

export const getExpiredDate = (seconds: number) => {
  return DateTime.local()
    .plus(seconds * 1000)
    .toJSDate();
};

export const getExpiredUnixDate = (seconds: number) => {
  return DateTime.local()
    .plus(seconds * 1000)
    .toMillis();
};

export const isExpired = (date: Date) => {
  return DateTime.fromJSDate(date) <= DateTime.local();
};
