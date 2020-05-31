namespace instachart {
  export function parseOptions(options?: any) {
    const title = options ? options.title : void 0
    const type = options ? options.type : void 0
    const data = options ? options.data : []
    const percentage = options ? options.yScaled : void 0
    const stacked = options ? options.yScaled : void 0
    const yScaled = options ? options.yScaled : void 0

    return {
      title: parseTitle(title),
      type: parseType(type),
      data: parseData(data),
      percentage: Boolean(percentage),
      stacked: Boolean(stacked),
      yScaled: Boolean(yScaled),
    }
  }

  export function parseTitle(title?: any) {
    if (!title) {
      return "Chart"
    }

    if (typeof title !== "string") {
      throw new RangeError("`title` should be a string")
    }

    return title
  }

  export function parseType(type?: any) {
    if (!type) {
      return "line"
    }

    if (typeof type !== "string") {
      throw new RangeError("`type` should be a string")
    }

    if (type !== "line" && type !== "bar" && type !== "area") {
      throw new RangeError("`type` has invalid value")
    }

    return type
  }

  export function parseData(data?: any) {
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

  export function parseDataset(dataset: any) {
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

  export function parseSize(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const width = rect.width
    const height = rect.height || rect.width

    return {
      width,
      height
    }
  }
}
