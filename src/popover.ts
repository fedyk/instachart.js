import { Chart } from "./types";
import { createScale } from "./scale";
import { setAttribute } from "./set-attribute";
import { generalUpdatePattern } from "./general-update-pattern";
import { point } from "./point";
import { longDate } from "./time";
import { removeElement } from "./remove-element";
import { addClass } from "./class-list";
import { touch } from "./touch";

export function createPopover() {
  const x = createScale([0, 1], [0, 1])
  const y = createScale([0, 1], [0, 1])
  const container = document.body.appendChild(document.createElement("div"))
  let lineX: number;
  let lineXIndex: number;
  let lineIsVisible: boolean = false;
  let data: Chart;

  function render(target: Element) {
    renderPlaceholder(target)
    renderLine(target)
    renderCircles(target)
    renderPopoverContainer(container);
    updatePopoverContainerPos((target as SVGGElement).ownerSVGElement as Element);
  }

  function setLineX(rawX) {
    const [d0, d1] = x.domain() as [number, number]
    const xLength = data.x.length;
    let diff = d1 - d0;
    let diffTemp: number;

    for (let i = 0; i < xLength; i++) {
      if (d0 <= data.x[i] && data.x[i] <= d1) {
        diffTemp = Math.abs(data.x[i] - rawX);

        if (diffTemp < diff) {
          diff = diffTemp;
          lineX = data.x[i]
          lineXIndex = i
        }
      }
    }
  }

  function listen(target, rect) {
    rect.addEventListener("mousemove", mouseMoved, false)
    rect.addEventListener("mouseleave", mouseLeaved, false)
    
    if ("ontouchstart" in rect) {
      (rect as Element).addEventListener("touchstart", touchStarted, {passive: false});
      (rect as Element).addEventListener("touchmove", touchMoved, {passive: false});
      (rect as Element).addEventListener("touchend", touchEnded, {passive: false});
      (rect as Element).addEventListener("touchcancel", touchEnded, false);
      rect.style.touchAction = "none";
      rect.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
    }

    function mouseMoved(event) {
      const p = point(rect, event)
      const px = x.invert(p[0])

      lineIsVisible = true;
      setLineX(px)
      update()
    }

    function mouseLeaved() {
      lineIsVisible = false;
      update()
    }

    function touchStarted(event) {
      touchMoved(event)
    }

    function touchMoved(event) {
      const touches = event.changedTouches

      if (touches.length === 0) {
        return;
      }
 
      const p = touch(rect, touches[0].identifier)

      if (!p) {
        return;
      }

      const px = x.invert(p[0])

      // noPropagation()
      
      lineIsVisible = true;
      setLineX(px)
      update()
    }

    function touchEnded(event) {
      lineIsVisible = false;
      update()
    }

    function update() {
      renderLine(target)
      renderCircles(target)
      renderPopoverContainer(container)
    }
  }

  function renderPlaceholder(target) {
    const update = generalUpdatePattern(target, ".popover-placeholder", [1]);

    update.enter(function () {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      setAttribute(rect, "class", "popover-placeholder")
      setAttribute(rect, "fill", "transparent")
      listen(target, rect)

      return rect
    })
      .merge(function (rect) {
        const [x0, x1] = x.range() as [number, number]
        const [x2, x3] = y.range() as [number, number]

        setAttribute(rect, "x", x0 + "")
        setAttribute(rect, "y", x3 + "")
        setAttribute(rect, "width", x1 - x0 + "")
        setAttribute(rect, "height", x2 - x3 + "")
      })
  }

  function renderLine(target) {
    const update = generalUpdatePattern(target, ".popover-line", [1])

    update.enter(function () {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      setAttribute(line, "class", "popover-line")
      setAttribute(line, "stroke", "#ECF0F3")
      setAttribute(line, "stroke-width", "1")
      setAttribute(line, "pointer-events", "none")

      return line;
    })
      .merge(function (line) {
        const lx = lineX != null ? x(lineX) : x.range()[0]
        const [r0, r1] = y.range() as [number, number]
        const opacity = lineIsVisible ? "1" : "0"

        setAttribute(line, "x1", lx + "")
        setAttribute(line, "y1", r0 + "")
        setAttribute(line, "x2", lx + "")
        setAttribute(line, "y2", r1 + "")
        setAttribute(line, "stroke-opacity", opacity)
      })
  }

  function renderCircles(target) {
    const update = generalUpdatePattern(target, ".popover-circle", data.lines)

    update.enter(function (datum) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

      setAttribute(circle, "class", "popover-circle")
      setAttribute(circle, "r", "3")
      setAttribute(circle, "fill", "#ffffff")
      setAttribute(circle, "stroke", datum.color)
      setAttribute(circle, "stroke-width", "2")
      setAttribute(circle, "pointer-events", "none")

      return circle;
    })
      .merge(function (circle, datum) {
        const cx = lineX != null ? x(lineX) : x.range()[0];
        const xy = lineXIndex != null ? y(datum.data[lineXIndex]) : y.range()[0]
        const opacity = (lineIsVisible && datum.visible) ? "1" : "0"
        setAttribute(circle, "cx", cx + "")
        setAttribute(circle, "cy", xy + "")
        setAttribute(circle, "fill-opacity", opacity)
        setAttribute(circle, "stroke-opacity", opacity)
      })
  }

  function renderPopoverContainer(target: HTMLDivElement) {
    target.className = "popover-container"
    target.style.display = lineIsVisible ? "block" : "none";

    renderPopoverHeading(target)
    renderPopoverList(target)

    if (lineIsVisible) {
      const [r0, r1] = x.range() as [number, number];
      const { clientWidth } = target;
      let translateX = x(lineX);

      translateX = Math.min(Math.max(0, translateX), r1 - clientWidth)

      target.style.transform = `translate(${translateX}px, 0)`
    }
  }

  function renderPopoverHeading(target) {
    const update = generalUpdatePattern(target, ".popover-heading", [1])

    update.enter(function () {
      const div = document.createElement("div")

      div.className = "popover-heading";

      return div
    })
      .merge(function (div) {
        if (lineIsVisible && data.x[lineXIndex]) {
          div.textContent = longDate(data.x[lineXIndex])
        }
      })
  }

  function renderPopoverList(target) {
    const update = generalUpdatePattern(target, ".popover-list", [1]);

    update.enter(function () {
      const div = document.createElement("div")

      div.className = "popover-list"

      return div
    })
      .update(function (div) {
        renderPopoverListItems(div)
      })
  }

  function renderPopoverListItems(target) {
    const update = generalUpdatePattern(target, ".popover-list-item", data.lines);

    update.enter(function (datum) {
      const div = document.createElement("div")

      div.className = "popover-list-item";
      div.style.color = datum.color;
      div.appendChild(document.createElement("strong"))
      div.appendChild(document.createElement("small"))

      return div
    })
      .update(function (div, datum) {
        const strong = div.firstChild;
        const small = div.lastChild;
        if (strong) {
          strong.textContent = datum.data[lineXIndex] + ""
        }

        if (small) {
          small.textContent = datum.name
        }

        (div as HTMLDivElement).style.display = datum.visible ? "block" : "none"

        
      })

    update.exit(div => removeElement(div))
  }

  function updatePopoverContainerPos(target: Element) {
    const { top, left } = target.getBoundingClientRect();
 
    container.style.top = top + "px";
    container.style.left = left + "px";
  }

  render.data = function (_: Chart) {
    return data = _,
      x.domain(data.xDomain),
      y.domain(data.linesDomain),
      render;
  }

  render.xRange = function (_: [number, number]) {
    return x.range(_), render
  }

  render.xDomain = function (_) {
    return x.domain(_), render
  }

  render.yRange = function (_: [number, number]) {
    return y.range(_), render
  }

  render.yDomain = function (_) {
    return y.domain(_), render
  }

  return render;
}