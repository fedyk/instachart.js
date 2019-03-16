const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(miliseconds: number) {
  const date = new Date(miliseconds);
  const month = date.getMonth();

  return MONTHS[month] + " " + date.getDate()
}