var library =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assert.ts":
/*!***********************!*\
  !*** ./src/assert.ts ***!
  \***********************/
/*! exports provided: assert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


/***/ }),

/***/ "./src/assign.ts":
/*!***********************!*\
  !*** ./src/assign.ts ***!
  \***********************/
/*! exports provided: assign */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
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


/***/ }),

/***/ "./src/axis.ts":
/*!*********************!*\
  !*** ./src/axis.ts ***!
  \*********************/
/*! exports provided: createLeftAxis, createButtonAxis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLeftAxis", function() { return createLeftAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createButtonAxis", function() { return createButtonAxis; });
/* harmony import */ var _number_ticks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number-ticks */ "./src/number-ticks.ts");
/* harmony import */ var _scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scale */ "./src/scale.ts");
/* harmony import */ var _set_attribute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set-attribute */ "./src/set-attribute.ts");
/* harmony import */ var _general_update_pattern__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./general-update-pattern */ "./src/general-update-pattern.ts");
/* harmony import */ var _remove_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./remove-element */ "./src/remove-element.ts");
/* harmony import */ var _transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transition */ "./src/transition.ts");
/* harmony import */ var _time_ticks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./time-ticks */ "./src/time-ticks.ts");







function createLeftAxis() {
    // const enterTransition = createTransition().duration(150);
    // const exitTransition = createTransition().duration(100);
    var scale = Object(_scale__WEBPACK_IMPORTED_MODULE_1__["createScale"])([0, 1], [0, 1]);
    var y = Object(_scale__WEBPACK_IMPORTED_MODULE_1__["createScale"])([0, 1], [0, 1]);
    var ticksCount = 6;
    var pathLength = 100;
    var ticks = [];
    function render(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".tick", ticks, function (datum) { return datum + ""; });
        update.enter(function (datum) {
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            var line = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "line"));
            var text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"));
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(g, "class", "tick");
            // setAttribute(g, "fill-opacity", "0")
            // enterTransition(g, "fill-opacity", "1")
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(line, "class", "tick-line");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(line, "stroke", "#ECF0F3");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(line, "stroke-width", "1");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "y", "-5");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "class", "tick-text");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "fill", "#96A2AA");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "font-size", "9");
            text.textContent = format(datum);
            return g;
        }).merge(function (g, datum) {
            if (datum) {
                g.childNodes[1].textContent = format(datum);
            }
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(g, "transform", "translate(0," + y(datum) + ")");
        });
        update.exit(function (g, datum) {
            // const t = exitTransition(g, "fill-opacity", "0")
            // setAttribute(g, "transform", `translate(0,${y(datum)})`)
            Object(_remove_element__WEBPACK_IMPORTED_MODULE_4__["removeElement"])(g);
            // if (t) {
            //   t.on("end", () => removeElement(g))
            // }
        });
        Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".tick-line", ticks).update(function (line) {
            // setAttribute(line, "pathLength", pathLength + "")
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(line, "x2", pathLength + "");
        });
    }
    function getTicks() {
        var _a = scale.domain(), d0 = _a[0], d1 = _a[1];
        return Object(_number_ticks__WEBPACK_IMPORTED_MODULE_0__["numberTicks"])(d0, d1, ticksCount);
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
    var enterTransition = Object(_transition__WEBPACK_IMPORTED_MODULE_5__["createTransition"])().duration(150);
    var exitTransition = Object(_transition__WEBPACK_IMPORTED_MODULE_5__["createTransition"])().duration(100);
    var scale = Object(_scale__WEBPACK_IMPORTED_MODULE_1__["createScale"])([0, 1], [0, 1]);
    var timeTicks = Object(_time_ticks__WEBPACK_IMPORTED_MODULE_6__["createTimeTicks"])(scale);
    var initiallyRendered = false;
    function render(target) {
        var ticks = timeTicks.ticks(6);
        var allTicks = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".tick", ticks, function (datum) { return datum + ""; });
        allTicks.enter(function (datum) {
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            var text = g.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"));
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(g, "class", "tick");
            if (initiallyRendered) {
                Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(g, "fill-opacity", "0");
                enterTransition(g, "fill-opacity", "1");
            }
            else {
                Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(g, "fill-opacity", "1");
            }
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "x", "0");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "y", "27");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "fill", "#96A2AA");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "font-size", "9");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(text, "text-anchor", "middle");
            return g;
        }).merge(function (g, datum) {
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(g, "transform", "translate(" + scale(datum.getTime()) + ",0)");
            if (g.firstChild) {
                g.firstChild.textContent = timeTicks.tickFormat(datum);
            }
        });
        allTicks.exit(function (g, datum) {
            if (datum) {
                Object(_set_attribute__WEBPACK_IMPORTED_MODULE_2__["setAttribute"])(g, "transform", "translate(" + scale(datum.getTime()) + ",0)");
            }
            Object(_remove_element__WEBPACK_IMPORTED_MODULE_4__["removeElement"])(g);
            var t = exitTransition(g, "fill-opacity", "0");
            if (t) {
                t.on("end", function () { return Object(_remove_element__WEBPACK_IMPORTED_MODULE_4__["removeElement"])(g); });
                t.on("cancel", function () { return Object(_remove_element__WEBPACK_IMPORTED_MODULE_4__["removeElement"])(g); });
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


/***/ }),

/***/ "./src/chart-filter.ts":
/*!*****************************!*\
  !*** ./src/chart-filter.ts ***!
  \*****************************/
/*! exports provided: createChartFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createChartFilter", function() { return createChartFilter; });
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assign */ "./src/assign.ts");
/* harmony import */ var _class_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-list */ "./src/class-list.ts");
/* harmony import */ var _general_update_pattern__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general-update-pattern */ "./src/general-update-pattern.ts");
/* harmony import */ var _ripple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ripple */ "./src/ripple.ts");




