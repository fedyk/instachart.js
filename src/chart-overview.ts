import { generalUpdatePattern } from "../general-update-pattern";

interface Props {
  extend: [
    [number, number],
    [number, number]
  ];
  lines: [
    number[]
  ];
  x: number[]
  selection: [number, number];
}

export function overview(parent: Element, props: Props) {
  // generalUpdatePattern(parent).select()
}
