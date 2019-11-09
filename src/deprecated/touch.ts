import { point } from "./point";

export function touch(node, touches, identifier = null) {
  const e = event as TouchEvent;
  if (arguments.length < 3) identifier = touches, touches = e.changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point(node, touch);
    }
  }

  return null;
}
