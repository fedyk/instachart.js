import { RawChartData, Chart } from "../types";
import { assert } from "./assert";
import { isArray } from "./is-array";

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
    lines: []
  }

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    assert(isArray(column), `parsing error: column with index ${i} should be an array`);
    assert(column.length > 2, `parsing error: column should have more that 2 points`);
    assert(column[0] != null, `parsing error: column with index ${i} has empty column id`);

    const columnId = column[0];
    const columnType = types[columnId];

    if (columnType === "line") {
      chart.lines.push({
        name: names[columnId],
        color: colors[columnId],
        data: column.slice(1) as number[]
      })
    }

    if (columnType === "x") {
      chart.x = column.slice(1) as number[];
    }
  }

  return chart;
}
