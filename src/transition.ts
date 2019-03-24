import { EventEmitter } from "./event-emitter";
import { setAttribute } from "./set-attribute";

export function createTransition() {
  let duration = 100;
  let easy = linearEasy;
  let easySetter = defaultEasySetter;

  function transitionAttr(element: Element, property: string, value: string): EventEmitter | null {
    const transitions = element["__transitions__"] || (element["__transitions__"] = {});

    if (transitions && property in transitions && transitions[property].value === value) {
      return null;
    }

    if (transitions && property in transitions && transitions[property].value !== value) {
      transitions[property].cancel()
    }

    // create a new transition
    const emitter = new EventEmitter()
    const setter = easySetter(element, element.getAttribute(property) || "0", value)
    let startTime = -1;
    let elapsedTime = duration;
    let tickId;
  
    transitions[property] = {
      cancel,
      value
    }

    function tick(now: number) {
      if (startTime === -1) {
        startTime = now;
      }

      elapsedTime = now - startTime;

      const t = Math.min(elapsedTime / duration, 1);
      const tickValue = setter(easy(t))

      setAttribute(element, property, tickValue + "");

      if (t < 1) {
        tickId = nextTick(tick);
      }
      else {
        end()
      }
    }

    function nextTick(tick: (now: number) => void) {
      return requestAnimationFrame(tick);
    }

    function end() {
      emitter.emit("end")
      element["__transition__"] = null
    }

    function cancel() {
      cancelAnimationFrame(tickId);
      emitter.emit("cancel")
      element["__transition__"] = null
    }

    return nextTick(tick),
      emitter;
  }

  transitionAttr.duration = function(_) {
    return duration = _, transitionAttr
  }
  
  transitionAttr.easy = function(_) {
    return easy = _, transitionAttr
  }
  
  transitionAttr.easySetter = function(_) {
    return easySetter = _, transitionAttr
  }

  return transitionAttr;
}

function now() {
  return performance.now();
}

function linearEasy(t: number) {
  return t;
}

function defaultEasySetter(element: Element, startValue: any, finalValue: any) {
  startValue = parseFloat(startValue);
  finalValue = parseFloat(finalValue);

  return function(t) {
    return t * (finalValue - startValue) + startValue;
  }
}