function emptyHandleFilterChange(chatId, visible) { }
function createChartFilter(data) {
    var charts = extractCharts();
    var handleFilterChange = emptyHandleFilterChange;
    function render(target) {
        var allButtons = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".outline-btn", charts);
        allButtons.enter(function (datum, i) {
            var button = document.createElement("button");
            button.className = "outline-btn";
            listenClick(button, datum.id);
            Object(_ripple__WEBPACK_IMPORTED_MODULE_3__["createRipple"])(button);
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
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".check-icon", [1]);
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
                Object(_class_list__WEBPACK_IMPORTED_MODULE_1__["addClass"])(span, "check-icon--checked");
            }
            else {
                Object(_class_list__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(span, "check-icon--checked");
            }
        });
    }
    function renderButtonLabel(target, name) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".check-label", [name]);
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
                    return Object(_assign__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, chart, { visible: visible });
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


/***/ }),

/***/ "./src/class-list.ts":
/*!***************************!*\
  !*** ./src/class-list.ts ***!
  \***************************/
/*! exports provided: addClass, removeClass, toggleClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleClass", function() { return toggleClass; });
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


/***/ }),

/***/ "./src/drag.ts":
/*!*********************!*\
  !*** ./src/drag.ts ***!
  \*********************/
/*! exports provided: enableDragging, createDrag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableDragging", function() { return enableDragging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDrag", function() { return createDrag; });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/point.ts");
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assign */ "./src/assign.ts");
/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./touch */ "./src/touch.ts");
/* harmony import */ var _prevent_default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prevent-default */ "./src/prevent-default.ts");
/* harmony import */ var _no_propagation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./no-propagation */ "./src/no-propagation.ts");





function noop() { }
function disableDragging(view) {
    var root = view.document.documentElement;
    view.addEventListener("dragstart", _prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"], false);
    if ("onselectstart" in root) {
        view.addEventListener("selectstart", _prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"], false);
    }
    else {
        root["__noselect"] = root.style.MozUserSelect;
        root.style["MozUserSelect"] = "none";
    }
}
function enableDragging(view, noclick) {
    var root = view.document.documentElement;
    view.removeEventListener("dragstart", _prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"], false);
    if (noclick) {
        view.addEventListener("click", _prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"], false);
        setTimeout(function () {
            view.removeEventListener("click", _prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"], false);
        }, 0);
    }
    if ("onselectstart" in root) {
        view.removeEventListener("selectstart", _prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"], false);
    }
    else {
        root.style.MozUserSelect = root["__noselect"];
        delete root["__noselect"];
    }
}
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
    return Object(_point__WEBPACK_IMPORTED_MODULE_0__["point"])(node, event);
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
        disableDragging(event.view);
        Object(_no_propagation__WEBPACK_IMPORTED_MODULE_4__["noPropagation"])();
        mouseIsMoving = false;
        mouseDownX = event.clientX;
        mouseDownY = event.clientY;
        gesture("start");
    }
    function mouseMoved() {
        var e = event;
        Object(_prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"])();
        if (!mouseIsMoving) {
            var dx = e.clientX - mouseDownX, dy = e.clientY - mouseDownY;
            mouseIsMoving = dx * dx + dy * dy > clickDistance2;
        }
        gestures.mouse("drag");
    }
    function mouseupped() {
        event.view.removeEventListener("mousemove", mouseMoved, false);
        event.view.removeEventListener("mouseup", mouseupped, false);
        enableDragging(event.view, mouseIsMoving);
        Object(_prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"])();
        gestures.mouse("end");
    }
    function touchStarted(event) {
        var touches = event.changedTouches, c = container.apply(this, arguments), n = touches.length, i, gesture;
        for (i = 0; i < n; ++i) {
            if (gesture = beforeStart(touches[i].identifier, c, _touch__WEBPACK_IMPORTED_MODULE_2__["touch"], this, arguments)) {
                Object(_no_propagation__WEBPACK_IMPORTED_MODULE_4__["noPropagation"])();
                gesture("start");
            }
        }
    }
    function touchMoved(event) {
        var touches = event.changedTouches, n = touches.length, i, gesture;
        for (i = 0; i < n; ++i) {
            if (gesture = gestures[touches[i].identifier]) {
                Object(_prevent_default__WEBPACK_IMPORTED_MODULE_3__["preventDefault"])();
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
                Object(_no_propagation__WEBPACK_IMPORTED_MODULE_4__["noPropagation"])();
                gesture("end");
            }
        }
    }
    function beforeStart(id, container, point, that, args) {
        var p = point(container, id), s, dx, dy;
        var subListeners = Object(_assign__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, listeners);
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


/***/ }),

/***/ "./src/event-emitter.ts":
/*!******************************!*\
  !*** ./src/event-emitter.ts ***!
  \******************************/
/*! exports provided: EventEmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return EventEmitter; });
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



/***/ }),

/***/ "./src/extend.ts":
/*!***********************!*\
  !*** ./src/extend.ts ***!
  \***********************/
/*! exports provided: extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
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


/***/ }),

/***/ "./src/filter.ts":
/*!***********************!*\
  !*** ./src/filter.ts ***!
  \***********************/
/*! exports provided: filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
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
;


/***/ }),

