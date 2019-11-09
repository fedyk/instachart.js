export function createScale(domain: [number, number], range: [number, number]) {
  function scale(x) {
    const percent = (x - domain[0]) / (domain[1] - domain[0]);

    return percent * (range[1] - range[0]) + range[0];
  }

  scale.invert = function(x) {
    const percent = (x - range[0]) / (range[1] - range[0]);

    return percent * (domain[1] - domain[0]) + domain[0];
  }

  scale.domain = function(newDomain?: [number, number]): [number, number] {
    return newDomain && (domain = newDomain) || domain;
  }

  scale.range = function(newRange?: [number, number]): [number, number] {
    return newRange && (range = newRange) || range
  }

  return scale;
}
