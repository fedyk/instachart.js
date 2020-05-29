module InstantChart {
  export class Preview {
    root: HTMLElement

    constructor() {
      this.root = document.createElement("div")
    }

    render(target: HTMLDivElement) {
      return target.appendChild(this.root)
    }
  }
}
