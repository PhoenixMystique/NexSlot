const moment = require('moment-timezone');

exports.convertTimezone = (date, fromTimezone, toTimezone) => {
  try {
    if (!moment.tz.zone(fromTimezone) || !moment.tz.zone(toTimezone)) {
      throw new Error('Invalid timezone');
    }
    return moment.tz(date, fromTimezone).tz(toTimezone).format();
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

exports.formatDateToUTC = (date) => {
  try {
    return moment.tz(date, 'UTC').toDate();
  } catch (error) {
    return `Error: ${error.message}`;
  }
};