/***/ "./src/general-update-pattern.ts":
/*!***************************************!*\
  !*** ./src/general-update-pattern.ts ***!
  \***************************************/
/*! exports provided: generalUpdatePattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generalUpdatePattern", function() { return generalUpdatePattern; });
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


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: createInstantChart, createChartFilter, toggleNightMode, start */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instant_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instant-chart */ "./src/instant-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createInstantChart", function() { return _instant_chart__WEBPACK_IMPORTED_MODULE_0__["createInstantChart"]; });

/* harmony import */ var _chart_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-filter */ "./src/chart-filter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createChartFilter", function() { return _chart_filter__WEBPACK_IMPORTED_MODULE_1__["createChartFilter"]; });

/* harmony import */ var _toggle_night_mode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toggle-night-mode */ "./src/toggle-night-mode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toggleNightMode", function() { return _toggle_night_mode__WEBPACK_IMPORTED_MODULE_2__["toggleNightMode"]; });

/* harmony import */ var _start__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start */ "./src/start.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "start", function() { return _start__WEBPACK_IMPORTED_MODULE_3__["start"]; });







/***/ }),

/***/ "./src/instant-chart.ts":
/*!******************************!*\
  !*** ./src/instant-chart.ts ***!
  \******************************/
/*! exports provided: createInstantChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInstantChart", function() { return createInstantChart; });
/* harmony import */ var _set_attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-attribute */ "./src/set-attribute.ts");
/* harmony import */ var _parse_raw_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse-raw-data */ "./src/parse-raw-data.ts");
/* harmony import */ var _axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./axis */ "./src/axis.ts");
/* harmony import */ var _overview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overview */ "./src/overview.ts");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter */ "./src/filter.ts");
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popover */ "./src/popover.ts");
/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./throttle */ "./src/throttle.ts");
/* harmony import */ var _main_lines__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./main-lines */ "./src/main-lines.ts");








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
    var renderLeftAxis = Object(_axis__WEBPACK_IMPORTED_MODULE_2__["createLeftAxis"])();
    var renderBottomAxis = Object(_axis__WEBPACK_IMPORTED_MODULE_2__["createButtonAxis"])();
    var renderMainLines = Object(_main_lines__WEBPACK_IMPORTED_MODULE_7__["createMainLines"])();
    var renderOverview = Object(_overview__WEBPACK_IMPORTED_MODULE_3__["createOverview"])().height(heightOverview).changeSelection(Object(_throttle__WEBPACK_IMPORTED_MODULE_6__["throttle"])(changeSelection, 1000 / 60));
    var renderPopover = Object(_popover__WEBPACK_IMPORTED_MODULE_5__["createPopover"])();
    var data;
    var width;
    var height;
    Object(_set_attribute__WEBPACK_IMPORTED_MODULE_0__["setAttribute"])(gLeftAxis, "transform", "translate(16,0)");
    Object(_set_attribute__WEBPACK_IMPORTED_MODULE_0__["setAttribute"])(gPopover, "transform", "translate(0,0)");
    function render() {
        renderMainLines(gBody);
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
        data = Object(_parse_raw_data__WEBPACK_IMPORTED_MODULE_1__["parseRawData"])(_);
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
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_0__["setAttribute"])(gBody, "transform", "translate(0,0)"),
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_0__["setAttribute"])(gBottomAxis, "transform", "translate(0," + (height - bottomPadding - heightOverview - bodyBottomMargin) + ")"),
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_0__["setAttribute"])(gOverview, "transform", "translate(0," + (height - bottomPadding - heightOverview) + ")"),
            render;
    };
    render.toggleLine = function (id, visible) {
        for (var i = 0; i < data.lines.length; i++) {
            if (data.lines[i].id === id) {
                data.lines[i].visible = visible;
            }
        }
        return data.linesDomain = Object(_parse_raw_data__WEBPACK_IMPORTED_MODULE_1__["extendLinesDomain"])(Object(_filter__WEBPACK_IMPORTED_MODULE_4__["filter"])(data.lines, function (line) { return line.visible === true; })),
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


/***/ }),

/***/ "./src/is-array.ts":
/*!*************************!*\
  !*** ./src/is-array.ts ***!
  \*************************/
