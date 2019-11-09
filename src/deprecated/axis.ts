import { numberTicks } from "./number-ticks";
import { createScale } from "./scale";
import { setAttribute } from "./set-attribute";
import { generalUpdatePattern } from "./general-update-pattern";
import { removeElement } from "./remove-element";
import { createTransition } from "./transition";
import { createTimeTicks } from "./time-ticks";

export function createLeftAxis() {
  const enterTransition = createTransition().duration(200);
  const exitTransition = createTransition().duration(100);
  const scale = createScale([0, 1], [0, 1]);
  const y = createScale([0, 1], [0, 1])
  let initiallyRendered = false;
  let ticksCount: number = 6;
  let pathLength = 100;
  let ticks: number[] = []

  function render(target: Element) {
    const update = generalUpdatePattern<number>(target, ".tick", ticks, (datum) => datum + "")

    update.enter((datum) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const line = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "line"))
      const text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"))

      setAttribute(g, "class", "tick")

      if (initiallyRendered) {
        setAttribute(g, "fill-opacity", "0")
        enterTransition(g, "fill-opacity", "1")
      }
      else {
        setAttribute(g, "fill-opacity", "1")
      }

      setAttribute(line, "x2", pathLength + "")
      setAttribute(line, "class", "tick-line")
      setAttribute(line, "stroke", "#ECF0F3")
      setAttribute(line, "stroke-width", "1")
      setAttribute(text, "y", "-5")
      setAttribute(text, "class", "tick-text")
      setAttribute(text, "fill", "#96A2AA")
      setAttribute(text, "font-size", "9")

      text.textContent = format(datum);

      return g;
    }).merge((g, datum) => {
      if (datum) {
        g.childNodes[1].textContent = format(datum)
      }
      setAttribute(g, "transform", `translate(0,${y(datum)})`)
    })

    update.exit((g, datum) => {

      setAttribute(g, "transform", `translate(0,${y(datum)})`)

      const t = exitTransition(g, "fill-opacity", "0")

      if (t) {
        t.on("end", () => removeElement(g))
      }
    })

    generalUpdatePattern<number>(target, ".tick-line", ticks).update((line) => {
      setAttribute(line, "x2", pathLength + "")
    })

    initiallyRendered = true;
  }

  function getTicks() {
    const [d0, d1] = scale.domain() as number[];

    return numberTicks(d0, d1, ticksCount);
  }

  function format(d: number) {
    return d < 999 ? d + "" : d < 999999 ? (d / 1000).toFixed(1) + "k" : d < 999999999 ? (d / 1000000).toFixed(1) + "M" : "NaN";
  }

  render.domain = function(_: [number, number]) {
    return scale.domain(_), ticks = getTicks(), y.domain([ticks[0], ticks[ticks.length - 1]]), render
  }

  render.range = function(_: [number, number]) {
    return scale.range(_), y.range(_), render
  }

  render.y = function() {
    return y
  }

  render.pathLength = function(_) {
    return _ ? (pathLength = +_) : render
  }

  return render;
}


export function createButtonAxis() {
  const enterTransition = createTransition().duration(150);
  const exitTransition = createTransition().duration(100);
  const scale = createScale([0, 1], [0, 1]);
  const timeTicks = createTimeTicks(scale);
  let initiallyRendered = false;

  function render(target: Element) {
    const ticks = timeTicks.ticks(6) as Date[]
    const allTicks = generalUpdatePattern<Date>(target, ".tick", ticks, (datum) => datum + "")

    allTicks.enter((datum) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"))

      setAttribute(g, "class", "tick")
      
      if (initiallyRendered) {
        setAttribute(g, "fill-opacity", "0")
        enterTransition(g, "fill-opacity", "1")
      }
      else {
        setAttribute(g, "fill-opacity", "1")
      }

      setAttribute(text, "x", "0")
      setAttribute(text, "y", "27")
      setAttribute(text, "fill", "#96A2AA")
      setAttribute(text, "font-size", "9")
      setAttribute(text, "text-anchor", "middle")

      return g;
    }).merge((g, datum) => {
      setAttribute(g, "transform", `translate(${scale(datum.getTime())},0)`)

      if (g.firstChild) {
        g.firstChild.textContent = timeTicks.tickFormat(datum);
      }
    })

    allTicks.exit((g, datum) => {
      if (datum) {
        setAttribute(g, "transform", `translate(${scale(datum.getTime())},0)`)
      }

      removeElement(g)

      const t = exitTransition(g, "fill-opacity", "0")

      if (t) {
        t.on("end", () => removeElement(g))
        t.on("cancel", () => removeElement(g))
      }
    })

    initiallyRendered = true;
  }

  render.domain = function(_: [number, number]) {
    return scale.domain(_), render
  }

  render.range = function(_: [number, number]) {
    return scale.range(_), render
  }

  return render;
}
