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
      setAttribute(text, "font-size", "10")

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

export function createButtonAxis() {
  let scale = createScale([0, 1], [0, 1]);

  function getTicks() {
    const diff = 1000 * 60 * 60 * 24;
    const tickWidth = 60;
    const [r0, r1] = scale.range() as [number, number];
    const ticksCount = Math.round((r1 - r0) / tickWidth)
    const [d0, d1] = (scale.domain() as number[]).map(v => v / diff);

    return ticks(d0, d1, ticksCount).map(v => v * diff);
  }

  function render(target: Element) {
    const ticks = getTicks()
    const allTicks = generalUpdatePattern<number>(target, ".tick", ticks)

    allTicks.enter((datum) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"))
      const circle = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "circle"))

      setAttribute(circle, "cx", "0")
      setAttribute(circle, "cy", "0")
      setAttribute(circle, "r", "1")
      setAttribute(circle, "fill", "#0f0")

      setAttribute(g, "class", "tick")
      setAttribute(text, "y", "12")
      setAttribute(text, "fill", "#96A2AA")
      setAttribute(text, "font-size", "10")
      setAttribute(text, "text-anchor", "middle")
      text.textContent = formatDate(datum);

      return g;
    }).merge((g, datum) => {
      setAttribute(g, "transform", `translate(${scale(datum)},0)`)
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