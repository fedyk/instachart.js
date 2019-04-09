var library = (function (exports) {
  'use strict';

  function setAttribute(element, attribute, value) {
      return element.setAttribute(attribute, value), element;
  }
  //# sourceMappingURL=set-attribute.js.map

  function assert(condition, message) {
      if (!condition) {
          throw new Error(message);
      }
  }
  //# sourceMappingURL=assert.js.map

  function isArray(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
  }
  //# sourceMappingURL=is-array.js.map

  function extend(data) {
      var min = data[0];
      var max = data[0];
      for (var index = 0; index < data.length; index++) {
          var item = data[index];
          if (!Number.isNaN(item) && data != null) {
              if (min > item) {
                  min = item;
              }
              if (max < item) {
                  max = item;
              }
          }
      }
      return [min, max];
  }
  //# sourceMappingURL=extend.js.map

  function parseRawData(data) {
      if (!data) {
          throw new TypeError("data cannot be empty");
      }
      var columns = data.columns;
      var types = data.types;
      var names = data.names;
      var colors = data.colors;
      var chart = {
          x: [],
          xDomain: [0, 1],
          lines: [],
          linesDomain: [0, 1]
      };
      for (var i = 0; i < columns.length; i++) {
          var column = columns[i];
          assert(isArray(column), "parsing error: column with index " + i + " should be an array");
          assert(column.length > 2, "parsing error: column should have more that 2 points");
          assert(column[0] != null, "parsing error: column with index " + i + " has empty column id");
          var chartId = column[0];
          var chartType = types[chartId];
          var data_1 = column.slice(1);
          if (chartType === "line") {
              chart.lines.push({
                  id: chartId,
                  name: names[chartId],
                  color: colors[chartId],
                  domain: extend(data_1),
                  data: data_1,
                  visible: true
              });
          }
          if (chartType === "x") {
              chart.x = column.slice(1);
              chart.xDomain = extend(chart.x);
          }
      }
      chart.linesDomain = extendLinesDomain(chart.lines);
      return chart;
  }
  function extendLinesDomain(lines) {
      var visibleLines = lines.reduce(function (prev, curr) { return prev.concat(curr.domain); }, []);
      if (visibleLines.length === 0) {
          return [0, 1];
      }
      return extend(visibleLines);
  }
  //# sourceMappingURL=parse-raw-data.js.map

  var e10 = Math.sqrt(50);
  var e5 = Math.sqrt(10);
  var e2 = Math.sqrt(2);
  function numberTicks(start, stop, count) {
      var i = -1;
      var n;
      var ticks;
      var step;
      stop = +stop;
      start = +start;
      count = +count;
      if (start === stop && count > 0) {
          return [start];
      }
      if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) {
          return [];
      }
      if (step > 0) {
          start = Math.ceil(start / step) - 1;
          stop = Math.floor(stop / step) + 1;
          ticks = new Array(n = Math.ceil(stop - start + 1));
          while (++i < n)
              ticks[i] = (start + i) * step;
      }
      else {
          start = Math.floor(start * step);
          stop = Math.ceil(stop * step);
          ticks = new Array(n = Math.ceil(start - stop + 1));
          while (++i < n)
              ticks[i] = (start - i) / step;
      }
      return ticks;
  }
  function tickIncrement(start, stop, count) {
      var step = (stop - start) / Math.max(0, count);
      var power = Math.floor(Math.log(step) / Math.LN10);
      var error = step / Math.pow(10, power);
      return power >= 0
          ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
          : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  //# sourceMappingURL=number-ticks.js.map

  function createScale(domain, range) {
      function scale(x) {
          var percent = (x - domain[0]) / (domain[1] - domain[0]);
          return percent * (range[1] - range[0]) + range[0];
      }
      scale.invert = function (x) {
          var percent = (x - range[0]) / (range[1] - range[0]);
          return percent * (domain[1] - domain[0]) + domain[0];
      };
      scale.domain = function (newDomain) {
          return newDomain && (domain = newDomain) || domain;
      };
      scale.range = function (newRange) {
          return newRange && (range = newRange) || range;
      };
      return scale;
  }
  //# sourceMappingURL=scale.js.map

  function bindByIndex(parent, elements, enterGroup, updateGroup, exitGroup, data) {
      var dataLength = data.length;
      var elementsLength = elements.length;
      var i = 0;
      for (; i < dataLength; i++) {
          var element = elements[i];
          if (element) {
              updateGroup[i] = element;
          }
          else {
              enterGroup[i] = new EnterNode(parent, data[i]);
          }
      }
      for (; i < elementsLength; ++i) {
          var element = elements[i];
          if (element) {
              exitGroup[i] = element;
          }
      }
  }
  var KEY_PREFIX = "$";
  function bindByKey(parent, elements, enterGroup, updateGroup, exitGroup, data, key) {
      var elementsByKeyValue = {};
      var elementsLength = elements.length;
      var dataLength = data.length;
      var keyValues = new Array(elementsLength);
      // Compute the key for each node.
      // If multiple nodes have the same key, the duplicates are added to exit.
      for (var i = 0; i < elementsLength; ++i) {
          var element = elements[i];
          if (element) {
              var keyValue = KEY_PREFIX + key(element["__data__"], i);
              keyValues[i] = keyValue;
              if (keyValue in elementsByKeyValue) {
                  exitGroup[i] = element;
              }
              else {
                  elementsByKeyValue[keyValue] = element;
              }
          }
      }
      // Compute the key for each datum.
      // If there a node associated with this key, join and add it to update.
      // If there is not (or the key is a duplicate), add it to enter.
      for (var i = 0; i < dataLength; ++i) {
          var keyValue = KEY_PREFIX + key(data[i], i);
          var element = elementsByKeyValue[keyValue];
          if (element) {
              updateGroup[i] = element;
              element["__data__"] = data[i];
              elementsByKeyValue[keyValue] = null;
          }
          else {
              enterGroup[i] = new EnterNode(parent, data[i]);
          }
      }
      // Add any remaining nodes that were not bound to data to exit.
      for (var i = 0; i < elementsLength; ++i) {
          var element = elements[i];
          if (element && (elementsByKeyValue[keyValues[i]] === element)) {
              exitGroup[i] = element;
          }
      }
  }
  function generalUpdatePattern(parent, selector, data, key) {
      if (key === void 0) { key = null; }
      var elements = parent.querySelectorAll(selector);
      var elementsLength = elements.length;
      var dataLength = data.length;
      var enterGroup = new Array(dataLength);
      var enteredGroup = new Array(dataLength);
      var updateGroup = new Array(dataLength);
      var exitGroup = new Array(elementsLength);
      if (key == null) {
          bindByIndex(parent, elements, enterGroup, updateGroup, exitGroup, data);
      }
      else {
          bindByKey(parent, elements, enterGroup, updateGroup, exitGroup, data, key);
      }
      for (var i0 = 0, i1 = 0, previous = void 0, next = void 0; i0 < dataLength; ++i0) {
          if (previous = enterGroup[i0]) {
              if (i0 >= i1)
                  i1 = i0 + 1;
              while (!(next = updateGroup[i1]) && ++i1 < dataLength)
                  ;
              previous._next = next || null;
          }
      }
      var that = {
          // enter mapper
          enter: function (cb) {
              return enterGroup.map(function (element, index) {
                  enteredGroup[index] = element.appendChild(cb(data[index], index));
                  enteredGroup[index]["__data__"] = data[index];
              }), that;
          },
          update: function (cb) {
              return updateGroup.map(function (element, index) { return cb(element, data[index], index); }), that;
          },
          merge: function (cb) {
              for (var index = 0; index < dataLength; index++) {
                  var element = updateGroup[index] || enteredGroup[index];
                  cb(element, data[index], index);
              }
              return that;
          },
          exit: function (cb) {
              return exitGroup.map(function (element, index) { return cb(element, element["__data__"], index); }), that;
          }
      };
      return that;
  }
  var EnterNode = /** @class */ (function () {
      function EnterNode(parent, datum) {
          this.next = null;
          this.parent = parent;
          this.datum = datum;
      }
      EnterNode.prototype.appendChild = function (child) {
          return this.parent.insertBefore(child, this.next);
      };
      return EnterNode;
  }());
  //# sourceMappingURL=general-update-pattern.js.map

  function removeElement(el) {
      return el.parentNode ? el.parentNode.removeChild(el) : null;
  }
  //# sourceMappingURL=remove-element.js.map

  var indexOf = (typeof Array.prototype.indexOf === 'function') ? function (haystack, needle) {
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
  var EventEmitter = /** @class */ (function () {
      function EventEmitter() {
          this.events = {};
      }
      EventEmitter.prototype.on = function (event, listener) {
          if (typeof this.events[event] !== 'object') {
              this.events[event] = [];
          }
          this.events[event].push(listener);
      };
      EventEmitter.prototype.removeListener = function (event, listener) {
          var idx;
          if (typeof this.events[event] === 'object') {
              idx = indexOf(this.events[event], listener);
              if (idx > -1) {
                  this.events[event].splice(idx, 1);
              }
          }
      };
      EventEmitter.prototype.emit = function (event) {
          var i, listeners, length, args = [].slice.call(arguments, 1);
          if (typeof this.events[event] === 'object') {
              listeners = this.events[event].slice();
              length = listeners.length;
              for (i = 0; i < length; i++) {
                  listeners[i].apply(this, args);
              }
          }
      };
      EventEmitter.prototype.once = function (event, listener) {
          this.on(event, function g() {
              this.removeListener(event, g);
              listener.apply(this, arguments);
          });
      };
      return EventEmitter;
  }());
  //# sourceMappingURL=event-emitter.js.map

  function createTransition() {
      var duration = 100;
      var easy = linearEasy;
      var easySetter = defaultEasySetter;
      function transitionAttr(element, property, value) {
          var transitions = element["__transitions__"] || (element["__transitions__"] = {});
          if (transitions && property in transitions && transitions[property].value === value) {
              return null;
          }
          if (transitions && property in transitions && transitions[property].value !== value) {
              transitions[property].cancel();
          }
          // create a new transition
          var emitter = new EventEmitter();
          var setter = easySetter(element, element.getAttribute(property) || "0", value);
          var startTime = -1;
          var elapsedTime = duration;
          var tickId;
          transitions[property] = {
              cancel: cancel,
              value: value
          };
          function tick(now) {
              if (startTime === -1) {
                  startTime = now;
              }
              elapsedTime = now - startTime;
              var t = Math.min(elapsedTime / duration, 1);
              var tickValue = setter(easy(t));
              setAttribute(element, property, tickValue + "");
              if (t < 1) {
                  tickId = nextTick(tick);
              }
              else {
                  end();
              }
          }
          function nextTick(tick) {
              return requestAnimationFrame(tick);
          }
          function end() {
              emitter.emit("end");
              element["__transition__"] = null;
          }
          function cancel() {
              cancelAnimationFrame(tickId);
              emitter.emit("cancel");
              element["__transition__"] = null;
          }
          return nextTick(tick),
              emitter;
      }
      transitionAttr.duration = function (_) {
          return duration = _, transitionAttr;
      };
      transitionAttr.easy = function (_) {
          return easy = _, transitionAttr;
      };
      transitionAttr.easySetter = function (_) {
          return easySetter = _, transitionAttr;
      };
      return transitionAttr;
  }
  function linearEasy(t) {
      return t;
  }
  function defaultEasySetter(element, startValue, finalValue) {
      startValue = parseFloat(startValue);
      finalValue = parseFloat(finalValue);
      return function (t) {
          return t * (finalValue - startValue) + startValue;
      };
  }
  //# sourceMappingURL=transition.js.map

  var SHORT_DAYS = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
  ];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function formatYear(date) {
      return date.getFullYear();
  }
  function formatWeek(d) {
      var month = formatMonth(d);
      var date = d.getDate();
      return month + " " + date;
  }
  function formatMonth(d) {
      return MONTHS[d.getMonth()];
  }
  function formatMillisecond(d) {
      return ":" + d.getMilliseconds();
  }
  function formatSecond(d) {
      return ":" + d.getSeconds();
  }
  function formatMinute(d) {
      var hour = d.getHours();
      var minutes = d.getMinutes();
      return (hour > 9 ? hour : "0" + hour) + ":" + (minutes > 10 ? minutes : "0" + minutes);
  }
  function formatHour(d) {
      var hour = d.getHours();
      var ampm = (hour > 11) ? "pm" : "am";
      return hour + " " + ampm;
  }
  function formatDay(d) {
      return SHORT_DAYS[d.getDay()] + " " + d.getDate();
  }
  function longDate(milliseconds) {
      var dateTime = new Date(milliseconds);
      var day = SHORT_DAYS[dateTime.getDay()];
      var month = MONTHS[dateTime.getMonth()];
      var date = dateTime.getDate();
      return day + ", " + month + " " + date;
  }
  //# sourceMappingURL=time.js.map

  var e10$1 = Math.sqrt(50);
  var e5$1 = Math.sqrt(10);
  var e2$1 = Math.sqrt(2);
  var durationSecond = 1000;
  var durationMinute = durationSecond * 60;
  var durationHour = durationMinute * 60;
  var durationDay = durationHour * 24;
  var durationWeek = durationDay * 7;
  var durationMonth = durationDay * 30;
  var durationYear = durationDay * 365;
  function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }
  function bisector(compare) {
      if (compare.length === 1)
          compare = ascendingComparator(compare);
      return {
          left: function (a, x, lo, hi) {
              if (lo === void 0) { lo = 0; }
              if (hi === void 0) { hi = a.length; }
              while (lo < hi) {
                  var mid = lo + hi >>> 1;
                  if (compare(a[mid], x) < 0)
                      lo = mid + 1;
                  else
                      hi = mid;
              }
              return lo;
          },
          right: function (a, x, lo, hi) {
              if (lo === void 0) { lo = 0; }
              if (hi === void 0) { hi = a.length; }
              while (lo < hi) {
                  var mid = lo + hi >>> 1;
                  if (compare(a[mid], x) > 0)
                      hi = mid;
                  else
                      lo = mid + 1;
              }
              return lo;
          }
      };
  }
  function ascendingComparator(f) {
      return function (d, x) {
          return ascending(f(d), x);
      };
  }
  function tickStep(start, stop, count) {
      var step0 = Math.abs(stop - start) / Math.max(0, count);
      var step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10));
      var error = step0 / step1;
      if (error >= e10$1)
          step1 *= 10;
      else if (error >= e5$1)
          step1 *= 5;
      else if (error >= e2$1)
          step1 *= 2;
      return stop < start ? -step1 : step1;
  }
  var t0 = new Date;
  var t1 = new Date;
  function newInterval(floori, offseti, count, field) {
      if (count === void 0) { count = null; }
      if (field === void 0) { field = null; }
      function interval(date) {
          return floori(date = new Date(+date)), date;
      }
      interval.floor = interval;
      interval.ceil = function (date) {
          return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
      };
      interval.round = function (date) {
          var d0 = interval(date), d1 = interval.ceil(date);
          return date - d0 < d1 - date ? d0 : d1;
      };
      interval.offset = function (date, step) {
          return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
      };
      interval.range = function (start, stop, step) {
          var range = [];
          var previous;
          start = interval.ceil(start);
          step = step == null ? 1 : Math.floor(step);
          if (!(start < stop) || !(step > 0))
              return range; // also handles Invalid Date
          do
              range.push(previous = new Date(+start)), offseti(start, step), floori(start);
          while (previous < start && start < stop);
          return range;
      };
      interval.filter = function (test) {
          return newInterval(function (date) {
              if (date >= date)
                  while (floori(date), !test(date))
                      date.setTime(date - 1);
          }, function (date, step) {
              if (date >= date) {
                  if (step < 0)
                      while (++step <= 0) {
                          while (offseti(date, -1), !test(date)) { } // eslint-disable-line no-empty
                      }
                  else
                      while (--step >= 0) {
                          while (offseti(date, +1), !test(date)) { } // eslint-disable-line no-empty
                      }
              }
          });
      };
      if (count) {
          interval.count = function (start, end) {
              t0.setTime(+start), t1.setTime(+end);
              floori(t0), floori(t1);
              return Math.floor(count(t0, t1));
          };
          interval.every = function (step) {
              step = Math.floor(step);
              return !isFinite(step) || !(step > 0) ? null
                  : !(step > 1) ? interval
                      : interval.filter(field
                          ? function (d) { return field(d) % step === 0; }
                          : function (d) { return interval.count(0, d) % step === 0; });
          };
      }
      return interval;
  }
  var interval = newInterval;
  var timeYear = interval(function (date) {
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
  }, function (date, step) {
      date.setFullYear(date.getFullYear() + step);
  }, function (start, end) {
      return end.getFullYear() - start.getFullYear();
  }, function (date) {
      return date.getFullYear();
  });
  // An optimized implementation for this simple case.
  timeYear.every = function (k) {
      return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : interval(function (date) {
          date.setFullYear(Math.floor(date.getFullYear() / k) * k);
          date.setMonth(0, 1);
          date.setHours(0, 0, 0, 0);
      }, function (date, step) {
          date.setFullYear(date.getFullYear() + step * k);
      });
  };
  var timeMonth = interval(function (date) {
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
  }, function (date, step) {
      date.setMonth(date.getMonth() + step);
  }, function (start, end) {
      return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function (date) {
      return date.getMonth();
  });
  function weekday(i) {
      return interval(function (date) {
          date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
          date.setHours(0, 0, 0, 0);
      }, function (date, step) {
          date.setDate(date.getDate() + step * 7);
      }, function (start, end) {
          return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
      });
  }
  var timeWeek = weekday(0);
  var timeDay = interval(function (date) {
      date.setHours(0, 0, 0, 0);
  }, function (date, step) {
      date.setDate(date.getDate() + step);
  }, function (start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
  }, function (date) {
      return date.getDate() - 1;
  });
  // timeDay
  var timeHour = interval(function (date) {
      date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
  }, function (date, step) {
      date.setTime(+date + step * durationHour);
  }, function (start, end) {
      return (end - start) / durationHour;
  }, function (date) {
      return date.getHours();
  });
  var timeMinute = interval(function (date) {
      date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
  }, function (date, step) {
      date.setTime(+date + step * durationMinute);
  }, function (start, end) {
      return (end - start) / durationMinute;
  }, function (date) {
      return date.getMinutes();
  });
  var timeSecond = interval(function (date) {
      date.setTime(date - date.getMilliseconds());
  }, function (date, step) {
      date.setTime(+date + step * durationSecond);
  }, function (start, end) {
      return (end - start) / durationSecond;
  }, function (date) {
      return date.getUTCSeconds();
  });
  var timeMillisecond = interval(function () {
      // noop
  }, function (date, step) {
      date.setTime(+date + step);
  }, function (start, end) {
      return end - start;
  });
  // An optimized implementation for this simple case.
  timeMillisecond.every = function (k) {
      k = Math.floor(k);
      if (!isFinite(k) || !(k > 0))
          return null;
      if (!(k > 1))
          return timeMillisecond;
      return interval(function (date) {
          date.setTime(Math.floor(date / k) * k);
      }, function (date, step) {
          date.setTime(+date + step * k);
      }, function (start, end) {
          return (end - start) / k;
      });
  };
  function createTimeTicks(scale) {
      var year = timeYear;
      var month = timeMonth;
      var week = timeWeek;
      var day = timeDay;
      var hour = timeHour;
      var minute = timeMinute;
      var second = timeSecond;
      var millisecond = timeMillisecond;
      var domain = scale.domain;
      var tickIntervals = [
          [second, 1, durationSecond],
          [second, 5, 5 * durationSecond],
          [second, 15, 15 * durationSecond],
          [second, 30, 30 * durationSecond],
          [minute, 1, durationMinute],
          [minute, 5, 5 * durationMinute],
          [minute, 15, 15 * durationMinute],
          [minute, 30, 30 * durationMinute],
          [hour, 1, durationHour],
          [hour, 3, 3 * durationHour],
          [hour, 6, 6 * durationHour],
          [hour, 12, 12 * durationHour],
          [day, 1, durationDay],
          [day, 2, 2 * durationDay],
          [week, 1, durationWeek],
          [month, 1, durationMonth],
          [month, 3, 3 * durationMonth],
          [year, 1, durationYear]
      ];
      function tickFormat(date) {
          return (second(date) < date ? formatMillisecond
              : minute(date) < date ? formatSecond
                  : hour(date) < date ? formatMinute
                      : day(date) < date ? formatHour
                          : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
                              : year(date) < date ? formatMonth
                                  : formatYear)(date);
      }
      function tickInterval(interval, start, stop, step) {
          if (interval == null)
              interval = 10;
          if (typeof interval === "number") {
              var target = Math.abs(stop - start) / interval;
              var i = bisector(function (i) { return i[2]; }).right(tickIntervals, target);
              if (i === tickIntervals.length) {
                  step = tickStep(start / durationYear, stop / durationYear, interval);
                  interval = year;
              }
              else if (i) {
                  i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
                  step = i[1];
                  interval = i[0];
              }
              else {
                  step = Math.max(tickStep(start, stop, interval), 1);
                  interval = millisecond;
              }
          }
          return step == null ? interval : interval.every(step);
      }
      scale.ticks = function (interval, step) {
          var d = domain(), t0 = d[0], t1 = d[d.length - 1], r = t1 < t0, t;
          if (r)
              t = t0, t0 = t1, t1 = t;
          t = tickInterval(interval, t0, t1, step);
          t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
          return r ? t.reverse() : t;
      };
      scale.tickFormat = tickFormat;
      return scale;
  }
  //# sourceMappingURL=time-ticks.js.map

  function createLeftAxis() {
      var enterTransition = createTransition().duration(200);
      var exitTransition = createTransition().duration(100);
      var scale = createScale([0, 1], [0, 1]);
      var y = createScale([0, 1], [0, 1]);
      var initiallyRendered = false;
      var ticksCount = 6;
      var pathLength = 100;
      var ticks = [];
      function render(target) {
          var update = generalUpdatePattern(target, ".tick", ticks, function (datum) { return datum + ""; });
          update.enter(function (datum) {
              var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
              var line = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "line"));
              var text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"));
              setAttribute(g, "class", "tick");
              if (initiallyRendered) {
                  setAttribute(g, "fill-opacity", "0");
                  enterTransition(g, "fill-opacity", "1");
              }
              else {
                  setAttribute(g, "fill-opacity", "1");
              }
              setAttribute(line, "x2", pathLength + "");
              setAttribute(line, "class", "tick-line");
              setAttribute(line, "stroke", "#ECF0F3");
              setAttribute(line, "stroke-width", "1");
              setAttribute(text, "y", "-5");
              setAttribute(text, "class", "tick-text");
              setAttribute(text, "fill", "#96A2AA");
              setAttribute(text, "font-size", "9");
              text.textContent = format(datum);
              return g;
          }).merge(function (g, datum) {
              if (datum) {
                  g.childNodes[1].textContent = format(datum);
              }
              setAttribute(g, "transform", "translate(0," + y(datum) + ")");
          });
          update.exit(function (g, datum) {
              setAttribute(g, "transform", "translate(0," + y(datum) + ")");
              var t = exitTransition(g, "fill-opacity", "0");
              if (t) {
                  t.on("end", function () { return removeElement(g); });
              }
          });
          generalUpdatePattern(target, ".tick-line", ticks).update(function (line) {
              setAttribute(line, "x2", pathLength + "");
          });
          initiallyRendered = true;
      }
      function getTicks() {
          var _a = scale.domain(), d0 = _a[0], d1 = _a[1];
          return numberTicks(d0, d1, ticksCount);
      }
      function format(d) {
          return d < 999 ? d + "" : d < 999999 ? (d / 1000).toFixed(1) + "k" : d < 999999999 ? (d / 1000000).toFixed(1) + "M" : "NaN";
      }
      render.domain = function (_) {
          return scale.domain(_), ticks = getTicks(), y.domain([ticks[0], ticks[ticks.length - 1]]), render;
      };
      render.range = function (_) {
          return scale.range(_), y.range(_), render;
      };
      render.y = function () {
          return y;
      };
      render.pathLength = function (_) {
          return _ ? (pathLength = +_) : render;
      };
      return render;
  }
  function createButtonAxis() {
      var enterTransition = createTransition().duration(150);
      var exitTransition = createTransition().duration(100);
      var scale = createScale([0, 1], [0, 1]);
      var timeTicks = createTimeTicks(scale);
      var initiallyRendered = false;
      function render(target) {
          var ticks = timeTicks.ticks(6);
          var allTicks = generalUpdatePattern(target, ".tick", ticks, function (datum) { return datum + ""; });
          allTicks.enter(function (datum) {
              var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
              var text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"));
              setAttribute(g, "class", "tick");
              if (initiallyRendered) {
                  setAttribute(g, "fill-opacity", "0");
                  enterTransition(g, "fill-opacity", "1");
              }
              else {
                  setAttribute(g, "fill-opacity", "1");
              }
              setAttribute(text, "x", "0");
              setAttribute(text, "y", "27");
              setAttribute(text, "fill", "#96A2AA");
              setAttribute(text, "font-size", "9");
              setAttribute(text, "text-anchor", "middle");
              return g;
          }).merge(function (g, datum) {
              setAttribute(g, "transform", "translate(" + scale(datum.getTime()) + ",0)");
              if (g.firstChild) {
                  g.firstChild.textContent = timeTicks.tickFormat(datum);
              }
          });
          allTicks.exit(function (g, datum) {
              if (datum) {
                  setAttribute(g, "transform", "translate(" + scale(datum.getTime()) + ",0)");
              }
              removeElement(g);
              var t = exitTransition(g, "fill-opacity", "0");
              if (t) {
                  t.on("end", function () { return removeElement(g); });
                  t.on("cancel", function () { return removeElement(g); });
              }
          });
          initiallyRendered = true;
      }
      render.domain = function (_) {
          return scale.domain(_), render;
      };
      render.range = function (_) {
          return scale.range(_), render;
      };
      return render;
  }
  //# sourceMappingURL=axis.js.map

  function point(node, event) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
          var point = svg.createSVGPoint();
          point.x = event.clientX, point.y = event.clientY;
          point = point.matrixTransform(node.getScreenCTM().inverse());
          return [point.x, point.y];
      }
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
  }
  //# sourceMappingURL=point.js.map

  function assign(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          sources[_i - 1] = arguments[_i];
      }
      if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
          if (nextSource != null) { // Skip over if undefined or null
              for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                      to[nextKey] = nextSource[nextKey];
                  }
              }
          }
      }
      return to;
  }
  //# sourceMappingURL=assign.js.map

  function touch(node, touches, identifier) {
      if (identifier === void 0) { identifier = null; }
      var e = event;
      if (arguments.length < 3)
          identifier = touches, touches = e.changedTouches;
      for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
          if ((touch = touches[i]).identifier === identifier) {
              return point(node, touch);
          }
      }
      return null;
  }
  //# sourceMappingURL=touch.js.map

  function preventDefault() {
      event.preventDefault();
      event.stopImmediatePropagation();
  }
  //# sourceMappingURL=prevent-default.js.map

  function noPropagation() {
      event.stopImmediatePropagation();
  }
  //# sourceMappingURL=no-propagation.js.map

  function noop() { }
  function DragEvent(target, type, subject, id, active, x, y, dx, dy, listeners) {
      if (listeners === void 0) { listeners = {}; }
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
      this.listeners[event] = listener;
  };
  function customEvent(event1, listener, that, args) {
      if (that === void 0) { that = null; }
      if (args === void 0) { args = null; }
      return listener.call(that, event1, args);
  }
  function mouse(node) {
      return point(node, event);
  }
  function defaultContainer() {
      return this.parentNode;
  }
  function defaultSubject(d) {
      return d == null ? { x: event.x, y: event.y } : d;
  }
  function createDrag() {
      var container = defaultContainer;
      var subject = defaultSubject;
      var gestures = {
          mouse: noop
      };
      var listeners = {
          start: noop,
          drag: noop,
          end: noop
      };
      var active = 0;
      var mouseDownX;
      var mouseDownY;
      var mouseIsMoving;
      var touchending;
      var clickDistance2 = 0;
      function drag(target) {
          target.addEventListener("mousedown", mouseDowned, false);
          if ("ontouchstart" in target) {
              target.addEventListener("touchstart", touchStarted, false);
              target.addEventListener("touchmove", touchMoved, {
                  passive: false
              });
              target.addEventListener("touchend", touchEnded, false);
              target.addEventListener("touchcancel", touchEnded, false);
              target.style.touchAction = "none";
              target.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
          }
          return drag;
      }
      function mouseDowned(event) {
          if (touchending) {
              return;
          }
          var gesture = beforeStart("mouse", container.apply(this, arguments), mouse, this, arguments);
          if (!gesture) {
              return;
          }
          event.view.addEventListener("mousemove", mouseMoved, false);
          event.view.addEventListener("mouseup", mouseupped, false);
          // disableDragging(event.view);
          // noPropagation();
          mouseIsMoving = false;
          mouseDownX = event.clientX;
          mouseDownY = event.clientY;
          gesture("start");
      }
      function mouseMoved() {
          var e = event;
          preventDefault();
          if (!mouseIsMoving) {
              var dx = e.clientX - mouseDownX, dy = e.clientY - mouseDownY;
              mouseIsMoving = dx * dx + dy * dy > clickDistance2;
          }
          gestures.mouse("drag");
      }
      function mouseupped() {
          event.view.removeEventListener("mousemove", mouseMoved, false);
          event.view.removeEventListener("mouseup", mouseupped, false);
          // enableDragging(event.view, mouseIsMoving);
          preventDefault();
          gestures.mouse("end");
      }
      function touchStarted(event) {
          var touches = event.changedTouches, c = container.apply(this, arguments), n = touches.length, i, gesture;
          for (i = 0; i < n; ++i) {
              if (gesture = beforeStart(touches[i].identifier, c, touch, this, arguments)) {
                  noPropagation();
                  gesture("start");
              }
          }
      }
      function touchMoved(event) {
          var touches = event.changedTouches, n = touches.length, i, gesture;
          for (i = 0; i < n; ++i) {
              if (gesture = gestures[touches[i].identifier]) {
                  preventDefault();
                  gesture("drag");
              }
          }
      }
      function touchEnded(event) {
          var touches = event.changedTouches, n = touches.length, i, gesture;
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
          var p = point(container, id), s, dx, dy;
          var subListeners = assign({}, listeners);
          if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, subListeners), function () {
              if ((s = subject.apply(that, args)) == null)
                  return false;
              dx = s.x - p[0] || 0;
              dy = s.y - p[1] || 0;
              return true;
          }))
              return;
          return function gesture(type) {
              var p0 = p, n;
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
      drag.on = function (event, listener) {
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
  //# sourceMappingURL=drag.js.map

  function createPath() {
      var x0;
      var y0;
      var x1;
      var y1;
      var d = "";
      function path() {
          return d;
      }
      path.moveTo = function (x, y) {
          return d += "M" + (x0 = x1 = +x) + "," + (y0 = y1 = +y), path;
      };
      path.lineTo = function (x, y) {
          return d += "L" + (x1 = +x) + "," + (y1 = +y), path;
      };
      path.closePath = function () {
          if (x1 !== null) {
              x1 = x0;
              y1 = y0;
              d += "Z";
          }
          return path;
      };
      return path;
  }
  //# sourceMappingURL=path.js.map

  function createLine() {
      var x;
      var y;
      function line(data) {
          var dataLength = data.length;
          var path = createPath();
          for (var i = 0; i < dataLength; i++) {
              var datum = data[i];
              if (i === 0) {
                  path.moveTo(x(datum, i), y(datum, i));
              }
              else {
                  path.lineTo(x(datum, i), y(datum, i));
              }
          }
          return path();
      }
      line.x = function (_) {
          return x = _, line;
      };
      line.y = function (_) {
          return y = _, line;
      };
      return line;
  }
  //# sourceMappingURL=line.js.map

  var OVERVIEW_HEIGHT = 38;
  var CONTROL_WIDTH = 4;
  var HANDLER_WIDTH = 16;
  var HANDLE_EXTRA_SPACE = 5;
  function createOverview() {
      var data;
      var lines = [].map(function () { return createLine(); });
      var x = createScale([0, 1], [0, 1]);
      var y = createScale([0, 1], [OVERVIEW_HEIGHT, 0]);
      var selection = [0, 1];
      var changeSelection = function (_) {
      };
      function renderLines(target) {
          var allLines = generalUpdatePattern(target, ".line", data.lines);
          allLines.enter(function () {
              var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              setAttribute(path, "fill", "none");
              setAttribute(path, "class", "line");
              setAttribute(path, "stroke-width", "1");
              return path;
          }).merge(function (path, datum, index) {
              setAttribute(path, "d", lines[index](datum.data));
              setAttribute(path, "stroke", data.lines[index].color);
              setAttribute(path, "stroke-opacity", data.lines[index].visible ? "1" : "0");
          });
          // remove not needed lines
          allLines.exit(function (line) { return removeElement(line); });
      }
      function renderSelectionEdges(target) {
          var update = generalUpdatePattern(target, ".overview-control", selection);
          update.enter(function (d) {
              var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              setAttribute(rect, "width", CONTROL_WIDTH + "");
              setAttribute(rect, "height", OVERVIEW_HEIGHT + "");
              setAttribute(rect, "class", "overview-control");
              setAttribute(rect, "fill", "#C6DCEB");
              setAttribute(rect, "fill-opacity", "0.6");
              setAttribute(rect, "y", 0 + "");
              return rect;
          }).merge(function (rect, datum) {
              setAttribute(rect, "x", x(datum) - (CONTROL_WIDTH / 2) + "");
          });
      }
      function renderSelectionTopBorder(target) {
          var update = generalUpdatePattern(target, ".overview-control-border", [
              [0, selection],
              [OVERVIEW_HEIGHT, selection]
          ]);
          update.enter(function () {
              var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
              setAttribute(line, "class", "overview-control-border");
              setAttribute(line, "stroke", "#C6DCEB");
              setAttribute(line, "stroke-opacity", "0.6");
              return line;
          }).merge(function (line, datum) {
              var y = datum[0], _a = datum[1], start = _a[0], end = _a[1];
              setAttribute(line, "x1", x(start) - CONTROL_WIDTH / 2 + "");
              setAttribute(line, "y1", y + "");
              setAttribute(line, "x2", x(end) + CONTROL_WIDTH / 2 + "");
              setAttribute(line, "y2", y + "");
          });
      }
      function renderOverlays(target) {
          var overviewOverlays = generalUpdatePattern(target, ".overview-overlay", selection);
          overviewOverlays.enter(function () {
              var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              setAttribute(rect, "height", OVERVIEW_HEIGHT + "");
              setAttribute(rect, "class", "overview-overlay");
              setAttribute(rect, "fill", "#F2F7FA");
              setAttribute(rect, "fill-opacity", "0.8");
              setAttribute(rect, "y", "0");
              setAttribute(rect, "height", OVERVIEW_HEIGHT + "");
              return rect;
          }).merge(function (rect, datum, index) {
              var _a = x.range(), r0 = _a[0], r1 = _a[1];
              var rectX = index === 0 ? r0 : x(datum);
              var rectW = index === 0 ? Math.max(x(datum) - CONTROL_WIDTH / 2 - r0, 0) : (r1 - x(datum) + CONTROL_WIDTH / 2);
              setAttribute(rect, "x", rectX + "");
              setAttribute(rect, "width", rectW + "");
          });
      }
      function renderSelectionCenterHandler(target) {
          var update = generalUpdatePattern(target, ".overview-center-handler", [selection]);
          update.enter(function (d, i) {
              var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              var drag = createDrag();
              rect.style.cursor = "grab";
              setAttribute(rect, "height", OVERVIEW_HEIGHT + "");
              // setAttribute(rect, "fill-opacity", "0.4")
              // setAttribute(rect, "fill", "#DCEDC8")
              setAttribute(rect, "class", "overview-center-handler");
              setAttribute(rect, "y", 0 - HANDLE_EXTRA_SPACE + "");
              drag(rect).container(function () {
                  return target;
              })
                  .on("start", function (event) {
                  var _a = x.domain(), d0 = _a[0], d1 = _a[1];
                  var s0 = selection[0], s1 = selection[1];
                  var ds = s1 - s0;
                  var dx = event.x - x(s0);
                  function normalize(event) {
                      var d3 = x.invert(event.x - dx);
                      var d4 = d3 + ds;
                      var r5 = Math.min(Math.max(d3, d0), d1 - ds);
                      var r6 = Math.min(Math.max(d4, d0 + ds), d1);
                      return [r5, r6];
                  }
                  event.on("drag", function (event) {
                      selection = normalize(event);
                      changeSelection(selection);
                      renderSelectedArea(target);
                  });
                  event.on("end", function (event) {
                      selection = normalize(event);
                      changeSelection(selection);
                      renderSelectedArea(target);
                  });
              });
              return rect;
          }).merge(function (rect, datum) {
              var rectX = x(datum[0]) + (HANDLER_WIDTH / 2);
              var rectW = Math.max(x(datum[1]) - x(datum[0]) - 2 * (HANDLER_WIDTH / 2), 0);
              setAttribute(rect, "x", rectX + "");
              setAttribute(rect, "width", rectW + "");
              setAttribute(rect, "height", OVERVIEW_HEIGHT + 2 * HANDLE_EXTRA_SPACE + "");
          });
      }
      function renderSelectionSideHandlers(target) {
          var update = generalUpdatePattern(target, ".overview-handlers", selection);
          update.enter(function (d, i) {
              var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              var drag = createDrag();
              rect.style.cursor = "ew-resize";
              setAttribute(rect, "width", HANDLER_WIDTH + "");
              setAttribute(rect, "height", OVERVIEW_HEIGHT + 2 * HANDLE_EXTRA_SPACE + "");
              // setAttribute(rect, "fill-opacity", "0.6")
              // setAttribute(rect, "fill", "#ccc")
              setAttribute(rect, "class", "overview-handlers");
              setAttribute(rect, "y", 0 - HANDLE_EXTRA_SPACE + "");
              drag(rect).container(function () { return target; }).on("start", function (event) {
                  var r0 = selection[Number(!i)];
                  var cr = selection[i];
                  var dx = event.x - x(cr);
                  var _a = x.domain(), d0 = _a[0], d1 = _a[1];
                  function normalize(event) {
                      var r2 = x.invert(event.x - dx);
                      var r3 = Math.min(Math.max(r2, d0), d1);
                      return [r0, r3].sort();
                  }
                  event.on("drag", function (event) {
                      selection = normalize(event);
                      changeSelection(selection);
                      renderSelectedArea(target);
                  });
                  event.on("end", function (event) {
                      selection = normalize(event);
                      changeSelection(selection);
                      renderSelectedArea(target);
                  });
              });
              return rect;
          }).merge(function (rect, datum) {
              setAttribute(rect, "x", x(datum) - (HANDLER_WIDTH / 2) + "");
          });
      }
      function renderSelectedArea(target) {
          renderOverlays(target);
          renderSelectionEdges(target);
          renderSelectionTopBorder(target);
          renderSelectionSideHandlers(target);
          renderSelectionCenterHandler(target);
      }
      function render(target) {
          target.style.pointerEvents = "all";
          target.style.fill = "none";
          target.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
          renderLines(target);
          renderOverlays(target);
          renderSelectionEdges(target);
          renderSelectionTopBorder(target);
          renderSelectionSideHandlers(target);
          renderSelectionCenterHandler(target);
      }
      render.xRange = function (_) {
          return x.range(_), render;
      };
      render.yRange = function (_) {
          return y.range(_), render;
      };
      render.changeSelection = function (_) {
          return changeSelection = _, render;
      };
      render.selection = function (_) {
          return selection = _, render;
      };
      render.data = function (_) {
          data = _;
          lines = data.lines.map(function () { return createLine()
              .x(function (d, i) { return x(data.x[i]); })
              .y(function (d) { return y(d); }); });
          x.domain(data.xDomain);
          y.domain(data.linesDomain);
          return render;
      };
      return render;
  }
  //# sourceMappingURL=overview.js.map

  function filter(arr, func, thisArg) {
      var len = arr.length >>> 0, res = new Array(len), // preallocate array
      t = arr, c = 0, i = -1;
      if (thisArg === undefined) {
          while (++i !== len) {
              // checks to see if the key was set
              if (i in arr) {
                  if (func(t[i], i, t)) {
                      res[c++] = t[i];
                  }
              }
          }
      }
      else {
          while (++i !== len) {
              // checks to see if the key was set
              if (i in arr) {
                  if (func.call(thisArg, t[i], i, t)) {
                      res[c++] = t[i];
                  }
              }
          }
      }
      res.length = c; // shrink down array to proper size
      return res;
  }
  //# sourceMappingURL=filter.js.map

  function createPopover() {
      var x = createScale([0, 1], [0, 1]);
      var y = createScale([0, 1], [0, 1]);
      var container = document.body.appendChild(document.createElement("div"));
      var lineX;
      var lineXIndex;
      var lineIsVisible = false;
      var data;
      function render(target) {
          renderPlaceholder(target);
          renderLine(target);
          renderCircles(target);
          renderPopoverContainer(container);
          setTimeout(function () { return updatePopoverContainerPos(target.ownerSVGElement); }, 0);
      }
      function setLineX(rawX) {
          var _a = x.domain(), d0 = _a[0], d1 = _a[1];
          var xLength = data.x.length;
          var diff = d1 - d0;
          var diffTemp;
          for (var i = 0; i < xLength; i++) {
              if (d0 <= data.x[i] && data.x[i] <= d1) {
                  diffTemp = Math.abs(data.x[i] - rawX);
                  if (diffTemp < diff) {
                      diff = diffTemp;
                      lineX = data.x[i];
                      lineXIndex = i;
                  }
              }
          }
      }
      function listen(target, rect) {
          rect.addEventListener("mousemove", mouseMoved, false);
          rect.addEventListener("mouseleave", mouseLeaved, false);
          if ("ontouchstart" in rect) {
              rect.addEventListener("touchstart", touchStarted, false);
              rect.addEventListener("touchmove", touchMoved, false);
              rect.addEventListener("touchend", touchEnded, false);
              rect.addEventListener("touchcancel", touchEnded, false);
              rect.style.touchAction = "none";
              rect.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
          }
          function mouseMoved(event) {
              var p = point(rect, event);
              var px = x.invert(p[0]);
              lineIsVisible = true;
              setLineX(px);
              update();
          }
          function mouseLeaved() {
              lineIsVisible = false;
              update();
          }
          function touchStarted(event) {
              touchMoved(event);
          }
          function touchMoved(event) {
              var touches = event.changedTouches;
              if (touches.length === 0) {
                  return;
              }
              var p = touch(rect, touches[0].identifier);
              if (!p) {
                  return;
              }
              var px = x.invert(p[0]);
              lineIsVisible = true;
              setLineX(px);
              update();
          }
          function touchEnded(event) {
              lineIsVisible = false;
              update();
          }
          function update() {
              renderLine(target);
              renderCircles(target);
              renderPopoverContainer(container);
          }
      }
      function renderPlaceholder(target) {
          var update = generalUpdatePattern(target, ".popover-placeholder", [1]);
          update.enter(function () {
              var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              setAttribute(rect, "class", "popover-placeholder");
              setAttribute(rect, "fill", "transparent");
              listen(target, rect);
              return rect;
          })
              .merge(function (rect) {
              var _a = x.range(), x0 = _a[0], x1 = _a[1];
              var _b = y.range(), x2 = _b[0], x3 = _b[1];
              setAttribute(rect, "x", x0 + "");
              setAttribute(rect, "y", x3 + "");
              setAttribute(rect, "width", x1 - x0 + "");
              setAttribute(rect, "height", x2 - x3 + "");
          });
      }
      function renderLine(target) {
          var update = generalUpdatePattern(target, ".popover-line", [1]);
          update.enter(function () {
              var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
              setAttribute(line, "class", "popover-line");
              setAttribute(line, "stroke", "#ECF0F3");
              setAttribute(line, "stroke-width", "1");
              setAttribute(line, "pointer-events", "none");
              return line;
          })
              .merge(function (line) {
              var lx = lineX != null ? x(lineX) : x.range()[0];
              var _a = y.range(), r0 = _a[0], r1 = _a[1];
              var opacity = lineIsVisible ? "1" : "0";
              setAttribute(line, "x1", lx + "");
              setAttribute(line, "y1", r0 + "");
              setAttribute(line, "x2", lx + "");
              setAttribute(line, "y2", r1 + "");
              setAttribute(line, "stroke-opacity", opacity);
          });
      }
      function renderCircles(target) {
          var update = generalUpdatePattern(target, ".popover-circle", data.lines);
          update.enter(function (datum) {
              var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              setAttribute(circle, "class", "popover-circle");
              setAttribute(circle, "r", "3");
              setAttribute(circle, "fill", "#ffffff");
              setAttribute(circle, "stroke", datum.color);
              setAttribute(circle, "stroke-width", "2");
              setAttribute(circle, "pointer-events", "none");
              return circle;
          })
              .merge(function (circle, datum) {
              var cx = lineX != null ? x(lineX) : x.range()[0];
              var xy = lineXIndex != null ? y(datum.data[lineXIndex]) : y.range()[0];
              var opacity = (lineIsVisible && datum.visible) ? "1" : "0";
              setAttribute(circle, "cx", cx + "");
              setAttribute(circle, "cy", xy + "");
              setAttribute(circle, "fill-opacity", opacity);
              setAttribute(circle, "stroke-opacity", opacity);
          });
      }
      function renderPopoverContainer(target) {
          target.className = "popover-container";
          target.style.display = lineIsVisible ? "block" : "none";
          renderPopoverHeading(target);
          renderPopoverList(target);
          if (lineIsVisible) {
              var _a = x.range(), r0 = _a[0], r1 = _a[1];
              var clientWidth = target.clientWidth;
              var translateX = x(lineX);
              translateX = Math.min(Math.max(0, translateX), r1 - clientWidth);
              target.style.transform = "translate(" + translateX + "px, 0)";
          }
      }
      function renderPopoverHeading(target) {
          var update = generalUpdatePattern(target, ".popover-heading", [1]);
          update.enter(function () {
              var div = document.createElement("div");
              div.className = "popover-heading";
              return div;
          })
              .merge(function (div) {
              if (lineIsVisible && data.x[lineXIndex]) {
                  div.textContent = longDate(data.x[lineXIndex]);
              }
          });
      }
      function renderPopoverList(target) {
          var update = generalUpdatePattern(target, ".popover-list", [1]);
          update.enter(function () {
              var div = document.createElement("div");
              div.className = "popover-list";
              return div;
          })
              .update(function (div) {
              renderPopoverListItems(div);
          });
      }
      function renderPopoverListItems(target) {
          var update = generalUpdatePattern(target, ".popover-list-item", data.lines);
          update.enter(function (datum) {
              var div = document.createElement("div");
              div.className = "popover-list-item";
              div.style.color = datum.color;
              div.appendChild(document.createElement("strong"));
              div.appendChild(document.createElement("small"));
              return div;
          })
              .update(function (div, datum) {
              var strong = div.firstChild;
              var small = div.lastChild;
              if (strong) {
                  strong.textContent = datum.data[lineXIndex] + "";
              }
              if (small) {
                  small.textContent = datum.name;
              }
              div.style.display = datum.visible ? "block" : "none";
          });
          update.exit(function (div) { return removeElement(div); });
      }
      function updatePopoverContainerPos(target) {
          var _a = target.getBoundingClientRect(), top = _a.top, left = _a.left;
          top += pageYOffset;
          left += pageXOffset;
          container.style.top = top + "px";
          container.style.left = left + "px";
      }
      render.data = function (_) {
          return data = _, render;
      };
      render.xRange = function (_) {
          return x.range(_), render;
      };
      render.xDomain = function (_) {
          return x.domain(_), render;
      };
      render.yRange = function (_) {
          return y.range(_), render;
      };
      render.yDomain = function (_) {
          return y.domain(_), render;
      };
      return render;
  }
  //# sourceMappingURL=popover.js.map

  function throttle(func, wait, options) {
      if (options === void 0) { options = {}; }
      var context, args, result;
      var timeout;
      var previous = 0;
      var later = function () {
          previous = options.leading === false ? 0 : Date.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout)
              context = args = null;
      };
      return function () {
          var now = Date.now();
          if (!previous && options.leading === false)
              previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
              }
              previous = now;
              result = func.apply(context, args);
              if (!timeout)
                  context = args = null;
          }
          else if (!timeout && options.trailing !== false) {
              timeout = setTimeout(later, remaining);
          }
          return result;
      };
  }
  //# sourceMappingURL=throttle.js.map

  function pathEasySetter(path0, d0, d1) {
      var pd0 = d0.slice(1).split("L").map(function (v) { return v.split(",").map(parseFloat); });
      var pd1 = d1.slice(1).split("L").map(function (v) { return v.split(",").map(parseFloat); });
      var pd0Len = pd0.length;
      return function (t) {
          if (t >= 1) {
              return d1;
          }
          var path = createPath();
          for (var i = 0; i < pd0Len; i++) {
              var p = interpolate(pd0[i][0], pd0[i][1], pd1[i][0], pd1[i][1], t);
              if (i === 0) {
                  path.moveTo(p[0], p[1]);
              }
              else {
                  path.lineTo(p[0], p[1]);
              }
          }
          return path();
      };
  }
  function interpolate(x0, y0, x1, y1, t) {
      return [t * (x1 - x0) + x0, t * (y1 - y0) + y0];
  }
  //# sourceMappingURL=path-easy-setter.js.map

  function createMainLines() {
      var x = createScale([0, 1], [0, 1]);
      var y = createScale([0, 1], [0, 1]);
      var strokeOpacityTransition = createTransition().duration(100);
      var dTransition = createTransition().duration(150).easySetter(pathEasySetter);
      var lines = [].map(createLine);
      var data;
      function render(target, transition) {
          if (transition === void 0) { transition = false; }
          var update = generalUpdatePattern(target, ".line", data.lines, function (d) { return d.id; });
          update.enter(function (datum, i) {
              var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              setAttribute(path, "fill", "none");
              setAttribute(path, "class", "line");
              setAttribute(path, "stroke-width", "2");
              setAttribute(path, "stroke", data.lines[i].color);
              return path;
          }).merge(function (path, datum, i) {
              if (transition) {
                  strokeOpacityTransition(path, "stroke-opacity", datum.visible ? "1" : "0");
                  dTransition(path, "d", lines[i](datum.data));
              }
              else {
                  setAttribute(path, "stroke-opacity", datum.visible ? "1" : "0");
                  setAttribute(path, "d", lines[i](datum.data));
              }
          });
      }
      render.data = function (_) {
          return data = _, lines = data.lines.map(function () { return createLine().x(function (d, i) { return x(data.x[i]); }).y(function (d) { return y(d); }); });
      };
      render.xRange = function (_) {
          return x.range(_), render;
      };
      render.yRange = function (_) {
          return y.range(_), render;
      };
      render.yDomain = function (_) {
          return y.domain(_), render;
      };
      render.xDomain = function (_) {
          return x.domain(_), render;
      };
      return render;
  }
  //# sourceMappingURL=main-lines.js.map

  function createInstantChart(parent) {
      var svg = parent.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
      var gLeftAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
      var gBottomAxis = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
      var gBody = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
      var gOverview = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
      var gPopover = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
      var xPadding = 16;
      var topPadding = 20;
      var bottomPadding = 10;
      var bodyBottomMargin = 43;
      var heightOverview = 38;
      var renderLeftAxis = createLeftAxis();
      var renderBottomAxis = createButtonAxis();
      var renderMainLines = createMainLines();
      var renderOverview = createOverview().height(heightOverview).changeSelection(throttle(changeSelection, 1000 / 60));
      var renderPopover = createPopover();
      var data;
      var width;
      var height;
      setAttribute(gLeftAxis, "transform", "translate(16,0)");
      setAttribute(gPopover, "transform", "translate(0,0)");
      function render(transition) {
          if (transition === void 0) { transition = false; }
          renderMainLines(gBody, transition);
          renderLeftAxis(gLeftAxis);
          renderBottomAxis(gBottomAxis);
          renderOverview(gOverview);
          renderPopover(gPopover);
          return render;
      }
      function changeSelection(domain) {
          renderMainLines.xDomain(domain);
          renderBottomAxis.domain(domain);
          renderPopover.xDomain(domain);
          renderMainLines(gBody);
          renderLeftAxis(gLeftAxis);
          renderBottomAxis(gBottomAxis);
          renderPopover(gPopover);
      }
      render.data = function (_) {
          data = parseRawData(_);
          var selection = data.x.length > 2 ? [data.x[data.x.length - Math.round(data.x.length / 4)], data.x[data.x.length - 1]] : data.xDomain;
          return renderOverview.data(data),
              renderOverview.selection(selection),
              renderLeftAxis.domain(data.linesDomain),
              renderMainLines.data(data),
              renderMainLines.yDomain(renderLeftAxis.y().domain()),
              renderMainLines.xDomain(selection),
              renderPopover.data(data),
              renderPopover.xDomain(selection),
              renderPopover.yDomain(renderLeftAxis.y().domain()),
              renderBottomAxis.domain(selection),
              render;
      };
      render.width = function (nextWidth) {
          return width = +nextWidth,
              renderMainLines.xRange([xPadding, width - xPadding]),
              renderOverview.xRange([xPadding, width - xPadding]),
              renderPopover.xRange([xPadding, width - xPadding]),
              renderLeftAxis.pathLength(width - xPadding),
              renderBottomAxis.range([xPadding, width - xPadding]),
              svg.setAttribute("width", width + ""),
              render;
      };
      render.height = function (nextHeight) {
          return height = +nextHeight,
              renderLeftAxis.range([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
              renderMainLines.yRange([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
              renderPopover.yRange([height - bottomPadding - heightOverview - bodyBottomMargin, topPadding]),
              svg.setAttribute("height", height + ""),
              setAttribute(gBody, "transform", "translate(0,0)"),
              setAttribute(gBottomAxis, "transform", "translate(0," + (height - bottomPadding - heightOverview - bodyBottomMargin) + ")"),
              setAttribute(gOverview, "transform", "translate(0," + (height - bottomPadding - heightOverview) + ")"),
              render;
      };
      render.toggleLine = function (id, visible) {
          for (var i = 0; i < data.lines.length; i++) {
              if (data.lines[i].id === id) {
                  data.lines[i].visible = visible;
              }
          }
          return data.linesDomain = extendLinesDomain(filter(data.lines, function (line) { return line.visible === true; })),
              renderLeftAxis.domain(data.linesDomain),
              renderMainLines.data(data),
              renderMainLines.yDomain(renderLeftAxis.y().domain()),
              renderOverview.data(data),
              renderPopover.data(data),
              renderPopover.yDomain(renderLeftAxis.y().domain()),
              render;
      };
      render.render = render;
      return render;
  }
  //# sourceMappingURL=instant-chart.js.map

  function addClass(el, className) {
      return el.className += ' ' + className, el;
  }
  function removeClass(el, className) {
      if (el.classList)
          el.classList.remove(className);
      else
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      return el;
  }
  function toggleClass(el, className) {
      if (el.classList) {
          el.classList.toggle(className);
      }
      else {
          var classes = el.className.split(' ');
          var existingIndex = classes.indexOf(className);
          if (existingIndex >= 0)
              classes.splice(existingIndex, 1);
          else
              classes.push(className);
          el.className = classes.join(' ');
      }
  }
  //# sourceMappingURL=class-list.js.map

  function createRipple(button) {
      button.addEventListener("click", animate, false);
      function animate(e) {
          var ripple = button.querySelector(".ripple");
          if (!ripple) {
              ripple = button.insertBefore(addClass(document.createElement("span"), "ripple"), button.firstChild);
          }
          removeClass(ripple, "animate");
          var d = Math.max(button.offsetHeight, button.offsetWidth);
          var _a = point(button, event), x = _a[0], y = _a[1];
          ripple.style.top = y - d / 2 + "px";
          ripple.style.left = x - d / 2 + "px";
          ripple.style.height = d + "px";
          ripple.style.width = d + "px";
          button.style.overflow = "hidden";
          addClass(ripple, "animate");
      }
      return animate;
  }
  //# sourceMappingURL=ripple.js.map

  function emptyHandleFilterChange(chatId, visible) { }
  function createChartFilter(data) {
      var charts = extractCharts();
      var handleFilterChange = emptyHandleFilterChange;
      function render(target) {
          var allButtons = generalUpdatePattern(target, ".outline-btn", charts);
          allButtons.enter(function (datum, i) {
              var button = document.createElement("button");
              button.className = "outline-btn";
              listenClick(button, datum.id);
              createRipple(button);
              renderButtonIcon(button, datum.visible, datum.color);
              renderButtonLabel(button, datum.name);
              return button;
          }).merge(function (button, datum) {
              renderButtonIcon(button, datum.visible, datum.color);
          });
          return render;
      }
      function extractCharts() {
          var charts = [];
          for (var key in data.names) {
              var type = data.types[key];
              if (type === "line") {
                  charts.push({
                      id: key,
                      name: data.names[key],
                      color: data.colors[key],
                      visible: true
                  });
              }
          }
          return charts;
      }
      function renderButtonIcon(target, checked, color) {
          var update = generalUpdatePattern(target, ".check-icon", [1]);
          update.enter(function () {
              var span = document.createElement("span");
              span.style.borderColor = color;
              span.style.backgroundColor = color;
              span.className = "check-icon vertical-align-middle";
              span.innerHTML = "<svg width=\"12\" height=\"10\" viewBox=\"0 0 12 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2.1 5.30L4.62 7.82L10.1 2.1\" /></svg>";
              return span;
          })
              .merge(function (span) {
              if (checked) {
                  addClass(span, "check-icon--checked");
              }
              else {
                  removeClass(span, "check-icon--checked");
              }
          });
      }
      function renderButtonLabel(target, name) {
          var update = generalUpdatePattern(target, ".check-label", [name]);
          update.enter(function (name) {
              var span = document.createElement("span");
              span.className = "check-label vertical-align-middle";
              span.innerText = name;
              return span;
          });
      }
      function listenClick(button, chartId) {
          button.addEventListener("click", clicked, false);
          function clicked(event) {
              var visible;
              var color;
              charts = charts.map(function (chart) {
                  if (chart.id === chartId) {
                      visible = !chart.visible;
                      color = chart.color;
                      return assign({}, chart, { visible: visible });
                  }
                  return chart;
              });
              renderButtonIcon(button, visible, color);
              handleFilterChange(chartId, visible);
          }
      }
      render.handleFilterChange = function (_) {
          return handleFilterChange = _, render;
      };
      render.render = render;
      return render;
  }
  //# sourceMappingURL=chart-filter.js.map

  function toggleNightMode() {
      var button = event.currentTarget;
      // preventDefault();
      // noPropagation();
      if (button && !button["__ripple__"]) {
          button["__ripple__"] = createRipple(button);
          button["__ripple__"](event);
      }
      toggleClass(document.body, "night--mode");
  }
  //# sourceMappingURL=toggle-night-mode.js.map

  function start(data) {
      var width = window.innerWidth;
      var n = data.length;
      var charts = [].map(createInstantChart);
      var filters = [].map(createChartFilter);
      for (var i = 0; i < n; i++) {
          var d = data[i];
          var chartTarget = document.getElementById("chart-" + (i + 1));
          var filtersTarget = document.getElementById("chart-" + (i + 1) + "-filters");
          if (chartTarget) {
              charts[i] = createInstantChart(chartTarget)
                  .width(width)
                  .height(369)
                  .data(d)
                  .render();
          }
          if (filtersTarget) {
              filters[i] = createChartFilter(d)
                  .render(filtersTarget)
                  .handleFilterChange(handleFilterChange(i));
          }
      }
      function handleFilterChange(index) {
          return function (chatId, visible) {
              charts[index].toggleLine(chatId, visible);
              charts[index](true);
          };
      }
  }
  //# sourceMappingURL=start.js.map

  //# sourceMappingURL=index.js.map

  exports.createChartFilter = createChartFilter;
  exports.createInstantChart = createInstantChart;
  exports.start = start;
  exports.toggleNightMode = toggleNightMode;

  return exports;

}({}));
