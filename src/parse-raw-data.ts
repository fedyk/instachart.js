import { RawChartData, Chart, Line } from "./types";
import { assert } from "./assert";
import { isArray } from "./is-array";
import { extend } from "./extend";

export function parseRawData(data: RawChartData) {
  if (!data) {
    throw new TypeError("data cannot be empty");    
  }

  const columns = data.columns;
  const types = data.types;
  const names = data.names;
  const colors = data.colors;
  const chart: Chart = {
    x: [],
    xDomain: [0, 1],
    lines: [],
    linesDomain: [0, 1]
  }

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    assert(isArray(column), `parsing error: column with index ${i} should be an array`);
    assert(column.length > 2, `parsing error: column should have more that 2 points`);
    assert(column[0] != null, `parsing error: column with index ${i} has empty column id`);

    const chartId = column[0];
    const chartType = types[chartId];
    const data = column.slice(1) as number[];

    if (chartType === "line") {
      chart.lines.push({
        id: chartId,
        name: names[chartId],
        color: colors[chartId],
        domain: extend(data),
        data: data,
        visible: true
      })
    }

    if (chartType === "x") {
      chart.x = column.slice(1) as number[];
      chart.xDomain = extend(chart.x)
    }
  }

  chart.linesDomain = extendLinesDomain(chart.lines);

  return chart;
}

export function extendLinesDomain(lines: Line[]): [number, number] {
  const visibleLines = lines.reduce((prev, curr) => prev.concat(curr.domain), [] as number[]);

  if (visibleLines.length === 0) {
    return [0, 1]
  }

  return extend(visibleLines)
}