/*! exports provided: isArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
}


/***/ }),

/***/ "./src/line.ts":
/*!*********************!*\
  !*** ./src/line.ts ***!
  \*********************/
/*! exports provided: createLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLine", function() { return createLine; });
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path */ "./src/path.ts");

function createLine() {
    var x;
    var y;
    function line(data) {
        var dataLength = data.length;
        var path = Object(_path__WEBPACK_IMPORTED_MODULE_0__["createPath"])();
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


/***/ }),

/***/ "./src/main-lines.ts":
/*!***************************!*\
  !*** ./src/main-lines.ts ***!
  \***************************/
/*! exports provided: createMainLines */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMainLines", function() { return createMainLines; });
/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./line */ "./src/line.ts");
/* harmony import */ var _scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scale */ "./src/scale.ts");
/* harmony import */ var _general_update_pattern__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general-update-pattern */ "./src/general-update-pattern.ts");
/* harmony import */ var _set_attribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./set-attribute */ "./src/set-attribute.ts");




function createMainLines() {
    var x = Object(_scale__WEBPACK_IMPORTED_MODULE_1__["createScale"])([0, 1], [0, 1]);
    var y = Object(_scale__WEBPACK_IMPORTED_MODULE_1__["createScale"])([0, 1], [0, 1]);
    // const strokeOpacityTransition = createTransition().duration(100)
    // const dTransition = createTransition().duration(150).easySetter(easySetter)
    var lines = [].map(_line__WEBPACK_IMPORTED_MODULE_0__["createLine"]);
    var data;
    function render(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".line", data.lines, function (d) { return d.id; });
        update.enter(function (datum, i) {
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_3__["setAttribute"])(path, "fill", "none");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_3__["setAttribute"])(path, "class", "line");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_3__["setAttribute"])(path, "stroke-width", "2");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_3__["setAttribute"])(path, "stroke", data.lines[i].color);
            return path;
        }).merge(function (path, datum, i) {
            // if (transition) {
            //   strokeOpacityTransition(path, "stroke-opacity", datum.visible ? "1" : "0")
            //   dTransition(path, "d", lines[i](datum.data))
            // }
            // else {
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_3__["setAttribute"])(path, "stroke-opacity", datum.visible ? "1" : "0");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_3__["setAttribute"])(path, "d", lines[i](datum.data));
            // }
        });
    }
    // function getSelectedLines() {
    //   const [x0, x1] = x.domain() as [number, number];
    //   const len = data.x.length;
    //   let i0: number = 0;
    //   let i1: number = len - 1;
    //   for (let i = 0; i < len; i++) {
    //     if (data.x[i] > x0) {
    //       break
    //     }
    //     i0 = i;
    //   }
    //   for(let i = len - 1; i >= 0; i--) {
    //     if (data.x[i] < x1) {
    //       break
    //     }
    //     i1 = i
    //   }
    //   return data.lines.map(function(line) {
    //     return assign({}, line, {
    //       data: line.data.spl
    //     })
    //   })
    // }
    // function easySetter(path0: SVGPathElement, d0, d1) {
    //   const path1 = path0.cloneNode() as SVGPathElement;
    //   const n0 = path1.getTotalLength()
    //   const n1 = (setAttribute(path1, "d", d1) as SVGPathElement).getTotalLength()
    //   // Uniform sampling of distance based on specified precision.
    //   const precision = 20;
    //   const distances = [0]
    //   const dt = precision / Math.max(n0, n1);
    //   let i = 0;
    //   while ((i += dt) < 1)
    //     distances.push(i);
    //   distances.push(1);
    //   // Compute point-interpolators at each distance.
    //   const points = distances.map(function(t) {
    //     const p0 = path0.getPointAtLength(t * n0);
    //     const p1 = path1.getPointAtLength(t * n1);
    //     return interpolate([p0.x, p0.y], [p1.x, p1.y]);
    //   });
    //   return function(t): string {
    //     if (t >= 1) {
    //       return d1
    //     }
    //     const path = createPath();
    //     let [x, y] = points[0](t);
    //     path.moveTo(x, y)
    //     for (let i = 1; i < points.length; i++) {
    //       [x, y] = points[i](t);
    //       path.lineTo(x, y)
    //     }
    //     return path()
    //   };
    // }
    // function interpolate([x0, y0], [x1, y1]): (t: number) => [number, number] {
    //   return function(t) {
    //     return [t * (x1 - x0) + x0, t * (y1 - y0) + y0]
    //   }
    // }
    render.data = function (_) {
        return data = _, lines = data.lines.map(function () { return Object(_line__WEBPACK_IMPORTED_MODULE_0__["createLine"])().x(function (d, i) { return x(data.x[i]); }).y(function (d) { return y(d); }); });
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


/***/ }),

/***/ "./src/no-propagation.ts":
/*!*******************************!*\
  !*** ./src/no-propagation.ts ***!
  \*******************************/
/*! exports provided: noPropagation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noPropagation", function() { return noPropagation; });
function noPropagation() {
    event.stopImmediatePropagation();
}


/***/ }),

