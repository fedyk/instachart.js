import { addClass, removeClass } from "./class-list";

export function createRipple(button: HTMLButtonElement) {
  button.addEventListener("click", animate, false);

  function animate(e) {
    let ripple = button.querySelector<HTMLSpanElement>(".ripple");

    if (!ripple) {
      ripple = button.insertBefore<HTMLSpanElement>(addClass(document.createElement("span"), "ripple"), button.firstChild);
    }

    removeClass(ripple, "animate")


    if (!ripple.offsetHeight && !ripple.offsetWidth) {
      const d = Math.max(button.offsetHeight, button.offsetWidth);
      ripple.style.height = `${d}px`;
      ripple.style.width = `${d}px`;
    }

    const rect = button.getBoundingClientRect();

    const offset = {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }

    const x = e.pageX - offset.left - ripple.offsetWidth / 2;
    const y = e.pageY - offset.top - ripple.offsetHeight / 2;


    ripple.style.top = `${y}px`;
    ripple.style.left = `${x}px`;
    button.style.overflow = "hidden";
    addClass(ripple, "animate");
  }

  return animate;
}
