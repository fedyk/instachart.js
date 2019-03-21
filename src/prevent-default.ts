declare const event: UIEvent;

export function preventDefault() {
  event.preventDefault();
  event.stopImmediatePropagation();
}
