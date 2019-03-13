import { createPath } from "../src/path"

test("path", function() {
  const path = createPath()
    .moveTo(0, 0)
    .lineTo(100, 100)
    .closePath()

  expect(path()).toBe("M0,0L100,100Z")
})