/***/ "./src/number-ticks.ts":
/*!*****************************!*\
  !*** ./src/number-ticks.ts ***!
  \*****************************/
/*! exports provided: numberTicks, tickIncrement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberTicks", function() { return numberTicks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tickIncrement", function() { return tickIncrement; });
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


/***/ }),

/***/ "./src/overview.ts":
/*!*************************!*\
  !*** ./src/overview.ts ***!
  \*************************/
/*! exports provided: createOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOverview", function() { return createOverview; });
/* harmony import */ var _scale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scale */ "./src/scale.ts");
/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drag */ "./src/drag.ts");
/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./line */ "./src/line.ts");
/* harmony import */ var _general_update_pattern__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./general-update-pattern */ "./src/general-update-pattern.ts");
/* harmony import */ var _set_attribute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./set-attribute */ "./src/set-attribute.ts");
/* harmony import */ var _remove_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./remove-element */ "./src/remove-element.ts");






var CONTROL_WIDTH = 4;
var HANDLER_WIDTH = 16;
var HANDLE_EXTRA_SPACE = 5;
function createOverview() {
    var height = 38;
    var data;
    var lines = [].map(function () { return Object(_line__WEBPACK_IMPORTED_MODULE_2__["createLine"])(); });
    var x = Object(_scale__WEBPACK_IMPORTED_MODULE_0__["createScale"])([0, 1], [0, 1]);
    var y = Object(_scale__WEBPACK_IMPORTED_MODULE_0__["createScale"])([0, 1], [height, 0]);
    var selection = [0, 1];
    var changeSelection = function (_) { };
    function renderLines(target) {
        var allLines = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".line", data.lines);
        allLines.enter(function () {
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(path, "fill", "none");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(path, "class", "line");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(path, "stroke-width", "1");
            return path;
        }).merge(function (path, datum, index) {
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(path, "d", lines[index](datum.data));
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(path, "stroke", data.lines[index].color);
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(path, "stroke-opacity", data.lines[index].visible ? "1" : "0");
        });
        // remove not needed lines
        allLines.exit(function (line) { return Object(_remove_element__WEBPACK_IMPORTED_MODULE_5__["removeElement"])(line); });
    }
    function renderSelectionEdges(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".overview-control", selection);
        update.enter(function (d) {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "width", CONTROL_WIDTH + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "height", height + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "class", "overview-control");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "fill", "#C6DCEB");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "fill-opacity", "0.6");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "y", 0 + "");
            return rect;
        }).merge(function (rect, datum) {
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "x", x(datum) - (CONTROL_WIDTH / 2) + "");
        });
    }
    function renderSelectionTopBorder(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".overview-control-border", [
            [0, selection],
            [height, selection]
        ]);
        update.enter(function () {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(line, "class", "overview-control-border");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(line, "stroke", "#C6DCEB");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(line, "stroke-opacity", "0.6");
            return line;
        }).merge(function (line, datum) {
            var y = datum[0], _a = datum[1], start = _a[0], end = _a[1];
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(line, "x1", x(start) - CONTROL_WIDTH / 2 + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(line, "y1", y + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(line, "x2", x(end) + CONTROL_WIDTH / 2 + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(line, "y2", y + "");
        });
    }
    function renderOverlays(target) {
        var overviewOverlays = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".overview-overlay", selection);
        overviewOverlays.enter(function () {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "height", height + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "class", "overview-overlay");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "fill", "#F2F7FA");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "fill-opacity", "0.8");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "y", "0");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "height", height + "");
            return rect;
        }).merge(function (rect, datum, index) {
            var _a = x.range(), r0 = _a[0], r1 = _a[1];
            var rectX = index === 0 ? r0 : x(datum);
            var rectW = index === 0 ? Math.max(x(datum) - CONTROL_WIDTH / 2 - r0, 0) : (r1 - x(datum) + CONTROL_WIDTH / 2);
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "x", rectX + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "width", rectW + "");
        });
    }
    function renderSelectionCenterHandler(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".overview-center-handler", [selection]);
        update.enter(function (d, i) {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var drag = Object(_drag__WEBPACK_IMPORTED_MODULE_1__["createDrag"])();
            rect.style.cursor = "grab";
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "height", height + "");
            // setAttribute(rect, "fill-opacity", "0.4")
            // setAttribute(rect, "fill", "#DCEDC8")
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "class", "overview-center-handler");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "y", 0 - HANDLE_EXTRA_SPACE + "");
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
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "x", rectX + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "width", rectW + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "height", height + 2 * HANDLE_EXTRA_SPACE + "");
        });
    }
    function renderSelectionSideHandlers(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_3__["generalUpdatePattern"])(target, ".overview-handlers", selection);
        update.enter(function (d, i) {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var drag = Object(_drag__WEBPACK_IMPORTED_MODULE_1__["createDrag"])();
            rect.style.cursor = "ew-resize";
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "width", HANDLER_WIDTH + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "height", height + 2 * HANDLE_EXTRA_SPACE + "");
            // setAttribute(rect, "fill-opacity", "0.6")
            // setAttribute(rect, "fill", "#ccc")
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "class", "overview-handlers");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "y", 0 - HANDLE_EXTRA_SPACE + "");
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
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_4__["setAttribute"])(rect, "x", x(datum) - (HANDLER_WIDTH / 2) + "");
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
    render.height = function (_) {
        return height = _, render;
    };
    render.changeSelection = function (_) {
        return changeSelection = _, render;
    };
    render.selection = function (_) {
        return selection = _, render;
    };
    render.data = function (_) {
        data = _;
        lines = data.lines.map(function () { return Object(_line__WEBPACK_IMPORTED_MODULE_2__["createLine"])()
            .x(function (d, i) { return x(data.x[i]); })
            .y(function (d) { return y(d); }); });
        x.domain(data.xDomain);
        y.domain(data.linesDomain);
        return render;
    };
    return render;
}


