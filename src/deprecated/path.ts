export function createPath() {
  let x0: number
  let y0: number
  let x1: number
  let y1: number
  let d = ""

  function path() {
    return d;
  }

  path.moveTo = function(x, y) {
    return d += "M" + (x0 = x1 = +x) + "," + (y0 = y1 = +y), path
  }

  path.lineTo = function(x, y) {
    return d += "L" + (x1 = +x) + "," + (y1 = +y), path
  }

  path.closePath = function() {
    if (x1 !== null) {
      x1 = x0
      y1 = y0
      d += "Z"
    }

    return path
  }

  return path;
}
