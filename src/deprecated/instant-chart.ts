import { setAttribute } from "./set-attribute";
import { parseRawData, extendLinesDomain } from "./parse-raw-data";
import { RawChartData, Chart } from "./types";
import { createLeftAxis, createButtonAxis } from "./axis";
import { createOverview } from "./overview";
import { filter } from "./filter";
import { createPopover } from "./popover";
import { throttle } from "./throttle";
import { createMainLines } from "./main-lines";

export function createInstantChart(parent: HTMLElement) {
  const svg = parent.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  const gLeftAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBottomAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBody = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gOverview = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gPopover = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const xPadding = 16;
  const topPadding = 20;
  const bottomPadding = 10;
  const bodyBottomMargin = 43;
  const heightOverview = 38;
  const renderLeftAxis = createLeftAxis()
  const renderBottomAxis = createButtonAxis()
  const renderMainLines = createMainLines();
  const renderOverview = createOverview().height(heightOverview).changeSelection(throttle(changeSelection, 1000 / 60))
  const renderPopover = createPopover();

  let data: Chart;
  let width: number;
  let height: number;

  setAttribute(gLeftAxis, "transform", "translate(16,0)")
  setAttribute(gPopover, "transform", "translate(0,0)")

  function render(transition = false) {
    renderMainLines(gBody, transition)
    renderLeftAxis(gLeftAxis);
    renderBottomAxis(gBottomAxis);
    renderOverview(gOverview);
    renderPopover(gPopover);
    return render
  }

  function changeSelection(domain: [number, number]) {
    renderMainLines.xDomain(domain)
    renderBottomAxis.domain(domain)
    renderPopover.xDomain(domain)
    renderMainLines(gBody)
    renderLeftAxis(gLeftAxis);
    renderBottomAxis(gBottomAxis);
    renderPopover(gPopover);
  }

  render.data = function(_: RawChartData) {
    data = parseRawData(_)

    const selection: [number, number] = data.x.length > 2 ? [data.x[data.x.length - Math.round(data.x.length / 4)], data.x[data.x.length - 1]] : data.xDomain;

    return renderOverview.data(data),
      renderOverview.selection(selection),
      renderLeftAxis.domain(data.linesDomain),
      renderMainLines.data(data),
      renderMainLines.yDomain(renderLeftAxis.y().domain() as [number, number]),
      renderMainLines.xDomain(selection),
      renderPopover.data(data),
      renderPopover.xDomain(selection),
      renderPopover.yDomain(renderLeftAxis.y().domain() as [number, number]),
      renderBottomAxis.domain(selection),
      render;
  }

  render.width = function(nextWidth: number) {
    return width = +nextWidth,
      renderMainLines.xRange([xPadding, width - xPadding]),
      renderOverview.xRange([xPadding, width - xPadding]),
      renderPopover.xRange([xPadding, width - xPadding]),
      renderLeftAxis.pathLength(width - xPadding),
      renderBottomAxis.range([xPadding, width - xPadding]),
      svg.setAttribute("width", width + ""),
      render
  }

  render.height = function(nextHeight: number) {
    return height = +nextHeight,
      renderLeftAxis.range([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
      renderMainLines.yRange([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
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
      renderLeftAxis.domain(data.linesDomain),
      renderMainLines.data(data),
      renderMainLines.yDomain(renderLeftAxis.y().domain() as [number, number]),
      renderOverview.data(data),
      renderPopover.data(data),
      renderPopover.yDomain(renderLeftAxis.y().domain() as [number, number]),
      render;
  }

  render.render = render

  return render;
}
