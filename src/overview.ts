import { Chart, Line } from "./types";
import { createScale } from "./scale";
import { createDrag } from "./drag";
import { createLine } from "./line";
import { generalUpdatePattern } from "./general-update-pattern";
import { setAttribute } from "./set-attribute";
import { removeElement } from "./remove-element";

const CONTROL_WIDTH = 4;
const HANDLER_WIDTH = 16;
const HANDLE_EXTRA_SPACE = 5;

export function createOverview() {
  let height = 38;
  let data: Chart
  let lines = [].map(() => createLine())
  let x = createScale([0, 1], [0, 1])
  let y = createScale([0, 1], [height, 0])
  let selection: [number, number] = [0, 1]
  let changeSelection = function(_) {}

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
    allLines.exit(line => removeElement(line))
  }

  function renderSelectionEdges(target) {
    const update = generalUpdatePattern<number>(target, ".overview-control", selection)

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
      [0, selection],
      [height, selection]
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
    const overviewOverlays = generalUpdatePattern(target, ".overview-overlay", selection)

    overviewOverlays.enter(() => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      setAttribute(rect, "height", height + "")
      setAttribute(rect, "class", "overview-overlay")
      setAttribute(rect, "fill", "#F2F7FA")
      setAttribute(rect, "fill-opacity", "0.8")
      setAttribute(rect, "y", "0")
      setAttribute(rect, "height", height + "")

      return rect
    }).merge((rect, datum, index) => {
      const [r0, r1] = x.range() as [number, number];
      const rectX = index === 0 ? r0 : x(datum);
      const rectW = index === 0 ? (x(datum) - CONTROL_WIDTH / 2) : (r1 - x(datum) + CONTROL_WIDTH / 2);

      setAttribute(rect, "x", rectX + "")
      setAttribute(rect, "width", rectW + "")
    })
  }

  function renderSelectionCenterHandler(target) {
    const update = generalUpdatePattern<[number, number]>(target, ".overview-center-handler", [selection])

    update.enter((d, i) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      const drag = createDrag();
      
      rect.style.cursor = "grab";
      setAttribute(rect, "height", height + "")
      setAttribute(rect, "fill-opacity", "0.4")
      setAttribute(rect, "fill", "#DCEDC8")
      setAttribute(rect, "class", "overview-center-handler")
      setAttribute(rect, "y", 0 - HANDLE_EXTRA_SPACE + "")

      drag(rect).container(function() {
        return target
      })
      .on("start", function(event) {
        const [d0, d1] = x.domain() as [number, number];
        const [s0, s1] = selection;
        const ds = s1 - s0;
        const dx = event.x - x(s0);

        function normalize(event): [number, number] {
          const d3 = x.invert(event.x - dx);
          const d4 = d3 + ds;

          const r5 = Math.min(Math.max(d3, d0), d1 - ds);
          const r6 = Math.min(Math.max(d4, d0 + ds), d1);

          return [r5, r6]
        }

        event.on("drag", (event) => {
          selection = normalize(event)
          changeSelection(selection);
          renderSelectedArea(target);
        })

        event.on("end", (event) => {
          selection = normalize(event)
          changeSelection(selection);
          renderSelectedArea(target);
        })
      })

      return rect
    }).merge((rect, datum) => {
      setAttribute(rect, "x", x(datum[0]) + (HANDLER_WIDTH / 2) + "")
      setAttribute(rect, "width", x(datum[1]) - x(datum[0]) - 2 * (HANDLER_WIDTH / 2) + "")
      setAttribute(rect, "height", height + 2 * HANDLE_EXTRA_SPACE + "")
    })
  }

  function renderSelectionSideHandlers(target) {
    const update = generalUpdatePattern<number>(target, ".overview-handlers", selection)

    update.enter(function(d, i) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      const drag = createDrag();
      
      rect.style.cursor = "ew-resize";
      setAttribute(rect, "width", HANDLER_WIDTH + "")
      setAttribute(rect, "height", height + 2 * HANDLE_EXTRA_SPACE + "")
      setAttribute(rect, "fill-opacity", "0.6")
      setAttribute(rect, "fill", "#ccc")
      setAttribute(rect, "class", "overview-handlers")
      setAttribute(rect, "y", 0 - HANDLE_EXTRA_SPACE + "")

      console.log(`render i=${i}`)

      drag(rect).container(() => target).on("start", (event) => {
        const r0 = selection[Number(!i)];
        const cr = selection[i];
        const dx = event.x - x(cr);
        const [d0, d1] = x.domain() as [number, number];

        function normalize(event) {
          const r2 = x.invert(event.x - dx);
          const r3 = Math.min(Math.max(r2, d0), d1);

          return [r0, r3].sort() as [number, number];
        }

        event.on("drag", function(event) {
          selection = normalize(event)
          changeSelection(selection);
          renderSelectedArea(target);
        })

        event.on("end", function(event) {
          selection = normalize(event)
          changeSelection(selection);
          renderSelectedArea(target);
        })
      })

      return rect
    }).merge(function(rect, datum) {
      setAttribute(rect, "x", x(datum) - (HANDLER_WIDTH / 2) + "")
    })
  }

  function renderSelectedArea(target) {
    renderOverlays(target)
    renderSelectionEdges(target)
    renderSelectionTopBorder(target)
    renderSelectionSideHandlers(target)
    renderSelectionCenterHandler(target)
  }

  function render(target: SVGGElement) {
    target.style.pointerEvents = "all";
    target.style.fill = "none";
    target.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
    renderLines(target)
    renderOverlays(target)
    renderSelectionEdges(target)
    renderSelectionTopBorder(target)
    renderSelectionSideHandlers(target)
    renderSelectionCenterHandler(target)
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
  
  render.changeSelection = function (_) {
    return changeSelection = _, render;
  }
  
  render.selection = function (_) {
    return selection = _, render;
  }

  render.data = function (_: Chart) {
    data = _;
    lines = data.lines.map(() => createLine<number>()
      .x((d, i) => x(data.x[i]))
      .y(d => y(d))
    )
    x.domain(data.xDomain);
    y.domain(data.linesDomain);
    return render;
  }

  return render
}