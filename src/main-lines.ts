import { createLine } from "./line";
import { createScale } from "./scale";
import { Chart, Line } from "./types";
import { generalUpdatePattern } from "./general-update-pattern";
import { setAttribute } from "./set-attribute";
import { createTransition } from "./transition";
import { pathEasySetter } from "./path-easy-setter";

export function createMainLines() {
  const x = createScale([0, 1], [0, 1])
  const y = createScale([0, 1], [0, 1])
  const strokeOpacityTransition = createTransition().duration(100)
  const dTransition = createTransition().duration(150).easySetter(pathEasySetter)
  let lines = [].map(createLine);
  let data: Chart;

  function render(target: SVGGElement, transition = false) {
    const update = generalUpdatePattern<Line>(target, ".line", data.lines, d => d.id);

    update.enter((datum, i) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      setAttribute(path, "fill", "none")
      setAttribute(path, "class", "line")
      setAttribute(path, "stroke-width", "2")
      setAttribute(path, "stroke", data.lines[i].color)

      return path;
    }).merge((path, datum, i) => {
      if (transition) {
        strokeOpacityTransition(path, "stroke-opacity", datum.visible ? "1" : "0")
        dTransition(path, "d", lines[i](datum.data))
      }
      else {
        setAttribute(path, "stroke-opacity", datum.visible ? "1" : "0")
        setAttribute(path, "d", lines[i](datum.data))
      }
    })
  }

  render.data = function (_: Chart) {
    return data = _, lines = data.lines.map(() => createLine().x((d, i) => x(data.x[i])).y(d => y(d)))
  }

  render.xRange = function (_: [number, number]) {
    return x.range(_), render
  }

  render.yRange = function (_: [number, number]) {
    return y.range(_), render
  }

  render.yDomain = function (_: [number, number]) {
    return y.domain(_), render
  }

  render.xDomain = function (_: [number, number]) {
    return x.domain(_), render
  }

  return render
}
