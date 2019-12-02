module InstantChart {
  const OVERVIEW_HEIGHT = 60
  const HORIZONTAL_PADDING = 24
  const ANIMATION_DURATION = 200

  export interface Data {
    labels: Array<number | Date>
    datasets: Array<{
      name: string
      color: string
      min: number
      max: number
      data: number[]
    }>
  }

  export interface Options {
    type: "line"
    data: Data
  }

  interface ChartRect {
    top: number
    left: number
    width: number
    height: number
  }

  export function create(container: HTMLDivElement, options: Options) {
    const data = parseData(options.data)
    const max = Math.max(...data.datasets.map(dataset => dataset.max))
    const min = Math.min(...data.datasets.map(dataset => dataset.min))
    const size = parseSize(container)
    const header = document.createElement("div")
    const body = document.createElement("div")
    const footer = document.createElement("div")
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const alphaAnimations = createAlphaAnimations()
    const minAnimation = createAnimation(min, ANIMATION_DURATION)
    const maxAnimation = createAnimation(max, ANIMATION_DURATION)
    let time: number;
    let animationRequestId: number;
    let mainRect = getMainRect()
    let needRenderMain = true;
    let overviewRect = getOverviewRect()
    let needRenderOverview = true

    if (!context) {
      throw new Error("Failed to create canvas context");
    }

    function createAlphaAnimations() {
      return data.datasets.map(function () {
        return createAnimation(1, ANIMATION_DURATION)
      })
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

      play(alphaAnimation, alphaAnimation.toValue === 1 ? 0 : 1, time)

      const visibleDatasets = getVisibleDatasets();
      const min = Math.min(...visibleDatasets.map(d => d.min))
      const max = Math.max(...visibleDatasets.map(d => d.max))

      play(minAnimation, min, time)
      play(maxAnimation, max, time)
    }

    function appendControls() {
      for (let i = 0; i < data.datasets.length; i++) {
        const dataset = data.datasets[i];
        const button = document.createElement("button")

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

      if (updateAnimation(minAnimation, time)) {
        needRenderMain = true
        needRenderOverview = true
      }
      
      if (updateAnimation(maxAnimation, time)) {
        needRenderMain = true
        needRenderOverview = true
      }

      if (needRenderMain) {
        renderMainLines(), needRenderMain = false
      }

      if (needRenderOverview) {
        renderOverviewLines(), needRenderOverview = false
      }

      animationRequestId = requestAnimationFrame(render)
    }

    function renderMainLines() {
      const min = minAnimation.value
      const max = maxAnimation.value

      context.clearRect(mainRect.left, mainRect.top, mainRect.width, mainRect.height)

      for (let i = 0; i < data.datasets.length; i++) {
        const dataset = data.datasets[i];
        const x = (index: number) => mainRect.width * index / (data.labels.length - 1)
        const y = (d: number) => mainRect.top + mainRect.height * (1 - (d - min) / (max - min))

        context.globalAlpha = alphaAnimations[i].value;
        context.strokeStyle = dataset.color
        context.lineWidth = 2
        context.lineJoin = "round"
        context.beginPath()
        context.moveTo(x(0), y(dataset.data[0]))

        for (let j = 1; j < dataset.data.length; j++) {
          context.lineTo(x(j), y(dataset.data[j]))
        }

        context.stroke()
      }
    }

    function renderOverviewLines() {
      const min = minAnimation.value
      const max = maxAnimation.value

      context.clearRect(overviewRect.left, overviewRect.top, overviewRect.width, overviewRect.height)

      for (let i = 0; i < data.datasets.length; i++) {
        const dataset = data.datasets[i];
        const x = (index: number) => HORIZONTAL_PADDING + (overviewRect.width - 2 * HORIZONTAL_PADDING) * index / (data.labels.length - 1)
        const y = (d: number) => overviewRect.top + overviewRect.height * (1 - (d - min) / (max - min))

        context.globalAlpha = alphaAnimations[i].value;
        context.strokeStyle = dataset.color
        context.lineWidth = 1
        context.lineJoin = "round"
        context.beginPath()
        context.moveTo(x(0), y(dataset.data[0]))

        for (let j = 1; j < dataset.data.length; j++) {
          context.lineTo(x(j), y(dataset.data[j]))
        }

        context.stroke()
      }
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

    function getVisibleDatasets() {
      return data.datasets.filter(function (dataset, index) {
        return alphaAnimations[index].toValue === 1
      })
    }

    function dispose() {
      cancelAnimationFrame(animationRequestId);
    }

    appendElements()

    appendControls()

    scaleCanvas(canvas, context, size.width, size.height)

    render()

    return {
      dispose
    }
  }

  function parseData(data: any): Data {
    if (!data || typeof data !== 'object') {
      throw new Error("data cannot be empty")
    }

    if (!Array.isArray(data.labels)) {
      throw new Error("data.labels should be an array")
    }

    const labels = data.labels as Array<number | Date>

    if (!Array.isArray(data.datasets)) {
      throw new Error("data.datasets should be an array")
    }

    const datasets = (data.datasets as any[]).map(parseDataset)

    return {
      labels,
      datasets,
    }
  }

  function parseDataset(dataset: any) {
    if (typeof dataset !== "object") {
      throw new Error("dataset should be an object");
    }

    return {
      name: dataset.name,
      color: dataset.color,
      min: Math.min(...dataset.data),
      max: Math.max(...dataset.data),
      data: dataset.data as number[]
    }
  }

  function parseSize(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const width = rect.width
    const height = rect.height || rect.width

    return { width, height }
  }

  function scaleCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number) {
    // assume the device pixel ratio is 1 if the browser doesn't specify it
    const devicePixelRatio = window.devicePixelRatio || 1;

    // determine the 'backing store ratio' of the canvas context
    const backingStoreRatio: number = (
      (context as any).webkitBackingStorePixelRatio ||
      (context as any).mozBackingStorePixelRatio ||
      (context as any).msBackingStorePixelRatio ||
      (context as any).oBackingStorePixelRatio ||
      (context as any).backingStorePixelRatio || 1
    );

    // determine the actual ratio we want to draw at
    const ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
      // set the 'real' canvas size to the higher width/height
      canvas.width = width * ratio;
      canvas.height = height * ratio;

      // ...then scale it back down with CSS
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    }
    else {
      // this is a normal 1:1 device; just scale it simply
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = '';
      canvas.style.height = '';
    }

    // scale the drawing context so everything will work at the higher ratio
    context.scale(ratio, ratio);
  }

  type Animation = ReturnType<typeof createAnimation>

  function createAnimation(value: number, duration: number) {
    return {
      fromValue: value,
      toValue: value,
      value: value,
      startTime: 0,
      duration: duration,
      delay: 0
    }
  }

  function play(animation: Animation, toValue: number, startTime: number) {
    animation.startTime = startTime;
    animation.toValue = toValue;
    animation.fromValue = animation.value;
  }

  function updateAnimation(animation: Animation, time: number) {
    if (animation.value === animation.toValue) {
      return false;
    }

    var progress = ((time - animation.startTime) - animation.delay) / animation.duration;

    if (progress < 0) {
      progress = 0;
    }

    if (progress > 1) {
      progress = 1;
    }

    var ease = -progress * (progress - 2);

    animation.value = animation.fromValue + (animation.toValue - animation.fromValue) * ease;

    return true;
  }


}
