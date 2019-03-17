import { Chart, Line } from "./types";
import { createScale } from "./scale";
import { createDrag } from "./drag";
import { createLine } from "./line";
import { generalUpdatePattern } from "./general-update-pattern";
import { setAttribute } from "./set-attribute";

const CONTROL_WIDTH = 4;
const HANDLER_WIDTH = 6;

export function createOverview() {
  let height = 38;
  let data: Chart
  let lines = [].map(() => createLine())
  let x = createScale([0, 1], [0, 1])
  let y = createScale([0, 1], [height, 0])
  let selectedDomain: [number, number] = [0, 1]

  const drag = createDrag();

  function renderLines(target) {
    const allLines = generalUpdatePattern<Line>(target, ".line", data.lines);

    allLines.enter(() => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      setAttribute(path, "fill", "none")
      setAttribute(path, "class", "line")
      setAttribute(path, "stroke-width", "1")
      return path
    }).merge((path, datum, index) => {
      setAttribute(path, "d", lines[index](datum.data))
      setAttribute(path, "stroke", data.lines[index].color)
    })

    // remove not needed lines
    allLines.exit(line => line.parentElement !== null && line.parentElement.removeChild(line))
  }

  function renderSelectionEdges(target) {
    const update = generalUpdatePattern<number>(target, ".overview-control", selectedDomain)

    update.enter((d) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")

      setAttribute(rect, "width", CONTROL_WIDTH + "")
      setAttribute(rect, "height", height + "")
      setAttribute(rect, "class", "overview-control")
      setAttribute(rect, "fill", "#C6DCEB")
      setAttribute(rect, "fill-opacity", "0.6")
      setAttribute(rect, "y", 0 + "")

      return rect
    }).merge((rect, datum) => {
      setAttribute(rect, "x", x(datum) - (CONTROL_WIDTH / 2) + "")
    })
  }

  function renderSelectionTopBorder(target) {
    const update = generalUpdatePattern<[number, [number, number]]>(target, ".overview-control-border", [
      [0, selectedDomain],
      [height, selectedDomain]
    ])

    update.enter(() => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")

      setAttribute(line, "class", "overview-control-border")
      setAttribute(line, "stroke", "#C6DCEB")
      setAttribute(line, "stroke-opacity", "0.6")

      return line
    }).merge((line, datum) => {
      const [y, [start, end]] = datum
      setAttribute(line, "x1", x(start) - CONTROL_WIDTH / 2 + "")
      setAttribute(line, "y1", y + "")
      setAttribute(line, "x2", x(end) + CONTROL_WIDTH / 2 + "")
      setAttribute(line, "y2", y + "")
    })
  }

  function renderOverlays(target) {
    const overviewOverlays = generalUpdatePattern(target, ".overview-overlay", selectedDomain)

    overviewOverlays.enter(() => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      setAttribute(rect, "height", height + "")
      setAttribute(rect, "class", "overview-overlay")
      setAttribute(rect, "fill", "#F2F7FA")
      setAttribute(rect, "fill-opacity", "0.8")

      return rect
    }).merge((rect, datum, index) => {
      const rectX = index === 0 ? 0 : x(datum);
      const rectY = 0;
      const rectW = index === 0 ? (x(datum) - CONTROL_WIDTH / 2) : (x.range()[1] - x(datum) + CONTROL_WIDTH / 2);

      setAttribute(rect, "x", rectX + "")
      setAttribute(rect, "y", rectY + "")
      setAttribute(rect, "width", Math.max(rectW, 0) + "")
      setAttribute(rect, "height", height + "")
    })
  }

  function renderSelectionSideHandlers(target) {
    const update = generalUpdatePattern<number>(target, ".overview-handlers", selectedDomain)

    update.enter((d, i) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")

      setAttribute(rect, "width", HANDLER_WIDTH + "")
      setAttribute(rect, "height", height + "")
      setAttribute(rect, "class", "overview-handlers")
      setAttribute(rect, "y", 0 + "")

      drag(rect).container(() => target).on("start", (event) => {
        event.on("drag", (event) => {
          const selection = selectedDomain.concat() as [number, number];

          selection[i] = Math.min(
            Math.max(Math.round(x.invert(event.x)), x.domain()[0]), x.domain()[1]
          );
          selectedDomain = selection;
          renderSelectionSideHandlers(target)
          renderSelectionTopBorder(target)
          renderSelectionEdges(target)
        })

        event.on("end", (event) => {
          console.log(event.x)
        })
      })

      return rect
    }).merge((rect, datum) => {
      setAttribute(rect, "x", x(datum) - (HANDLER_WIDTH / 2) + "")
    })
  }

  function render(target: SVGGElement) {
    target.style.pointerEvents = "all";
    target.style.fill = "none";
    target.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
    renderLines(target)
    renderSelectionEdges(target)
    renderSelectionTopBorder(target)
    renderOverlays(target)
    renderSelectionSideHandlers(target)
  }

  render.xRange = function (_: [number, number]) {
    return x.range(_), render
  }

  render.yRange = function (_: [number, number]) {
    return y.range(_), render
  }

  render.height = function (_) {
    return height = _, render;
  }

  render.data = function (_: Chart) {
    data = _;
    lines = data.lines.map(() => createLine<number>()
      .x((d, i) => x(data.x[i]))
      .y(d => y(d))
    )
    selectedDomain = [data.xDomain[0], data.xDomain[1]];
    x.domain(data.xDomain);
    y.domain(data.linesDomain);
    return render;
  }

  return render
}