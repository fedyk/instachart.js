export function createScale(domain: [number, number], range: [number, number]) {
  let [d0, d1] = domain;
  let [r0, r1] = range;

  function scale(x: number) {
    const percent = (x - d0) / (d1 - d0);

    return percent * (r1 - r0) + r0;
  }

  scale.invert = function(x: number) {
    const percent = (x - r0) / (r1 - r0);

    return percent * (d1 - d0) + d0;
  }

  scale.domain = function(_: [number, number]) {
    return [d0, d1] = _, scale;
  }

  scale.range = function(_: [number, number]) {
    return [r0, r1] = _, scale;
  }

  return scale;
}
