import moment from "moment";

export const initMoment = (timeStamp, formatter = timeFormats.utcTimeStamp) => {
  return moment.utc(timeStamp, formatter).local();
};

export const momentToDate = (timeStamp, formatter = timeFormats.date) => {
  return moment(timeStamp, formatter).local();
};
export const formatTimeStamp = (
  timeStamp,
  formatter = timeFormats.dashedDate
) => {
  return initMoment(timeStamp).format(formatter);
};
export const formatToDate = (timeStamp, formatter = timeFormats.date) => {
  return initMoment(timeStamp).format(formatter);
};

/* 
1-04-Dec-18 - 05:04:18 PM
*/
export const timeFormats = {
  dayMonthComaYear: "DD MMM, YYYY",
  utcTimeStamp: "YYYY-MM-DD HH:mm:ss [UTC]",
  date: "dd/MM/yyyy",
  //add the rest of the date format for the project and use formatTimestamp with this
};