/***/ }),

/***/ "./src/parse-raw-data.ts":
/*!*******************************!*\
  !*** ./src/parse-raw-data.ts ***!
  \*******************************/
/*! exports provided: parseRawData, extendLinesDomain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRawData", function() { return parseRawData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendLinesDomain", function() { return extendLinesDomain; });
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert */ "./src/assert.ts");
/* harmony import */ var _is_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-array */ "./src/is-array.ts");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extend */ "./src/extend.ts");



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
        Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(Object(_is_array__WEBPACK_IMPORTED_MODULE_1__["isArray"])(column), "parsing error: column with index " + i + " should be an array");
        Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(column.length > 2, "parsing error: column should have more that 2 points");
        Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(column[0] != null, "parsing error: column with index " + i + " has empty column id");
        var chartId = column[0];
        var chartType = types[chartId];
        var data_1 = column.slice(1);
        if (chartType === "line") {
            chart.lines.push({
                id: chartId,
                name: names[chartId],
                color: colors[chartId],
                domain: Object(_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(data_1),
                data: data_1,
                visible: true
            });
        }
        if (chartType === "x") {
            chart.x = column.slice(1);
            chart.xDomain = Object(_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(chart.x);
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
    return Object(_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(visibleLines);
}


/***/ }),

/***/ "./src/path.ts":
/*!*********************!*\
  !*** ./src/path.ts ***!
  \*********************/
/*! exports provided: createPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return createPath; });
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


/***/ }),

/***/ "./src/point.ts":
/*!**********************!*\
  !*** ./src/point.ts ***!
  \**********************/
/*! exports provided: point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "point", function() { return point; });
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


/***/ }),

/***/ "./src/popover.ts":
/*!************************!*\
  !*** ./src/popover.ts ***!
  \************************/
/*! exports provided: createPopover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopover", function() { return createPopover; });
/* harmony import */ var _scale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scale */ "./src/scale.ts");
/* harmony import */ var _set_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set-attribute */ "./src/set-attribute.ts");
/* harmony import */ var _general_update_pattern__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general-update-pattern */ "./src/general-update-pattern.ts");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./point */ "./src/point.ts");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./time */ "./src/time.ts");
/* harmony import */ var _remove_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./remove-element */ "./src/remove-element.ts");
/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./touch */ "./src/touch.ts");







function createPopover() {
    var x = Object(_scale__WEBPACK_IMPORTED_MODULE_0__["createScale"])([0, 1], [0, 1]);
    var y = Object(_scale__WEBPACK_IMPORTED_MODULE_0__["createScale"])([0, 1], [0, 1]);
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
            var p = Object(_point__WEBPACK_IMPORTED_MODULE_3__["point"])(rect, event);
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
            var p = Object(_touch__WEBPACK_IMPORTED_MODULE_6__["touch"])(rect, touches[0].identifier);
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
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".popover-placeholder", [1]);
        update.enter(function () {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(rect, "class", "popover-placeholder");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(rect, "fill", "transparent");
            listen(target, rect);
            return rect;
        })
            .merge(function (rect) {
            var _a = x.range(), x0 = _a[0], x1 = _a[1];
            var _b = y.range(), x2 = _b[0], x3 = _b[1];
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(rect, "x", x0 + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(rect, "y", x3 + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(rect, "width", x1 - x0 + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(rect, "height", x2 - x3 + "");
        });
    }
    function renderLine(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".popover-line", [1]);
        update.enter(function () {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "class", "popover-line");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "stroke", "#ECF0F3");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "stroke-width", "1");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "pointer-events", "none");
            return line;
        })
            .merge(function (line) {
            var lx = lineX != null ? x(lineX) : x.range()[0];
            var _a = y.range(), r0 = _a[0], r1 = _a[1];
            var opacity = lineIsVisible ? "1" : "0";
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "x1", lx + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "y1", r0 + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "x2", lx + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "y2", r1 + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(line, "stroke-opacity", opacity);
        });
    }
    function renderCircles(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".popover-circle", data.lines);
        update.enter(function (datum) {
            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "class", "popover-circle");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "r", "3");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "fill", "#ffffff");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "stroke", datum.color);
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "stroke-width", "2");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "pointer-events", "none");
            return circle;
        })
            .merge(function (circle, datum) {
            var cx = lineX != null ? x(lineX) : x.range()[0];
            var xy = lineXIndex != null ? y(datum.data[lineXIndex]) : y.range()[0];
            var opacity = (lineIsVisible && datum.visible) ? "1" : "0";
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "cx", cx + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "cy", xy + "");
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "fill-opacity", opacity);
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(circle, "stroke-opacity", opacity);
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
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".popover-heading", [1]);
        update.enter(function () {
            var div = document.createElement("div");
            div.className = "popover-heading";
            return div;
        })
            .merge(function (div) {
            if (lineIsVisible && data.x[lineXIndex]) {
                div.textContent = Object(_time__WEBPACK_IMPORTED_MODULE_4__["longDate"])(data.x[lineXIndex]);
            }
        });
    }
    function renderPopoverList(target) {
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".popover-list", [1]);
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
        var update = Object(_general_update_pattern__WEBPACK_IMPORTED_MODULE_2__["generalUpdatePattern"])(target, ".popover-list-item", data.lines);
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
        update.exit(function (div) { return Object(_remove_element__WEBPACK_IMPORTED_MODULE_5__["removeElement"])(div); });
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


