module InstantChart {
  export function createInstantChart() {
    return new InstantChart()
  }

  export class InstantChart {
    styles: string
    preview: Preview
    root: HTMLDivElement;
  
    constructor() {
      this.styles = "display: block";
      this.root = document.createElement("div")
      this.preview = new Preview()
    }
  
    render() {
      this.preview.render(this.root)
    }
  }
}
