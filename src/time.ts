const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(milliseconds: number) {
  const date = new Date(milliseconds);
  const month = date.getMonth();

  return MONTHS[month] + " " + date.getDate()
}