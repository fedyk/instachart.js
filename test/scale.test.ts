import { createScale } from "../src/scale";

test("scale", function() {
  const x = createScale([0, 10], [0, 360]);
  expect(x(10)).toBe(360);
  expect(x(-10)).toBe(-360);
  expect(x.invert(360)).toBe(10);
  expect(x.invert(-360)).toBe(-10);
  expect(createScale([0, 10], [360, 0])(10)).toBe(0);
})
