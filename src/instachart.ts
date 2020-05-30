
namespace instachart {
  interface ChartRect {
    top: number
    left: number
    width: number
    height: number
  }

  enum DRAG_MODE {
    NONE,
    DRAG_LEFT,
    DRAG_RIGHT,
    DRAG_CENTER
  }

  const MAIN_PADDING_BOTTOM = 35
  const OVERVIEW_HEIGHT = 40
  const HORIZONTAL_PADDING = 14
  const ANIMATION_DURATION = 200
  const ANIMATION_DELAY = Math.round(ANIMATION_DURATION / 2)
  const H_AXIS_LINES_AMOUNT = 6
  const V_AXIS_LINES_AMOUNT = 6
  const DRAG_CONTROL_WIDTH = 12;
  const DRAG_CONTROL_WHITE_LINE_HEIGHT = 12;
  const IS_TOUCH_DEVICE = 'ontouchstart' in window;

  export function create(container: HTMLDivElement, options: Options) {
    const data = parseData(options.data)
    const min = 0
    const size = parseSize(container)
    const header = document.createElement("div")
    const body = document.createElement("div")
    const footer = document.createElement("div")
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const selected = { start: 0.5, end: 1 }
    const mainRect = getMainRect()
    const overviewRect = getOverviewRect()
    const alphaAnimations = createAlphaAnimations()
    const maxValue = getMaxVisibleValue()
    const axisAnimations = createHorizontalAxisAnimations(maxValue)
    const maxValueAnimation = createAnimation(maxValue, ANIMATION_DURATION)
    const maxSelectedValueAnimation = createAnimation(getMaxSelectedValue(), ANIMATION_DURATION)
    const labelAnimations = createLabelAnimations()
    let time: number;
    let animationRequestId: number;
    let needRenderMain = true;
    let needRenderOverview = true
    let dragMode = DRAG_MODE.NONE;

    if (!context) {
      throw new Error("Failed to create canvas context");
    }

    function createAlphaAnimations() {
      return data.datasets.map(function () {
        return createAnimation(1, ANIMATION_DURATION)
      })
    }

    function createHorizontalAxisAnimations(maxValue: number) {
      return {
        old: {
          delta: 0,
          alpha: createAnimation(0, ANIMATION_DURATION)
        },
        new: {
          delta: Math.ceil(maxValue / H_AXIS_LINES_AMOUNT),
          alpha: createAnimation(1, ANIMATION_DURATION)
        }
      }
    }

    function createLabelAnimations() {
      return {
        old: {
          delta: 0,
          alpha: createAnimation(0, ANIMATION_DURATION * 10)
        },
        new: {
          delta: getLabelsDelta(),
          alpha: createAnimation(1, ANIMATION_DURATION * 10)
        }
      }
    }

    function toggleLine(event: MouseEvent) {
      const target = event && event.target as HTMLButtonElement | null;

      if (!target || !target.dataset) {
        return
      }

      const datasetIndex = Number(target.dataset["dataset_index"])

      if (isNaN(datasetIndex)) {
        return
      }

      const alphaAnimation = alphaAnimations[datasetIndex]

      if (!alphaAnimation) {
        return
      }

      play(alphaAnimation, 1 - alphaAnimation.toValue, time)
      alphaAnimation.delay = alphaAnimation.toValue === 1 ? ANIMATION_DELAY : 0

      const maxValue = getMaxVisibleValue()
      const maxSelectedValue = getMaxSelectedValue()

      play(maxValueAnimation, maxValue, time)
      play(maxSelectedValueAnimation, maxSelectedValue, time)

      axisAnimations.old.delta = axisAnimations.new.delta
      axisAnimations.old.alpha.value = axisAnimations.old.alpha.fromValue = 1
      play(axisAnimations.old.alpha, 0, time)

      axisAnimations.new.delta = Math.ceil(maxValue / H_AXIS_LINES_AMOUNT)
      axisAnimations.new.alpha.value = axisAnimations.new.alpha.fromValue = 0
      play(axisAnimations.new.alpha, 1, time)
    }

    function appendControls() {
      for (let i = 0; i < data.datasets.length; i++) {
        const dataset = data.datasets[i];
        const button = document.createElement("button")


        button.style.backgroundColor = dataset.color
        button.style.border = "none"
        button.style.borderRadius = "18px"
        button.style.height = "36px"
        button.style.padding = "4px 14px"
        button.style.color = "#fff"

        button.innerText = dataset.name;
        button.addEventListener("click", toggleLine, false)
        button.dataset["dataset_index"] = String(i);

        footer.appendChild(button)
      }
    }

    function appendElements() {
      container.appendChild(header)
      container.appendChild(body)
      container.appendChild(footer)
      body.appendChild(canvas);
    }

    function render(now = Date.now()) {
      time = now;

      for (let i = 0; i < alphaAnimations.length; i++) {
        const alphaAnimation = alphaAnimations[i];

        if (updateAnimation(alphaAnimation, time)) {
          needRenderMain = true
          needRenderOverview = true
        }
      }

      if (updateAnimation(maxValueAnimation, time)) {
        needRenderOverview = true
      }

      if (updateAnimation(maxSelectedValueAnimation, time)) {
        needRenderMain = true
      }

      if (updateAnimation(axisAnimations.old.alpha, time)) {
        needRenderMain = true
      }

      if (updateAnimation(axisAnimations.new.alpha, time)) {
        needRenderMain = true
      }

      if (updateAnimation(labelAnimations.new.alpha, time)) {
        needRenderMain = true
      }
      
      if (updateAnimation(labelAnimations.old.alpha, time)) {
        needRenderMain = true
      }

      if (needRenderMain) {
        renderMainLines()
        needRenderMain = false
      }

      if (needRenderOverview) {
        renderOverviewLines(), needRenderOverview = false
      }

      animationRequestId = requestAnimationFrame(render)
    }

    function renderMainLines() {
      context.clearRect(mainRect.left, mainRect.top, mainRect.width, mainRect.height)

      // render horizontal axis lines (disappearing)
      if (axisAnimations.old.alpha.value !== 0) {
        renderHorizontalAxisLines(axisAnimations.old.delta, axisAnimations.old.alpha.value)
      }

      // render horizontal axis lines (appearing)
      if (axisAnimations.new.alpha.value !== 0) {
        renderHorizontalAxisLines(axisAnimations.new.delta, axisAnimations.new.alpha.value)
      }

      // render vertical axis lines
      renderVerticalAxisLines()

      // lines
      for (let i = 0; i < data.datasets.length; i++) {
        const dataset = data.datasets[i]
        const animation = alphaAnimations[i]

        if (animation.value === 0) {
          continue;
        }

        const { end, start, startIndex, endIndex } = getSelectedIndexes(dataset.data)

        const scaleX = (index: number) => {
          return HORIZONTAL_PADDING + (mainRect.width - 2 * HORIZONTAL_PADDING) / (end - start) * (index - start)
        }

        const scaleY = (d: number) => {
          return mainRect.top + (mainRect.height - MAIN_PADDING_BOTTOM) * (1 - (d - min) / (maxSelectedValueAnimation.value - min))
        }

        context.globalAlpha = animation.value;
        context.strokeStyle = dataset.color
        context.lineWidth = 2
        context.lineJoin = "round"

        context.beginPath()
        context.moveTo(scaleX(startIndex), scaleY(dataset.data[startIndex]))

        for (let j = startIndex + 1; j <= endIndex; j++) {
          context.lineTo(scaleX(j), scaleY(dataset.data[j]))
        }

        context.stroke()
      }
    }

    function getSelectedIndexes(data: any[]) {
      const start = (data.length - 1) * selected.start
      const end = (data.length - 1) * selected.end
      const indexOffset = Math.ceil(HORIZONTAL_PADDING / ((mainRect.width - 2 * HORIZONTAL_PADDING) / (end - start)))
      const startIndex = Math.max(0, Math.ceil(start - indexOffset))
      const endIndex = Math.min(data.length - 1, Math.floor(end + indexOffset))

      return { end, start, startIndex, endIndex }
    }

    function renderHorizontalAxisLines(delta: number, alpha: number) {
      context.globalAlpha = alpha
      context.strokeStyle = "#E7E9EB"
      context.lineWidth = 1

      const mainScaleY = (d: number) => {
        return mainRect.top + (mainRect.height - MAIN_PADDING_BOTTOM) * (1 - (d - min) / (maxSelectedValueAnimation.value - min))
      }

      for (let i = 0; i < H_AXIS_LINES_AMOUNT; i++) {
        const y = mainScaleY(delta * i)

        context.beginPath()
        context.moveTo(HORIZONTAL_PADDING, y)
        context.lineTo(mainRect.width - HORIZONTAL_PADDING, y)
        context.stroke()
      }
    }

    function renderVerticalAxisLines() {
      const tailIndex = data.labels.length - 1
      const start = tailIndex * selected.start
      const end = tailIndex * selected.end
      // const delta = Math.ceil(tailIndex * (selected.end - selected.start) / V_AXIS_LINES_AMOUNT)

      // if (delta === 0) {
      //   return;
      // }

      // reset animations

      if (labelAnimations.new.delta === 0 || labelAnimations.old.delta === 0) return

      setStyles(labelAnimations.new.alpha.value)
      renderLabels(labelAnimations.new.delta)

      if (labelAnimations.old.alpha.value > 0) {
        setStyles(labelAnimations.old.alpha.value)
        renderLabels(labelAnimations.old.delta)
      }

      function setStyles(alpha: number) {
        context.globalAlpha = alpha
        context.strokeStyle = "#E7E9EB"
        context.fillStyle = "#E7E9EB"
        context.lineWidth = 1
        context.textAlign = "center"
        context.font = "12px sans-serif"
      }

      function scaleX(index: number) {
        return HORIZONTAL_PADDING + (mainRect.width - 2 * HORIZONTAL_PADDING) / (end - start) * (index - start)
      }

      function renderLabels(delta: number) {
        for (let i = start; i <= end; i += delta) {
          const roundIndex = Math.round(i / delta) * delta
          const x = scaleX(roundIndex)
          const endY = mainRect.height - MAIN_PADDING_BOTTOM
          const label = data.labels[roundIndex]

          if (label == null) continue

          context.fillText(formatDate(label), x, endY + 18)
        }
      }
    }

    function renderOverviewLines() {
      context.clearRect(overviewRect.left, overviewRect.top, overviewRect.width, overviewRect.height)

      // render lines
      for (let i = 0; i < data.datasets.length; i++) {
        if (alphaAnimations[i].value === 0) {
          continue
        }

        const dataset = data.datasets[i];
        const maxValue = alphaAnimations[i].toValue === 0 ? maxValueAnimation.fromValue : maxValueAnimation.value;
        const scaleX = (d: number) => HORIZONTAL_PADDING + (overviewRect.width - 2 * HORIZONTAL_PADDING) * d / (data.labels.length - 1)
        const scaleY = (d: number) => overviewRect.top + overviewRect.height * (1 - d / maxValue)

        context.globalAlpha = alphaAnimations[i].value;
        context.strokeStyle = dataset.color
        context.lineWidth = 1
        context.lineJoin = "round"
        context.beginPath()
        context.moveTo(scaleX(0), scaleY(dataset.data[0]))

        for (let j = 1; j < dataset.data.length; j++) {
          context.lineTo(scaleX(j), scaleY(dataset.data[j]))
        }

        context.stroke()
      }

      // render selected area
      const OVERVIEW_WIDTH = (overviewRect.width - 2 * HORIZONTAL_PADDING)
      const LEFT_WIDTH = OVERVIEW_WIDTH * selected.start
      const RIGHT_WIDTH = OVERVIEW_WIDTH * (1 - selected.end)

      renderSelectedAreas();

      // render selected rect
      renderSelectedRect();

      // render drag controls
      setDragControlsStyles()
      renderLeftDragControl()
      renderRightDragControl()
    }

    function renderSelectedAreas() {
      context.globalAlpha = 0.4
      context.fillStyle = "#C0D1E1"

      const leftAreaStartX = overviewRect.left + HORIZONTAL_PADDING
      const leftAreaStartY = overviewRect.top
      const leftAreaW = (overviewRect.width - 2 * HORIZONTAL_PADDING) * selected.start + DRAG_CONTROL_WIDTH
      const leftAreaH = overviewRect.height

      const rightAreaStartX = overviewRect.width - HORIZONTAL_PADDING
      const rightAreaStartY = overviewRect.top
      const rightAreaW = (overviewRect.width - 2 * HORIZONTAL_PADDING) * (1 - selected.end) + DRAG_CONTROL_WIDTH
      const rightAreaH = overviewRect.height

      // render left selected rectangle
      context.fillRect(leftAreaStartX, leftAreaStartY, leftAreaW, leftAreaH)

      // render right selected rectangle
      context.fillRect(rightAreaStartX, rightAreaStartY, -rightAreaW, rightAreaH)
    }

    function renderSelectedRect() {
      const startX = scaleSelectedX(selected.start) + DRAG_CONTROL_WIDTH
      const endX = scaleSelectedX(selected.end) - DRAG_CONTROL_WIDTH
      const topY = overviewRect.top
      const bottomY = overviewRect.top + overviewRect.height

      context.lineWidth = 1
      context.globalAlpha = 1
      context.strokeStyle = "#C0D1E1"
      context.beginPath()

      // render top line
      context.moveTo(startX, topY)
      context.lineTo(endX, topY)

      // render bottom line
      context.moveTo(startX, bottomY)
      context.lineTo(endX, bottomY)

      context.stroke()
    }

    function isPointInCenterDragControl(x: number, y: number) {
      if (y < overviewRect.top || y > (overviewRect.top + overviewRect.height)) {
        return false
      }

      const startX = scaleSelectedX(selected.start);
      const endX = scaleSelectedX(selected.end);

      if (x < (startX + DRAG_CONTROL_WIDTH) || x > (endX - DRAG_CONTROL_WIDTH)) {
        return false
      }

      return true
    }

    function setDragControlsStyles() {
      context.globalAlpha = 1;
      context.fillStyle = "#C0D1E1";
      context.strokeStyle = "#C0D1E1";
      context.lineWidth = 1;
    }

    function renderLeftDragControl() {
      const x = scaleSelectedX(selected.start)

      context.beginPath();
      context.moveTo(x + DRAG_CONTROL_WIDTH, overviewRect.top);
      context.lineTo(x + DRAG_CONTROL_WIDTH, overviewRect.top + overviewRect.height);
      context.arc(x + DRAG_CONTROL_WIDTH, overviewRect.top + overviewRect.height - DRAG_CONTROL_WIDTH, DRAG_CONTROL_WIDTH, 0.5 * Math.PI, Math.PI);
      context.lineTo(x, overviewRect.top + DRAG_CONTROL_WIDTH);
      context.arc(x + DRAG_CONTROL_WIDTH, overviewRect.top + DRAG_CONTROL_WIDTH, DRAG_CONTROL_WIDTH, Math.PI, 1.5 * Math.PI);
      context.fill();

      // set style for white line on drag control
      context.lineWidth = 3
      context.lineCap = "round"
      context.strokeStyle = "#FFF"

      // render while line on drag control
      context.beginPath()
      context.moveTo(x + DRAG_CONTROL_WIDTH / 2, overviewRect.top + overviewRect.height / 2 - DRAG_CONTROL_WHITE_LINE_HEIGHT / 2)
      context.lineTo(x + DRAG_CONTROL_WIDTH / 2, overviewRect.top + overviewRect.height / 2 + DRAG_CONTROL_WHITE_LINE_HEIGHT / 2)
      context.stroke()
    }

    function isPointInLeftDragControl(x: number, y: number): boolean {
      const currentX = scaleSelectedX(selected.start)

      if (y < overviewRect.top || y > overviewRect.top + overviewRect.height) {
        return false
      }

      if (x < currentX || x > (currentX + DRAG_CONTROL_WIDTH)) {
        return false
      }

      return true
    }

    function renderRightDragControl() {
      const startX = scaleSelectedX(selected.end)

      context.beginPath();
      context.moveTo(startX, overviewRect.top + DRAG_CONTROL_WIDTH);
      context.lineTo(startX, overviewRect.top + overviewRect.height - DRAG_CONTROL_WIDTH);
      context.arc(startX - DRAG_CONTROL_WIDTH, overviewRect.top + overviewRect.height - DRAG_CONTROL_WIDTH, DRAG_CONTROL_WIDTH, 0, 0.5 * Math.PI);
      context.lineTo(startX - DRAG_CONTROL_WIDTH, overviewRect.top);
      context.arc(startX - DRAG_CONTROL_WIDTH, overviewRect.top + DRAG_CONTROL_WIDTH, DRAG_CONTROL_WIDTH, 1.5 * Math.PI, 0);
      context.fill()

      // set style for white line on drag control
      context.lineWidth = 3
      context.lineCap = "round"
      context.strokeStyle = "#FFF"

      // render while line on drag control
      context.beginPath()
      context.moveTo(startX - DRAG_CONTROL_WIDTH / 2, overviewRect.top + overviewRect.height / 2 - DRAG_CONTROL_WHITE_LINE_HEIGHT / 2)
      context.lineTo(startX - DRAG_CONTROL_WIDTH / 2, overviewRect.top + overviewRect.height / 2 + DRAG_CONTROL_WHITE_LINE_HEIGHT / 2)
      context.stroke()
    }

    function isPointInRightDragControl(x: number, y: number): boolean {
      const currentX = scaleSelectedX(selected.end)

      if (y < overviewRect.top || y > overviewRect.top + overviewRect.height) {
        return false
      }

      if (x < (currentX - DRAG_CONTROL_WIDTH) || x > currentX) {
        return false
      }

      return true
    }

    function getMainRect(): ChartRect {
      return {
        top: 0,
        left: 0,
        width: size.width,
        height: size.height - OVERVIEW_HEIGHT,
      }
    }

    function getOverviewRect(): ChartRect {
      return {
        top: size.height - OVERVIEW_HEIGHT,
        left: 0,
        width: size.width,
        height: OVERVIEW_HEIGHT
      }
    }

    function isDatasetVisible(datasetIndex: number) {
      return alphaAnimations[datasetIndex].toValue === 1
    }

    function getMaxVisibleValue() {
      const maxValues: number[] = []

      for (let i = 0; i < data.datasets.length; i++) {
        if (!isDatasetVisible(i)) {
          continue
        }

        maxValues.push(data.datasets[i].max)
      }

      return Math.max(...maxValues)
    }

    function getMaxSelectedValue() {
      const maxValues: number[] = []

      for (let i = 0; i < data.datasets.length; i++) {
        if (!isDatasetVisible(i)) {
          continue
        }

        const dataset = data.datasets[i]
        const maxIndex = dataset.data.length - 1
        const start = maxIndex * selected.start
        const end = maxIndex * selected.end
        const indexOffset = Math.ceil(HORIZONTAL_PADDING / ((mainRect.width - 2 * HORIZONTAL_PADDING) / (end - start)))
        const startIndex = Math.max(0, Math.ceil(start - indexOffset))
        const endIndex = Math.min(maxIndex, Math.floor(end + indexOffset))

        maxValues.push(Math.max(...dataset.data.slice(startIndex, endIndex)))
      }

      return Math.max(...maxValues)
    }

    function scaleSelectedX(selected: number): number {
      return HORIZONTAL_PADDING + (overviewRect.width - 2 * HORIZONTAL_PADDING) * selected;
    }

    function invertSelectedX(x: number): number {
      const selected = (x - HORIZONTAL_PADDING) / (overviewRect.width - 2 * HORIZONTAL_PADDING)

      return Math.min(Math.max(selected, 0), 1)
    }

    function handleMouseDown(event: MouseEvent) {
      return handleDragStart(event, event.clientX, event.clientY)
    }

    function handleTouchStart(event: TouchEvent) {
      const touch = event.touches.item(0)

      if (!touch) {
        return
      }

      return handleDragStart(event, touch.clientX, touch.clientY)
    }

    function handleDragStart(event: MouseEvent | TouchEvent, clientX: number, clientY: number) {
      const rect = canvas.getBoundingClientRect()
      const offsetX = clientX - rect.left
      const offsetY = clientY - rect.top
      const MIN_SELECTED = 0.15
      let x: number
      let d: number

      if (isPointInLeftDragControl(offsetX, offsetY)) {
        x = scaleSelectedX(selected.start)
        d = clientX - x
        dragMode = DRAG_MODE.DRAG_LEFT
      }
      else if (isPointInRightDragControl(offsetX, offsetY)) {
        x = scaleSelectedX(selected.end)
        d = clientX - x
        dragMode = DRAG_MODE.DRAG_RIGHT
      }
      else if (isPointInCenterDragControl(offsetX, offsetY)) {
        x = scaleSelectedX(selected.start)
        d = clientX - x
        dragMode = DRAG_MODE.DRAG_CENTER
      }
      else {
        return
      }

      event.preventDefault()

      if (IS_TOUCH_DEVICE) {
        document.addEventListener("touchmove", onTouchMove, { passive: false })
        document.addEventListener("touchcancel", onEnd, false)
        document.addEventListener("touchend", onEnd, false)
      }
      else {
        document.addEventListener("mousemove", onMouseMove, false)
        document.addEventListener("mouseup", onEnd, false)
      }

      function onMouseMove(event: MouseEvent) {
        return onMove(event, event.clientX, clientY)
      }

      function onTouchMove(event: TouchEvent) {
        const touch = event.touches.item(0)

        if (touch) {
          return onMove(event, touch.clientX, touch.clientY)
        }
      }

      function onMove(event: MouseEvent | TouchEvent, clientX: number, clientY: number) {
        event.preventDefault()

        if (dragMode === DRAG_MODE.DRAG_LEFT) {
          let start = invertSelectedX(clientX - d)

          if (selected.end - start < MIN_SELECTED) {
            start = selected.end - MIN_SELECTED
          }

          selected.start = start
        }

        if (dragMode === DRAG_MODE.DRAG_RIGHT) {
          let end = invertSelectedX(clientX - d)

          if (end - selected.start < MIN_SELECTED) {
            end = selected.start + MIN_SELECTED
          }

          selected.end = end
        }

        if (dragMode === DRAG_MODE.DRAG_CENTER) {
          let start = invertSelectedX(clientX - d)
          let end = start + (selected.end - selected.start)

          if (end > 1) {
            end = 1
            start = end - (selected.end - selected.start)
          }

          selected.start = start
          selected.end = end
        }

        needRenderMain = true
        needRenderOverview = true

        // update label' animations
        const delta = getLabelsDelta()

        if (delta !== 0) {
          // reset animations
          if (labelAnimations.new.delta !== delta) {
            labelAnimations.old.delta = labelAnimations.new.delta
            labelAnimations.new.delta = delta
            labelAnimations.old.alpha.value = 1
            play(labelAnimations.old.alpha, 0, time)
            labelAnimations.new.alpha.value = 0
            play(labelAnimations.new.alpha, 1, time)
          }
        }
      }

      function onEnd() {
        dragMode = DRAG_MODE.NONE
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("touchmove", onTouchMove)
        document.removeEventListener("touchcancel", onEnd)
        document.removeEventListener("touchend", onEnd)
        document.removeEventListener("mouseup", onEnd)
      }
    }


    function getLabelsDelta() {
      return Math.ceil((data.labels.length - 1) * (selected.end - selected.start) / V_AXIS_LINES_AMOUNT)
    }

    function dispose() {
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("mousedown", handleMouseDown)

      cancelAnimationFrame(animationRequestId);
    }

    appendElements()

    appendControls()

    scaleCanvas(canvas, context, size.width, size.height)

    if (IS_TOUCH_DEVICE) {
      canvas.addEventListener("touchstart", handleTouchStart, false)
    }
    else {
      canvas.addEventListener("mousedown", handleMouseDown, false)
    }

    render()

    return {
      dispose
    }
  }
}
