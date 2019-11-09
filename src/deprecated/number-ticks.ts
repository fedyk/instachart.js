const e10 = Math.sqrt(50);
const e5 = Math.sqrt(10);
const e2 = Math.sqrt(2);

export function numberTicks(start, stop, count) {
  let i = -1;
  let n;
  let ticks;
  let step;

  stop = +stop;
  start = +start;
  count = +count;

  if (start === stop && count > 0) {
    return [start];
  }

  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) {
    return [];
  }

  if (step > 0) {
    start = Math.ceil(start / step) - 1;
    stop = Math.floor(stop / step) + 1;
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n)
      ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  return ticks;
}

export function tickIncrement(start, stop, count) {
  let step = (stop - start) / Math.max(0, count)
  let power = Math.floor(Math.log(step) / Math.LN10);
  let error = step / Math.pow(10, power);

  return power >= 0
    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
    : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
