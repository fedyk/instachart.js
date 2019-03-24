import { createLine } from "./line";
import { createScale } from "./scale";
import { Chart, Line } from "./types";
import { generalUpdatePattern } from "./general-update-pattern";
import { setAttribute } from "./set-attribute";
import { createTransition } from "./transition";
import { createPath } from "./path";
import { assign } from "./assign";

export function createMainLines() {
  const x = createScale([0, 1], [0, 1])
  const y = createScale([0, 1], [0, 1])
  // const strokeOpacityTransition = createTransition().duration(100)
  // const dTransition = createTransition().duration(150).easySetter(easySetter)
  let lines = [].map(createLine);
  let data: Chart;

  function render(target: SVGGElement) {
    const update = generalUpdatePattern<Line>(target, ".line", data.lines, d => d.id);

    update.enter((datum, i) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      setAttribute(path, "fill", "none")
      setAttribute(path, "class", "line")
      setAttribute(path, "stroke-width", "2")
      setAttribute(path, "stroke", data.lines[i].color)

      return path;
    }).merge((path, datum, i) => {
      // if (transition) {
      //   strokeOpacityTransition(path, "stroke-opacity", datum.visible ? "1" : "0")
      //   dTransition(path, "d", lines[i](datum.data))
      // }
      // else {
      setAttribute(path, "stroke-opacity", datum.visible ? "1" : "0")
      setAttribute(path, "d", lines[i](datum.data))
      // }
    })
  }

  // function getSelectedLines() {
  //   const [x0, x1] = x.domain() as [number, number];
  //   const len = data.x.length;
  //   let i0: number = 0;
  //   let i1: number = len - 1;

  //   for (let i = 0; i < len; i++) {
  //     if (data.x[i] > x0) {
  //       break
  //     }
 
  //     i0 = i;
  //   }
    
  //   for(let i = len - 1; i >= 0; i--) {
  //     if (data.x[i] < x1) {
  //       break
  //     }

  //     i1 = i
  //   }

  //   return data.lines.map(function(line) {
  //     return assign({}, line, {
  //       data: line.data.spl
  //     })
  //   })



  // }


  // function easySetter(path0: SVGPathElement, d0, d1) {
  //   const path1 = path0.cloneNode() as SVGPathElement;
  //   const n0 = path1.getTotalLength()
  //   const n1 = (setAttribute(path1, "d", d1) as SVGPathElement).getTotalLength()

  //   // Uniform sampling of distance based on specified precision.
  //   const precision = 20;
  //   const distances = [0]
  //   const dt = precision / Math.max(n0, n1);
  //   let i = 0;

  //   while ((i += dt) < 1)
  //     distances.push(i);

  //   distances.push(1);

  //   // Compute point-interpolators at each distance.
  //   const points = distances.map(function(t) {
  //     const p0 = path0.getPointAtLength(t * n0);
  //     const p1 = path1.getPointAtLength(t * n1);

  //     return interpolate([p0.x, p0.y], [p1.x, p1.y]);
  //   });

  //   return function(t): string {
  //     if (t >= 1) {
  //       return d1
  //     }

  //     const path = createPath();
  //     let [x, y] = points[0](t);

  //     path.moveTo(x, y)

  //     for (let i = 1; i < points.length; i++) {
  //       [x, y] = points[i](t);
        
  //       path.lineTo(x, y)
  //     }

  //     return path()
  //   };
  // }

  // function interpolate([x0, y0], [x1, y1]): (t: number) => [number, number] {
  //   return function(t) {
  //     return [t * (x1 - x0) + x0, t * (y1 - y0) + y0]
  //   }
  // }

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
