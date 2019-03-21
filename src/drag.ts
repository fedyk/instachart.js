import { point } from "./point";
import { assign } from "./assign";
import { touch } from "./touch";

declare const event: UIEvent;

function noop() { }

function disableDragging(view: Window) {
  const root = view.document.documentElement;

  view.addEventListener("dragstart", preventDefault, false);

  if ("onselectstart" in root) {
    view.addEventListener("selectstart", preventDefault, false);
  }
  else {
    root["__noselect"] = (root.style as any).MozUserSelect;
    root.style["MozUserSelect"] = "none";
  }
}

export function enableDragging(view: Window, noclick) {
  const root = view.document.documentElement;

  view.removeEventListener("dragstart", preventDefault, false)

  if (noclick) {
    view.addEventListener("click", preventDefault, false)

    setTimeout(function () {
      view.removeEventListener("click", preventDefault, false)
    }, 0);
  }

  if ("onselectstart" in root) {
    view.removeEventListener("selectstart", preventDefault, false)
  }
  else {
    (root.style as any).MozUserSelect = root["__noselect"];
    delete root["__noselect"];
  }
}

function DragEvent(target, type, subject, id: string, active: number, x: number, y: number, dx: number, dy: number, listeners = {}) {
  this.target = target;
  this.type = type;
  this.subject = subject;
  this.identifier = id;
  this.active = active;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.listeners = listeners;
}

DragEvent.prototype.on = function (event, listener) {
  this.listeners[event] = listener
}

function customEvent(event1, listener, that: any = null, args: any = null) {
  return listener.call(that, event1, args);
}

function mouse(node) {
  return point(node, event);
}

function noPropagation() {
  event.stopImmediatePropagation();
}

function preventDefault() {
  event.preventDefault();
  event.stopImmediatePropagation();
}


function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(d) {
  return d == null ? { x: (event as MouseEvent).x, y: (event as MouseEvent).y } : d;
}

export function createDrag() {
  let container = defaultContainer;
  let subject = defaultSubject;
  const gestures: {
    mouse(type: string): void;
  } = {
    mouse: noop
  }
  const listeners = {
    start: noop,
    drag: noop,
    end: noop
  };
  let active = 0;
  let mouseDownX;
  let mouseDownY;
  let mouseIsMoving;
  let touchending;
  let clickDistance2 = 0;

  function drag(target: SVGElement) {
    target.addEventListener("mousedown", mouseDowned, false);

    if ("ontouchstart" in target) {
      (target as Element).addEventListener("touchstart", touchStarted, false);
      (target as Element).addEventListener("touchmove", touchMoved, {
        passive: false
      });
      (target as Element).addEventListener("touchend", touchEnded, false);
      (target as Element).addEventListener("touchcancel", touchEnded, false);
      target.style.touchAction = "none";
      target.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
    }

    return drag;
  }

  function mouseDowned(event: MouseEvent) {
    if (touchending) {
      return;
    }

    let gesture = beforeStart("mouse", container.apply(this, arguments), mouse, this, arguments);

    if (!gesture) {
      return;
    }


    event.view.addEventListener("mousemove", mouseMoved, false);
    event.view.addEventListener("mouseup", mouseupped, false);

    disableDragging(event.view);
    noPropagation();

    mouseIsMoving = false;
    mouseDownX = event.clientX;
    mouseDownY = event.clientY;

    gesture("start");
  }

  function mouseMoved() {
    const e = (event as MouseEvent);

    preventDefault();

    if (!mouseIsMoving) {

      let dx = e.clientX - mouseDownX, dy = e.clientY - mouseDownY;
      mouseIsMoving = dx * dx + dy * dy > clickDistance2;
    }

    gestures.mouse("drag");
  }

  function mouseupped() {
    event.view.removeEventListener("mousemove", mouseMoved, false)
    event.view.removeEventListener("mouseup", mouseupped, false)
    enableDragging(event.view, mouseIsMoving);
    preventDefault();
    gestures.mouse("end");
  }

  function touchStarted(event: TouchEvent) {
    let touches = event.changedTouches,
      c = container.apply(this, arguments),
      n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforeStart(touches[i].identifier, c, touch, this, arguments)) {
        noPropagation();
        gesture("start");
      }
    }
  }

  function touchMoved(event: TouchEvent) {
    let touches = event.changedTouches,
      n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        preventDefault();
        gesture("drag");
      }
    }
  }

  function touchEnded(event: TouchEvent) {
    let touches = event.changedTouches,
      n = touches.length, i, gesture;

    if (touchending) {
      clearTimeout(touchending);
    }
    touchending = setTimeout(function () {
      touchending = null;
    }, 500); // Ghost clicks are delayed!

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noPropagation();
        gesture("end");
      }
    }
  }

  function beforeStart(id, container, point, that, args) {
    let p = point(container, id), s, dx, dy;
    const subListeners = assign({}, listeners)

    if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, subListeners), function () {
      if ((s = subject.apply(that, args)) == null) return false;
      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;
      return true;
    })) return;

    return function gesture(type) {
      let p0 = p, n;
      switch (type) {
        case "start":
          gestures[id] = gesture;
          n = active++;
          break;

        case "end":
          delete gestures[id];
          --active;

        case "drag":
          p = point(container, id);
          n = active;
          break;
      }

      customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], subListeners), subListeners[type], subListeners, [type, that, args]);
    };
  }

  drag.on = function (event: "start" | "drag" | "end", listener) {
    return listeners[event] = listener, drag;
  };

  drag.container = function (_) {
    return container = _, drag;
  };

  drag.clickDistance = function (_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
}
