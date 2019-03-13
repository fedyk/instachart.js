import { RawChartData } from "./types";
import { parseRawData } from "./helpers/parse-raw-data";
import { generalUpdatePattern } from "./helpers/general-update-pattern";

interface Options {
  target: HTMLElement;
  width: number;
  height: number;
  data: RawChartData;
}

export function InstantChart(options: Options) {
  const target = options.target;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const bodyGroup = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
  const overviewGroup = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
  const data = parseRawData(options.data);

  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }

  target.appendChild(svg);

  width(options.width + "");
  height(options.height + "");

  function width(val: string) {
    svg.setAttribute("width", val);
  }

  function height(val: string) {
    svg.setAttribute("height", val);
  }

  function render() {
    const test = generalUpdatePattern(overviewGroup).select('.test', ["left", "right"]);

    test.enter(e => {
      const el = e.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
      el.setAttribute("class", "test");
    })

    test.exit(el => {
      overviewGroup.removeChild(el);
    })
  }

  return {
    width,
    height,
    render
  }
}