/***/ }),

/***/ "./src/prevent-default.ts":
/*!********************************!*\
  !*** ./src/prevent-default.ts ***!
  \********************************/
/*! exports provided: preventDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preventDefault", function() { return preventDefault; });
function preventDefault() {
    event.preventDefault();
    event.stopImmediatePropagation();
}


/***/ }),

/***/ "./src/remove-element.ts":
/*!*******************************!*\
  !*** ./src/remove-element.ts ***!
  \*******************************/
/*! exports provided: removeElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeElement", function() { return removeElement; });
function removeElement(el) {
    return el.parentNode ? el.parentNode.removeChild(el) : null;
}


/***/ }),

/***/ "./src/ripple.ts":
/*!***********************!*\
  !*** ./src/ripple.ts ***!
  \***********************/
/*! exports provided: createRipple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRipple", function() { return createRipple; });
/* harmony import */ var _class_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-list */ "./src/class-list.ts");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ "./src/point.ts");


function createRipple(button) {
    button.addEventListener("click", animate, false);
    function animate(e) {
        var ripple = button.querySelector(".ripple");
        if (!ripple) {
            ripple = button.insertBefore(Object(_class_list__WEBPACK_IMPORTED_MODULE_0__["addClass"])(document.createElement("span"), "ripple"), button.firstChild);
        }
        Object(_class_list__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(ripple, "animate");
        var d = Math.max(button.offsetHeight, button.offsetWidth);
        var _a = Object(_point__WEBPACK_IMPORTED_MODULE_1__["point"])(button, event), x = _a[0], y = _a[1];
        ripple.style.top = y - d / 2 + "px";
        ripple.style.left = x - d / 2 + "px";
        ripple.style.height = d + "px";
        ripple.style.width = d + "px";
        button.style.overflow = "hidden";
        Object(_class_list__WEBPACK_IMPORTED_MODULE_0__["addClass"])(ripple, "animate");
    }
    return animate;
}


/***/ }),

/***/ "./src/scale.ts":
/*!**********************!*\
  !*** ./src/scale.ts ***!
  \**********************/
/*! exports provided: createScale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScale", function() { return createScale; });
function createScale(domain, range) {
    var d0 = domain[0], d1 = domain[1];
    var r0 = range[0], r1 = range[1];
    function scale(x) {
        var percent = (x - d0) / (d1 - d0);
        return percent * (r1 - r0) + r0;
    }
    scale.invert = function (x) {
        var percent = (x - r0) / (r1 - r0);
        return percent * (d1 - d0) + d0;
    };
    scale.domain = function (_) {
        return _ ? (d0 = _[0], d1 = _[1], _, scale) : [d0, d1];
    };
    scale.range = function (_) {
        return _ ? (r0 = _[0], r1 = _[1], _, scale) : [r0, r1];
    };
    return scale;
}


/***/ }),

/***/ "./src/set-attribute.ts":
/*!******************************!*\
  !*** ./src/set-attribute.ts ***!
  \******************************/
/*! exports provided: setAttribute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttribute", function() { return setAttribute; });
function setAttribute(element, attribute, value) {
    return element.setAttribute(attribute, value), element;
}


/***/ }),

/***/ "./src/start.ts":
/*!**********************!*\
  !*** ./src/start.ts ***!
  \**********************/
/*! exports provided: start */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony import */ var _instant_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instant-chart */ "./src/instant-chart.ts");
/* harmony import */ var _chart_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-filter */ "./src/chart-filter.ts");


