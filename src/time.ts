const SHORT_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatYear(date: Date) {
  return date.getFullYear();
}

export function formatWeek(d: Date) {
  const month = formatMonth(d);
  const date = d.getDate();
  return `${month} ${date}`
}

export function formatMonth(d: Date) {
  return MONTHS[d.getMonth()];
}

export function formatDate(milliseconds: number) {
  const date = new Date(milliseconds);
  const month = date.getMonth();

  return MONTHS[month] + " " + date.getDate()
}

export function formatMillisecond(d: Date) {
  return `:${d.getMilliseconds()}`
}

export function formatSecond(d: Date) {
  return `:${d.getSeconds()}`
}

export function formatMinute(d: Date) {
  let hour = d.getHours();
  let minutes = d.getMinutes();

  return `${hour > 9 ? hour : "0" + hour}:${minutes > 10 ? minutes : "0" + minutes}`
}

export function formatHour(d: Date) {
  let hour = d.getHours();
  let ampm = (hour > 11) ? "pm" : "am";

  return `${hour} ${ampm}`
}

export function formatDay(d: Date) {
  return `${SHORT_DAYS[d.getDay()]} ${d.getDate()}`;
}

export function longDate(milliseconds) {
  const dateTime = new Date(milliseconds);
  const day = SHORT_DAYS[dateTime.getDay()];
  const month = MONTHS[dateTime.getMonth()];
  const date = dateTime.getDate()

  return `${day}, ${month} ${date}`  
}