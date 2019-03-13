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
  name: string;
  color: string;
  data: number[];
}

export interface Chart {
  x: number[];
  lines: Line[];
}
