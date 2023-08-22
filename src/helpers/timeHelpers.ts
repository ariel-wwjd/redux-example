import { DateTime } from 'luxon';

const getTimesFromSecs = (
  secsInput: number,
): {
  days: number;
  hours: number;
  minutes: number;
} => {
  const days = Math.floor(secsInput / 86400); //  get days from seconds
  const hours = Math.floor((secsInput - days * 86400) / 3600); // get hours from seconds
  const minutes = Math.floor((secsInput - days * 86400 - hours * 3600) / 60); // get minutes from seconds
  return {
    days,
    hours,
    minutes,
  };
};

// Returns date with format: Today - 12:20 PM  /  April 25 - 12:20 PM
const getDate = (date: string, isMillis = false): string => {
  if (!date) {
    return '--';
  }
  const now = DateTime.now();
  const paramDate = isMillis
    ? DateTime.fromMillis(parseInt(`${date}000`))
    : DateTime.fromISO(date);
  if (now.hasSame(paramDate, 'day')) {
    return `Today - ${paramDate.toFormat('hh:mm a')}`;
  } else if (now.hasSame(paramDate, 'year')) {
    return paramDate.toFormat('LLLL d - hh:mm a');
  }

  return paramDate.toFormat('yyyy LLLL d - hh:mm a');
};

const getPlainDate = (date: string, isMillis = false): string => {
  if (!date) {
    return '--';
  }
  const paramDate = isMillis
    ? DateTime.fromMillis(parseInt(`${date}000`))
    : DateTime.fromISO(date);
  return paramDate.toFormat('dd/MM/yyyy');
};

const timeHelpers = {
  getTimesFromSecs,
  getDate,
  getPlainDate,
};

export default timeHelpers;
