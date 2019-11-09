const indexOf = (typeof Array.prototype.indexOf === 'function') ? function (haystack, needle) {
  return haystack.indexOf(needle);
} : function (haystack, needle) {
  var i = 0, length = haystack.length, idx = -1, found = false;

  while (i < length && !found) {
    if (haystack[i] === needle) {
      idx = i;
      found = true;
    }

    i++;
  }

  return idx;
};


export class EventEmitter {
  events: {
    [key: string]: Array<any>
  }

  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  removeListener(event, listener) {
    let idx;

    if (typeof this.events[event] === 'object') {
      idx = indexOf(this.events[event], listener);

      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }

  emit(event) {
    let i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
      listeners = this.events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args);
      }
    }
  }

  once(event, listener) {
    this.on(event, function g() {
      this.removeListener(event, g);
      listener.apply(this, arguments);
    });
  }
}

