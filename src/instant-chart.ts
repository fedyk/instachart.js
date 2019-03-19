import { assert } from "./assert";
import { createLine } from "./line";
import { createScale } from "./scale";
import { setAttribute } from "./set-attribute";
import { parseRawData } from "./parse-raw-data";
import { RawChartData, Chart, Line } from "./types";
import { createLeftAxis, createButtonAxis } from "./axis";
import { generalUpdatePattern } from "./general-update-pattern";
import { createOverview } from "./overview";

export function createInstantChart(parent: HTMLElement) {
  const svg = parent.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  const gLeftAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBottomAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBody = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gOverview = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const xScaleMain = createScale([0, 1], [0, 1])
  const yScaleMain = createScale([0, 1], [0, 1])
  const xPadding = 16;
  const topPadding = 10;
  const bottomPadding = 10;
  const bodyBottomMargin = 16;
  const heightOverview = 38;
  const renderLeftAxis = createLeftAxis()
  const renderBottomAxis = createButtonAxis()
  const renderOverview = createOverview().height(heightOverview).changeSelection(changeSelection)

  let data: Chart;
  let width: number;
  let height: number;

  setAttribute(gLeftAxis, "transform", "translate(16,0)")

  function changeSelection(domain: [number, number]) {
    xScaleMain.domain(domain)
    renderBottomAxis.domain(domain)
    renderMainLines(gBody)
    renderLeftAxis(gLeftAxis);
    renderBottomAxis(gBottomAxis);
  }

  function renderMainLines(target) {

    // render main lines
    const mainLinePaths = data.lines.map(() => {
      return createLine()
        .x((d, i) => xScaleMain(data.x[i]))
        .y(d => yScaleMain(d))
    });

    const mainLinesGUP = generalUpdatePattern(target, ".line", data.lines);

    mainLinesGUP.enter((d, index) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      setAttribute(path, "fill", "none"),
      setAttribute(path, "class", "line"),
      setAttribute(path, "stroke-width", "2")
      setAttribute(path, "stroke", data.lines[index].color)

      return path;
    }).merge((path, line, index) => {
      setAttribute(path, "d", mainLinePaths[index](line.data))
      
    })
  }

  function render() {
    renderMainLines(gBody)
    renderLeftAxis(gLeftAxis);
    renderBottomAxis(gBottomAxis);
    renderOverview(gOverview);
  }

  render.data = function(_: RawChartData) {
    return data = parseRawData(_),
      renderOverview.data(data),
      renderOverview.selection(data.xDomain),
      xScaleMain.domain(data.xDomain),
      yScaleMain.domain(data.linesDomain),
      renderLeftAxis.domain(data.linesDomain),
      renderBottomAxis.domain(data.xDomain),
      render;
  }

  render.width = function(nextWidth: number) {
    return width = +nextWidth,
      renderOverview.xRange([xPadding, width - xPadding]),
      xScaleMain.range([xPadding, width - xPadding]),
      renderLeftAxis.pathLength(width - xPadding),
      renderBottomAxis.range([0, width - xPadding]),
      svg.setAttribute("width", width + ""),
      render
  }

  render.height = function(nextHeight: number) {
    return height = nextHeight,
      yScaleMain.range([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
      renderLeftAxis.range([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
      svg.setAttribute("height", height + ""),
      setAttribute(gBottomAxis, "transform", `translate(${xPadding},${height - bottomPadding - heightOverview - bodyBottomMargin})`),
      setAttribute(gOverview, "transform", `translate(0,${height - bottomPadding - heightOverview})`),
      render
  }

  return render;
}
