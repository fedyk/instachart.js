import { preventDefault } from "./prevent-default";
import { toggleClass } from "./class-list";
import { createRipple } from "./ripple";

declare const event: UIEvent;

export function toggleNightMode() {
  const button = event.currentTarget as HTMLButtonElement | null;

  if (button && !button["__ripple__"]) {
    button["__ripple__"] = createRipple(button);
    button["__ripple__"](event);
  }

  toggleClass(document.body, "night--mode")
}
