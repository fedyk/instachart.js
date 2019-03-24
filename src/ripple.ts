import { addClass, removeClass } from "./class-list";
import { point } from "./point";

export function createRipple(button: HTMLButtonElement) {
  button.addEventListener("click", animate, false);

  function animate(e) {
    let ripple = button.querySelector<HTMLSpanElement>(".ripple");

    if (!ripple) {
      ripple = button.insertBefore<HTMLSpanElement>(addClass(document.createElement("span"), "ripple"), button.firstChild);
    }

    removeClass(ripple, "animate")

    const d = Math.max(button.offsetHeight, button.offsetWidth);
    const [x, y] = point(button, event);

    ripple.style.top = `${y - d / 2}px`;
    ripple.style.left = `${x - d / 2}px`;
    ripple.style.height = `${d}px`;
    ripple.style.width = `${d}px`;
    button.style.overflow = "hidden";
    addClass(ripple, "animate");
  }

  return animate;
}
