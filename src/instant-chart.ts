import { assert } from "./assert";
import { createLine } from "./line";
import { createScale } from "./scale";
import { setAttribute } from "./set-attribute";
import { parseRawData } from "./parse-raw-data";
import { RawChartData, Chart, Line } from "./types";
import { createLeftAxis, createButtonAxis } from "./axis";
import { generalUpdatePattern } from "./general-update-pattern";

export function createInstantChart(parent: HTMLElement) {
  const svg = parent.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  const gLeftAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBottomAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gBody = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const gOverview = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
  const xScaleMain = createScale([0, 1], [0, 1])
  const yScaleMain = createScale([0, 1], [0, 1])
  const xScaleOverview = createScale([0, 1], [0, 1])
  const yScaleOverview = createScale([0, 1], [0, 1])  
  const xPadding = 16;
  const topPadding = 10;
  const bottomPadding = 6;
  const heightOverview = 38;
  const widthOverviewControl = 4;
  const leftAxis = createLeftAxis();
  const bottomAxis = createButtonAxis();
  let data: Chart;
  let width: number;
  let height: number;
  let xOverviewSelected: [number, number] = [0, 1];

  // Add left spacing for Left Axis
  setAttribute(gLeftAxis, "transform", "translate(16,0)")

  function renderChart() {
    // render main lines
    const mainLinePaths = data.lines.map(() => {
      return createLine()
        .x((d, i) => xScaleMain(data.x[i]))
        .y(d => yScaleMain(d))
    });

    const mainLinesGUP = generalUpdatePattern(gBody, ".line", data.lines);

    mainLinesGUP.enter(() => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      setAttribute(path, "fill", "none"),
      setAttribute(path, "class", "line"),
      setAttribute(path, "stroke-width", "1")

      return path;
    }).merge((path, line, index) => {
      setAttribute(path, "d", mainLinePaths[index](line.data))
      setAttribute(path, "stroke", data.lines[index].color)
    })

    leftAxis(gLeftAxis);
    bottomAxis(gBottomAxis);

    // Render lines on overview
    const linesOverview = data.lines.map(v => createLine<number>()
      .x((d, i) => xScaleOverview(data.x[i]))
      .y(d => yScaleOverview(d)))
    
    const linesUpdate = generalUpdatePattern<Line>(gOverview, ".line", data.lines);

    linesUpdate.enter((line, index) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      setAttribute(path, "fill", "none")
      setAttribute(path, "class", "line"),
      setAttribute(path, "d", linesOverview[index](line.data)),
      setAttribute(path, "stroke", data.lines[index].color)
      setAttribute(path, "stroke-width", "1")

      return path
    })


    // render overview controls
    const overviewControls = generalUpdatePattern(gOverview, ".overview-control", xOverviewSelected)

    overviewControls.enter((d) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      return setAttribute(rect, "width", widthOverviewControl + ""),
        setAttribute(rect, "height", heightOverview + ""),
        setAttribute(rect, "class", "overview-control"),
        setAttribute(rect, "fill", "#C6DCEB"),
        setAttribute(rect, "fill-opacity", "0.6")
    }).merge((element, datum) => {
      setAttribute(element, "y", height - bottomPadding - heightOverview + "")
      setAttribute(element, "x", xScaleOverview(datum) - (widthOverviewControl / 2) + "")
    })

    
    // render overview overlay
    const overviewOverlays = generalUpdatePattern(gOverview, ".overview-overlay", xOverviewSelected)

    overviewOverlays.enter(() => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      return setAttribute(rect, "height", heightOverview + ""),
        setAttribute(rect, "class", "overview-overlay"),
        setAttribute(rect, "fill", "#F2F7FA"),
        setAttribute(rect, "fill-opacity", "0.8")
    }).merge((element, datum, index) => {
      const x = index === 0
        ? xPadding
        : xScaleOverview(datum);
      const w = index === 0
        ? (xScaleOverview(datum) - widthOverviewControl / 2 - xPadding)
        : (width - 2 * xPadding - xScaleOverview(datum) + widthOverviewControl / 2);
      const y = height - bottomPadding - heightOverview;
      const h = heightOverview

      setAttribute(element, "x", x + "")
      setAttribute(element, "y", y + "")
      setAttribute(element, "height", h + "")
      setAttribute(element, "width", w + "")
    })
  }

  renderChart.data = function(_: RawChartData) {
    return data = parseRawData(_),
      xScaleMain.domain(data.xDomain),
      yScaleMain.domain(data.linesDomain),
      xScaleOverview.domain(data.xDomain),
      yScaleOverview.domain(data.linesDomain),
      xOverviewSelected = reselectOverview(data.x),
      leftAxis.domain(data.linesDomain),
      bottomAxis.domain(data.xDomain),
      renderChart;
  }

  renderChart.width = function(nextWidth: number) {
    return width = +nextWidth,
      xScaleMain.range([xPadding, width - 2 * xPadding]),
      xScaleOverview.range([xPadding, width - 2 * xPadding]),
      bottomAxis.range([xPadding, width - 2 * xPadding]),
      leftAxis.pathLength(width - 2 * xPadding),
      svg.setAttribute("width", width + ""),
      renderChart
  }

  renderChart.height = function(nextHeight: number) {
    return height = nextHeight,
      yScaleMain.range([height - bottomPadding - topPadding - heightOverview, topPadding]),
      yScaleOverview.range([height - bottomPadding, height - bottomPadding - heightOverview]),
      leftAxis.range([height - bottomPadding - heightOverview, topPadding]),
      svg.setAttribute("height", height + ""),
      setAttribute(gBottomAxis, "transform", `translate(${xPadding}, ${height - bottomPadding - heightOverview})`),
      renderChart
  }

  function reselectOverview(data): [number, number] {
    const dataLength = data.length;

    assert(dataLength >= 2, "min 2 points is required")

    if (dataLength < 10) {
      return [data[0], data[dataLength - 1]];
    }

    const itemsBack = Math.round(dataLength / 5);
    const end = data[dataLength - itemsBack];
    const start = data[dataLength - 2 * itemsBack] == null ? data[0] : Math.max(data[0], data[dataLength - 2 * itemsBack])

    return [start, end];
  }

  return renderChart;
}
