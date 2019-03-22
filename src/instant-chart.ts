import { createLine } from "./line";
import { createScale } from "./scale";
import { setAttribute } from "./set-attribute";
import { parseRawData, extendLinesDomain } from "./parse-raw-data";
import { RawChartData, Chart } from "./types";
import { createLeftAxis, createButtonAxis } from "./axis";
import { generalUpdatePattern } from "./general-update-pattern";
import { createOverview } from "./overview";
import { filter } from "./filter";
import { createPopover } from "./popover";
import { throttle } from "./throttle";

export function createInstantChart(parent: HTMLElement) {
  const svg = parent.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  const gLeftAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBottomAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBody = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gOverview = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gPopover = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const xScaleMain = createScale([0, 1], [0, 1])
  const yScaleMain = createScale([0, 1], [0, 1])
  const xPadding = 16;
  const topPadding = 10;
  const bottomPadding = 10;
  const bodyBottomMargin = 43;
  const heightOverview = 38;
  const renderLeftAxis = createLeftAxis()
  const renderBottomAxis = createButtonAxis()
  const renderOverview = createOverview().height(heightOverview).changeSelection(throttle(changeSelection, 1000 / 60))
  const renderPopover = createPopover();

  let data: Chart;
  let width: number;
  let height: number;

  setAttribute(gLeftAxis, "transform", "translate(16,0)")
  setAttribute(gPopover, "transform", "translate(0,0)")

  function render() {
    renderMainLines(gBody)
    renderLeftAxis(gLeftAxis);
    renderBottomAxis(gBottomAxis);
    renderOverview(gOverview);
    renderPopover(gPopover);
    return render
  }

  function changeSelection(domain: [number, number]) {
    xScaleMain.domain(domain)
    renderBottomAxis.domain(domain)
    renderPopover.xDomain(domain)
    renderMainLines(gBody)
    renderLeftAxis(gLeftAxis);
    renderBottomAxis(gBottomAxis);
    renderPopover(gPopover);
  }

  function renderMainLines(target) {
    const mainLinePaths = data.lines.map(() => {
      return createLine()
        .x((d, i) => xScaleMain(data.x[i]))
        .y(d => yScaleMain(d))
    });

    const update = generalUpdatePattern(target, ".line", data.lines);

    update.enter((d, index) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      setAttribute(path, "fill", "none"),
      setAttribute(path, "class", "line"),
      setAttribute(path, "stroke-width", "2")
      setAttribute(path, "stroke", data.lines[index].color)

      return path;
    }).merge((path, line, index) => {
      setAttribute(path, "d", mainLinePaths[index](line.data))
      setAttribute(path, "stroke-opacity", line.visible ? "1" : "0")
    })
  }

  render.data = function(_: RawChartData) {
    return data = parseRawData(_),
      renderOverview.data(data),
      renderOverview.selection(data.xDomain),
      renderPopover.data(data),
      xScaleMain.domain(data.xDomain),
      yScaleMain.domain(data.linesDomain),
      renderLeftAxis.domain(data.linesDomain),
      renderBottomAxis.domain(data.xDomain),
      render;
  }

  render.width = function(nextWidth: number) {
    return width = +nextWidth,
      renderOverview.xRange([xPadding, width - xPadding]),
      renderPopover.xRange([xPadding, width - xPadding]),
      xScaleMain.range([xPadding, width - xPadding]),
      renderLeftAxis.pathLength(width - xPadding),
      renderBottomAxis.range([xPadding, width - xPadding]),
      svg.setAttribute("width", width + ""),
      render
  }

  render.height = function(nextHeight: number) {
    return height = +nextHeight,
      yScaleMain.range([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
      renderLeftAxis.range([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
      renderPopover.yRange([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
      svg.setAttribute("height", height + ""),
      setAttribute(gBody, "transform", `translate(0,0)`),
      setAttribute(gBottomAxis, "transform", `translate(0,${height - bottomPadding - heightOverview - bodyBottomMargin})`),
      setAttribute(gOverview, "transform", `translate(0,${height - bottomPadding - heightOverview})`),
      render
  }

  render.toggleLine = function(id: string, visible: boolean) {
    for (let i = 0; i < data.lines.length; i++) {
      if (data.lines[i].id === id) {
        data.lines[i].visible = visible;
      }
    }
    return data.linesDomain = extendLinesDomain(filter(data.lines, line => line.visible === true)),
      yScaleMain.domain(data.linesDomain),
      renderLeftAxis.domain(data.linesDomain),
      renderOverview.data(data),
      renderPopover.data(data),
      renderPopover.yDomain(data.linesDomain),
      render;
  }

  render.render = render

  return render;
}
