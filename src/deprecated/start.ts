import { RawChartData } from "./types";
import { createInstantChart } from "./instant-chart";
import { createChartFilter } from "./chart-filter";

export function start(data: RawChartData[]) {
  const width = window.innerWidth;
  const n = data.length;
  const charts = [].map(createInstantChart)
  const filters = [].map(createChartFilter)

  for (let i = 0; i < n; i++) {
    const d = data[i];
    const chartTarget = document.getElementById(`chart-${i + 1}`)
    const filtersTarget = document.getElementById(`chart-${i + 1}-filters`)

    if (chartTarget) {
      charts[i] = createInstantChart(chartTarget)
        .width(width)
        .height(369)
        .data(d)
        .render()
    }

    if (filtersTarget) {
      filters[i] = createChartFilter(d)
        .render(filtersTarget as HTMLElement)
        .handleFilterChange(handleFilterChange(i))
    }
  }

  function handleFilterChange(index) {
    return function (chatId, visible) {
      charts[index].toggleLine(chatId, visible)
      charts[index](true)
    }
  }
}
