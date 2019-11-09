export function isArray(arg: any): boolean {
  return Object.prototype.toString.call(arg) === '[object Array]';
}
