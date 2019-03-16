import { ticks } from "./ticks";
import { createScale } from "./scale";
import { setAttribute } from "./set-attribute";
import { generalUpdatePattern } from "./general-update-pattern";
import { formatDate } from "./time";

export function createLeftAxis() {
  let scale = createScale([0, 1], [0, 1]);
  let ticksCount: number = 6;
  let pathLength = 100;

  function getTicks() {
    const [d0, d1] = scale.domain() as number[];

    return ticks(d0, d1, ticksCount);
  }

  function render(target: Element) {
    const ticks = getTicks();
    const allTicks = generalUpdatePattern<number>(target, ".tick", ticks)

    allTicks.enter((datum) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const line = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "line"))
      const text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"))

      setAttribute(g, "class", "tick")
      setAttribute(line, "class", "tick-line")
      setAttribute(line, "stroke", "#ECF0F3")
      setAttribute(line, "stroke-width", "1")
      setAttribute(text, "class", "tick-text")
      setAttribute(text, "fill", "#96A2AA")
      setAttribute(text, "font-size", "8")

      text.textContent = datum + "";

      return g;
    }).merge((element, datum) => {
      setAttribute(element, "transform", `translate(0,${scale(datum)})`)
    })

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

export function createButtonAxis() {
  let scale = createScale([0, 1], [0, 1]);
  let ticksCount: number = 6;

  function getTicks() {
    const [d0, d1] = scale.domain() as number[];

    return ticks(d0, d1, ticksCount);
  }

  function render(target: Element) {
    const ticks = getTicks()
    const allTicks = generalUpdatePattern<number>(target, ".tick", ticks)

    allTicks.enter((datum) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"))

      setAttribute(g, "class", "tick")
      setAttribute(text, "fill", "#96A2AA")
      setAttribute(text, "font-size", "8")
      text.textContent = formatDate(datum);

      return g;
    }).merge((element, datum) => {
      setAttribute(element, "transform", `translate(${scale(datum)},0)`)
    })
  }

  render.domain = scale.domain

  render.range = scale.range

  return render;
}