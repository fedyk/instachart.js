export function removeElement(el: Element) {
  return el.parentNode ? el.parentNode.removeChild(el) : null;
}
