const moment = require('moment-timezone');

exports.convertTimezone = (date, fromTimezone, toTimezone) => {
  return moment.tz(date, fromTimezone).tz(toTimezone).format(); 
};
exports.formatDateToUTC = (date) => {
    console.log(date);
  return moment.tz(date, 'UTC').toDate();  
};

