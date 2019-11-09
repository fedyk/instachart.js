export function filter<T>(arr: T[], func: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
export function filter<T>(arr: T[], func: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[] {
  var len = arr.length >>> 0,
    res = new Array(len), // preallocate array
    t = arr, c = 0, i = -1;
  if (thisArg === undefined) {
    while (++i !== len) {
      // checks to see if the key was set
      if (i in arr) {
        if (func(t[i], i, t)) {
          res[c++] = t[i];
        }
      }
    }
  }
  else {
    while (++i !== len) {
      // checks to see if the key was set
      if (i in arr) {
        if (func.call(thisArg, t[i], i, t)) {
          res[c++] = t[i];
        }
      }
    }
  }

  res.length = c; // shrink down array to proper size
  return res;
};
