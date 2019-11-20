module InstantChart {
  export interface Data {
    labels: Array<number | Date>
    datasets: Array<{
      name: string
      color: string
      data: number[]
    }>
  }

  export interface Options {
    type: "line"
    data: Data
  }

  export function create(container: HTMLDivElement, options: Options) {
    const data = parseData(options.data)
    const size = parseSize(container)
    const header = document.createElement("div")
    const body = document.createElement("div")
    const footer = document.createElement("div")
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    let animationRequestId;

    if (context == null) {
      throw new Error("Failed to create canvas context");
    }

    scaleCanvas(canvas, context, size.width, size.height)
    appendAll()
    
    function appendAll() {
      container.appendChild(header)
      container.appendChild(body)
      container.appendChild(footer)
      body.appendChild(canvas);
    }

    function render() {
      
      animationRequestId = requestAnimationFrame(render)
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

    const datasets = data.datasets.map(parseDataset)

    return {
      labels,
      datasets
    }
  }

  function parseDataset(dataset: any) {
    if (typeof dataset !== "object") {
      throw new Error("dataset should be an object");
    }

    return {
      name: dataset.name,
      color: dataset.color,
      data: dataset.data as number[]
    }
  }

  function parseSize(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const width = rect.width
    const height = rect.height || Math.floor(rect.width * 0.8)

    return { width, height }
  }

  function scaleCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number) {
    // assume the device pixel ratio is 1 if the browser doesn't specify it
    const devicePixelRatio = window.devicePixelRatio || 1;
  
    // determine the 'backing store ratio' of the canvas context
    const backingStoreRatio: number= (
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
}
