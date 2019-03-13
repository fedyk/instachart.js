import { createPath } from "./path";

/**
 * var line = createLine()
 *   .x(d => d.x)
 *   .y(d => d.y)
 * 
 * <path d="line()"></path> // output <path d="M0,43.6.333..."></path>
 */
export function createLine<T>() {
  let x: (d: T, i: number) => number;
  let y: (d: T, i: number) => number;

  function line(data: T[]) {
    const dataLength = data.length;
    const path = createPath()

    for (let i = 0; i < dataLength; i++) {
      const datum = data[i]

      if (i === 0) {
        path.moveTo(x(datum, i), y(datum, i));
      }
      else {
        path.lineTo(x(datum, i), y(datum, i));
      }
    }

    return path.closePath()()
  }

  line.x = function(_: (d: T) => number) {
    return x = _, line;
  }

  line.y = function(_: (d: T) => number) {
    return y = _, line;
  }

  return line;
}
