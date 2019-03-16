export function createScale(domain: [number, number], range: [number, number]) {
  let [d0, d1] = domain;
  let [r0, r1] = range;

  function scale(x) {
    const percent = (x - d0) / (d1 - d0);

    return percent * (r1 - r0) + r0;
  }

  scale.invert = function(x) {
    const percent = (x - r0) / (r1 - r0);

    return percent * (d1 - d0) + d0;
  }

  scale.domain = function(_?) {
    return _ ? ([d0, d1] = _, scale) : [d0, d1];
  }

  scale.range = function(_?) {
    return _ ? ([r0, r1] = _, scale) : [r0, r1];
  }

  return scale;
}
