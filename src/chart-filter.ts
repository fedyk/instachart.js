import { assign } from "./assign";
import { RawChartData } from "./types";
import { addClass, removeClass } from "./class-list";
import { generalUpdatePattern } from "./general-update-pattern";

function emptyHandleFilterChange(chatId: string, visible: boolean) { }

export function createChartFilter(data: RawChartData) {
  let charts = extractCharts();
  let handleFilterChange = emptyHandleFilterChange;

  function render(target: HTMLElement) {
    const allButtons = generalUpdatePattern(target, ".outline-btn", charts);

    allButtons.enter(function (datum, i) {
      const button = document.createElement("button");
      button.className = "outline-btn";

      listenClick(button, datum.id)
      addRipple(button)
      renderButtonIcon(button, datum.visible, datum.color)
      renderButtonLabel(button, datum.name)

      return button;
    }).merge(function (button, datum) {
      renderButtonIcon(button, datum.visible, datum.color)
    })
  }

  function addRipple(button: HTMLButtonElement) {
    button.addEventListener("click", animate, false);

    function animate(e) {
      let ripple = button.querySelector<HTMLSpanElement>(".ripple");

      if (!ripple) {
        ripple = button.insertBefore<HTMLSpanElement>(addClass(document.createElement("span"), "ripple"), button.firstChild);
      }

      removeClass(ripple, "animate")


      if (!ripple.offsetHeight && !ripple.offsetWidth) {
        const d = Math.max(button.offsetHeight, button.offsetWidth);
        ripple.style.height = `${d}px`;
        ripple.style.width = `${d}px`;
      }

      const rect = button.getBoundingClientRect();

      const offset = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      }

      const x = e.pageX - offset.left - ripple.offsetWidth / 2;
      const y = e.pageY - offset.top - ripple.offsetHeight / 2;


      ripple.style.top = `${y}px`;
      ripple.style.left = `${x}px`;
      button.style.overflow = "hidden";
      addClass(ripple, "animate");
    }
  }

  function extractCharts() {
    const charts: Array<{
      id: string;
      name: string;
      color: string;
      visible: boolean;
    }> = []

    for (const key in data.names) {
      const type = data.types[key];

      if (type === "line") {
        charts.push({
          id: key,
          name: data.names[key],
          color: data.colors[key],
          visible: true
        })
      }
    }

    return charts;
  }

  function renderButtonIcon(target, checked: boolean, color: string) {
    const update = generalUpdatePattern(target, ".check-icon", [1]);

    update.enter(function () {
      const span = document.createElement("span")

      span.style.borderColor = color
      span.style.backgroundColor = color
      span.className = "check-icon vertical-align-middle";
      span.innerHTML = `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.1 5.30L4.62 7.82L10.1 2.1" /></svg>`

      return span;
    })
      .merge(function (span) {
        if (checked) {
          addClass(span as HTMLSpanElement, "check-icon--checked")
        }
        else {
          removeClass(span as HTMLSpanElement, "check-icon--checked")
        }
      })
  }

  function renderButtonLabel(target, name: string) {
    const update = generalUpdatePattern<string>(target, ".check-label", [name]);

    update.enter(function (name) {
      const span = document.createElement("span");

      span.className = "check-label vertical-align-middle";
      span.innerText = name;

      return span;
    })
  }

  function listenClick(button: Element, chartId: string) {
    button.addEventListener("click", clicked, false)

    function clicked(event) {
      let visible;
      let color;

      charts = charts.map(function (chart) {
        if (chart.id === chartId) {
          visible = !chart.visible
          color = chart.color
          return assign({}, chart, { visible })
        }

        return chart
      })

      renderButtonIcon(button, visible, color);
      handleFilterChange(chartId, visible);
    }
  }

  render.handleFilterChange = function (_) {
    return arguments.length === 1 ? (handleFilterChange = _, render) : handleFilterChange;
  }

  return render;
}
