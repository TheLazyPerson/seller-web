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

export const formatUnixTimeStampToDateTime = (
  timeStamp,
  formatter = timeFormats.dateAndTime
) => {
  return initMoment(timeStamp).format(formatter);
};

export const subtractFromDate = (date, number, type) => {
  switch (type) {
    case "days":
      return date.setDate(date.getDate() - number) && date;
    case "weeks":
      return date.setDate(date.getDate() - 7 * number) && date;
    case "months":
      return date.setMonth(date.getMonth() - number) && date;
    case "years":
      return date.setFullYear(date.getFullYear() - number) && date;
  }
};

export const calculateDateDiff = (date) => {
  var cardDate = initMoment(date);
  var currentDate = moment();
  return currentDate.diff(cardDate, "days");
};

export const calculateDateDiffFrom = (date) => {
  var cardDate = initMoment(date);
  var currentDate = moment();
  return cardDate.diff(currentDate, "days");
};

/* 
1-04-Dec-18 - 05:04:18 PM
*/
export const timeFormats = {
  dayMonthComaYear: "DD MMM, YYYY",
  utcTimeStamp: "YYYY-MM-DD HH:mm:ss [UTC]",
  dateAndTime: "DD/MM/YYYY HH:mm",
  date: "dd/MM/yyyy",
  dateAdvanced: "DD/MM/YYYY",
  //add the rest of the date format for the project and use formatTimestamp with this
};
