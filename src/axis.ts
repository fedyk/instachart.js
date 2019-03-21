import { ticks } from "./ticks";
import { createScale } from "./scale";
import { setAttribute } from "./set-attribute";
import { generalUpdatePattern } from "./general-update-pattern";
import { formatDate } from "./time";
import { removeElement } from "./remove-element";

export function createLeftAxis() {
  let scale = createScale([0, 1], [0, 1]);
  let ticksCount: number = 6;
  let pathLength = 100;

  function getTicks() {
    const [d0, d1] = scale.domain() as number[];

    return [0].concat(ticks(d0, d1, ticksCount));
  }

  function render(target: Element) {
    const ticks = getTicks();
    const update = generalUpdatePattern<number>(target, ".tick", ticks)

    update.enter((datum) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const line = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "line"))
      const text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"))

      setAttribute(g, "class", "tick")
      setAttribute(line, "class", "tick-line")
      setAttribute(line, "stroke", "#ECF0F3")
      setAttribute(line, "stroke-width", "1")
      setAttribute(text, "y", "-5")
      setAttribute(text, "class", "tick-text")
      setAttribute(text, "fill", "#96A2AA")
      setAttribute(text, "font-size", "9")

      text.textContent = datum + "";

      return g;
    }).merge((g, datum) => {
      g.childNodes[1].textContent = datum + ""
      setAttribute(g, "transform", `translate(0,${scale(datum)})`)
    })

    update.exit(el => removeElement(el))

    generalUpdatePattern<number>(target, ".tick-line", ticks).update((line) => {
      // setAttribute(line, "pathLength", pathLength + "")
      setAttribute(line, "x2", pathLength + "")
    })
  }

  render.domain = function(_: [number, number]) {
    return scale.domain(_), render
  }

  render.range = function(_: [number, number]) {
    return scale.range(_), render
  }

  render.pathLength = function(_) {
    return _ ? (pathLength = +_) : render
  }

  return render;
}

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute
const day = 24 * hour

export function createButtonAxis() {
  let scale = createScale([0, 1], [0, 1]);

  function getTicks() {
    const [d0, d1] = scale.domain() as [number, number];
    const [r0, r1] = scale.range() as [number, number];
    const tickWidth = 60;
    const ticksCount = Math.floor((r1 - r0) / tickWidth);
    let step = (d1 - d0) / Math.max(0, ticksCount);
    let i = -1;
    let start;
    let stop;
    let ticks;
    let n;
    
    if ((step = Math.floor(step / day) * day) === 0 || !isFinite(step)) {
      step = day
    }

    start = Math.ceil(d0 / step);
    stop = Math.floor(d1 / step);
    n = Math.ceil(stop - start + 1)
    ticks = new Array(n);

    while (++i < n)
      ticks[i] = (start + i) * step;

    return ticks;
  }

  function render(target: Element) {
    const ticks = getTicks()
    const allTicks = generalUpdatePattern<number>(target, ".tick", ticks)

    allTicks.enter((datum) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"))

      setAttribute(g, "class", "tick")
      setAttribute(text, "x", "0")
      setAttribute(text, "y", "27")
      setAttribute(text, "fill", "#96A2AA")
      setAttribute(text, "font-size", "9")
      setAttribute(text, "text-anchor", "middle")

      return g;
    }).merge((g, datum) => {
      setAttribute(g, "transform", `translate(${scale(datum)},0)`)

      if (g.firstChild) {
        g.firstChild.textContent = formatDate(datum);
      }
    })

    allTicks.exit(el => removeElement(el))
  }

  render.domain = function(_: [number, number]) {
    return scale.domain(_), render
  }

  render.range = function(_: [number, number]) {
    return scale.range(_), render
  }

  return render;
}