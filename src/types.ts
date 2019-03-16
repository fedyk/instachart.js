export interface RawChartData {
  columns: [
    [string, number]
  ];
  types: {
    [key: string]: "line" | "x";
  };
  names: {
    [key: string]: string;
  };
  colors: {
    [key: string]: string;
  };
}

export interface Line {
  name: string
  color: string
  domain: [number, number]
  data: number[]
}

export interface Chart {
  x: number[]
  xDomain: [number, number]
  
  lines: Line[]
  linesDomain: [number, number]
}
