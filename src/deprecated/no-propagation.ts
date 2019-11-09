declare const event: UIEvent;

export function noPropagation() {
  event.stopImmediatePropagation();
}
