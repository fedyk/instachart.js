import { createLine } from "../src/line";

test("scale", function() {
  const line = createLine<[number, number]>()
    .x(d => d[0])
    .y(d => d[1])

  expect(line([[0, 0], [1, 1]])).toBe("M0,0L1,1Z");
})
