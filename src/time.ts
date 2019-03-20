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

export function formatDate(milliseconds: number) {
  const date = new Date(milliseconds);
  const month = date.getMonth();

  return MONTHS[month] + " " + date.getDate()
}

export function longDate(milliseconds) {
  const dateTime = new Date(milliseconds);
  const day = SHORT_DAYS[dateTime.getDay()];
  const month = MONTHS[dateTime.getMonth()];
  const date = dateTime.getDate()

  return `${day}, ${month} ${date}`  
}