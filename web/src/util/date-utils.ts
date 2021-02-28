/**
 * Returns a date as a string in the YYYY-MM-DD format
 * @param date the date to be converted
 * @returns a string representing the date
 */
function dateToString(date: Date | null): string {
  // checking if the date is valid
  if (!date) {
    return '';
  }

  // getting the year as a string
  const year = date.getFullYear().toString();

  // getting the month as a string
  const rawMonth = (date.getMonth() + 1).toString();
  const month = rawMonth.length == 1 ? `0${rawMonth}` : rawMonth;

  // getting the day as a string
  const rawDay = date.getDate().toString();
  const day = rawDay.length == 1 ? `0${rawDay}` : rawDay;

  // returning formatted date
  return `${year}-${month}-${day}`;
}

/**
 * Returns a string in the YYYY-MM-DD format as a Date object
 * @param date the string to be converted
 * @returns a date representing the string
 */
function stringToDate(date: string): Date | null {
  const dateMask = /(\d{4})-(\d{2})-(\d{2})/;
  const result = dateMask.exec(date);

  if (result) {
    const year: number = parseInt(result[1], 10);
    const month: number = parseInt(result[2], 10);
    const date: number = parseInt(result[3], 10);

    return new Date(year, month - 1, date);
  } else {
    return null;
  }
}

/**
 * Returns a date as a string in the HH:MM format
 * @param date the date to be converted
 * @returns a string representing the time
 */
function timeToString(date: Date | null): string {
  // checking if the date is valid
  if (!date) {
    return '';
  }

  // getting the hour as a string
  const rawHour = date.getHours().toString();
  const hour = rawHour.length == 1 ? `0${rawHour}` : rawHour;

  // getting the hour as a string
  const rawMinute = date.getMinutes().toString();
  const minute = rawMinute.length == 1 ? `0${rawMinute}` : rawMinute;

  // returning formatted date
  return `${hour}:${minute}`;
}

export { dateToString, stringToDate, timeToString };
