import { createPath } from "./path";

export function pathEasySetter(path0: SVGPathElement, d0, d1) {
  const pd0 = d0.slice(1).split("L").map(v => v.split(",").map(parseFloat))
  const pd1 = d1.slice(1).split("L").map(v => v.split(",").map(parseFloat))
  const pd0Len = pd0.length;

  return function (t): string {
    if (t >= 1) {
      return d1
    }

    const path = createPath();

    for (let i = 0; i < pd0Len; i++) {
      let p = interpolate(pd0[i][0], pd0[i][1], pd1[i][0], pd1[i][1], t);

      if (i === 0) {
        path.moveTo(p[0], p[1])
      }
      else {
        path.lineTo(p[0], p[1])
      }
    }

    return path()
  };
}

function interpolate(x0, y0, x1, y1, t: number): [number, number] {
  return [t * (x1 - x0) + x0, t * (y1 - y0) + y0]
}
