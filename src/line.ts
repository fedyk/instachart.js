import { createPath } from "./path";

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

    return path()
  }

  line.x = function(_: (datum: T, index: number) => number) {
    return x = _, line;
  }

  line.y = function(_: (datum: T, index: number) => number) {
    return y = _, line;
  }

  return line;
}