function start(data) {
    var width = window.innerWidth;
    var n = data.length;
    var charts = [].map(_instant_chart__WEBPACK_IMPORTED_MODULE_0__["createInstantChart"]);
    var filters = [].map(_chart_filter__WEBPACK_IMPORTED_MODULE_1__["createChartFilter"]);
    for (var i = 0; i < n; i++) {
        var d = data[i];
        var chartTarget = document.getElementById("chart-" + (i + 1));
        var filtersTarget = document.getElementById("chart-" + (i + 1) + "-filters");
        if (chartTarget) {
            charts[i] = Object(_instant_chart__WEBPACK_IMPORTED_MODULE_0__["createInstantChart"])(chartTarget)
                .width(width)
                .height(369)
                .data(d)
                .render();
        }
        if (filtersTarget) {
            filters[i] = Object(_chart_filter__WEBPACK_IMPORTED_MODULE_1__["createChartFilter"])(d)
                .render(filtersTarget)
                .handleFilterChange(handleFilterChange(i));
        }
    }
    function handleFilterChange(index) {
        return function (chatId, visible) {
            charts[index].toggleLine(chatId, visible);
            charts[index]();
        };
    }
}


/***/ }),

/***/ "./src/throttle.ts":
/*!*************************!*\
  !*** ./src/throttle.ts ***!
  \*************************/
/*! exports provided: throttle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
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


/***/ }),

/***/ "./src/time-ticks.ts":
/*!***************************!*\
  !*** ./src/time-ticks.ts ***!
  \***************************/
/*! exports provided: createTimeTicks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTimeTicks", function() { return createTimeTicks; });
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time */ "./src/time.ts");

var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
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
    if (error >= e10)
        step1 *= 10;
    else if (error >= e5)
        step1 *= 5;
    else if (error >= e2)
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
        return (second(date) < date ? _time__WEBPACK_IMPORTED_MODULE_0__["formatMillisecond"]
            : minute(date) < date ? _time__WEBPACK_IMPORTED_MODULE_0__["formatSecond"]
                : hour(date) < date ? _time__WEBPACK_IMPORTED_MODULE_0__["formatMinute"]
                    : day(date) < date ? _time__WEBPACK_IMPORTED_MODULE_0__["formatHour"]
                        : month(date) < date ? (week(date) < date ? _time__WEBPACK_IMPORTED_MODULE_0__["formatDay"] : _time__WEBPACK_IMPORTED_MODULE_0__["formatWeek"])
                            : year(date) < date ? _time__WEBPACK_IMPORTED_MODULE_0__["formatMonth"]
                                : _time__WEBPACK_IMPORTED_MODULE_0__["formatYear"])(date);
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


/***/ }),

/***/ "./src/time.ts":
/*!*********************!*\
  !*** ./src/time.ts ***!
  \*********************/
/*! exports provided: formatYear, formatWeek, formatMonth, formatDate, formatMillisecond, formatSecond, formatMinute, formatHour, formatDay, longDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatYear", function() { return formatYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatWeek", function() { return formatWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatMonth", function() { return formatMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatMillisecond", function() { return formatMillisecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatSecond", function() { return formatSecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatMinute", function() { return formatMinute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatHour", function() { return formatHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDay", function() { return formatDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "longDate", function() { return longDate; });
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
function formatDate(milliseconds) {
    var date = new Date(milliseconds);
    var month = date.getMonth();
    return MONTHS[month] + " " + date.getDate();
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


/***/ }),

/***/ "./src/toggle-night-mode.ts":
/*!**********************************!*\
  !*** ./src/toggle-night-mode.ts ***!
  \**********************************/
/*! exports provided: toggleNightMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleNightMode", function() { return toggleNightMode; });
/* harmony import */ var _class_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-list */ "./src/class-list.ts");
/* harmony import */ var _ripple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ripple */ "./src/ripple.ts");


function toggleNightMode() {
    var button = event.currentTarget;
    // preventDefault();
    // noPropagation();
    if (button && !button["__ripple__"]) {
        button["__ripple__"] = Object(_ripple__WEBPACK_IMPORTED_MODULE_1__["createRipple"])(button);
        button["__ripple__"](event);
    }
    Object(_class_list__WEBPACK_IMPORTED_MODULE_0__["toggleClass"])(document.body, "night--mode");
}


/***/ }),

/***/ "./src/touch.ts":
/*!**********************!*\
  !*** ./src/touch.ts ***!
  \**********************/
/*! exports provided: touch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return touch; });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/point.ts");

function touch(node, touches, identifier) {
    if (identifier === void 0) { identifier = null; }
    var e = event;
    if (arguments.length < 3)
        identifier = touches, touches = e.changedTouches;
    for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
        if ((touch = touches[i]).identifier === identifier) {
            return Object(_point__WEBPACK_IMPORTED_MODULE_0__["point"])(node, touch);
        }
    }
    return null;
}


/***/ }),

/***/ "./src/transition.ts":
/*!***************************!*\
  !*** ./src/transition.ts ***!
  \***************************/
/*! exports provided: createTransition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTransition", function() { return createTransition; });
/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-emitter */ "./src/event-emitter.ts");
/* harmony import */ var _set_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set-attribute */ "./src/set-attribute.ts");


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
        var emitter = new _event_emitter__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
            Object(_set_attribute__WEBPACK_IMPORTED_MODULE_1__["setAttribute"])(element, property, tickValue + "");
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
function now() {
    return performance.now();
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


/***/ })

/******/ });