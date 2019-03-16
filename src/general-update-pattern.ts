export function generalUpdatePattern<T>(parent: Element, selector: string, data: T[]) {
  const elements = parent.querySelectorAll(selector);
  const elementsLength = elements.length;
  const dataLength = data.length;
  const enterGroup: EnterNode<T>[] = new Array(dataLength);
  const enteredGroup: Element[] = new Array(dataLength);
  const updateGroup: Element[] = new Array(dataLength);
  const exitGroup: Element[] = new Array(elementsLength);
  let i = 0;

  for (; i < dataLength; i++) {
    const element = elements[i];

    if (element) {
      updateGroup[i] = element;
    }
    else {
      enterGroup[i] = new EnterNode<T>(parent, data[i]);
    }
  }

  for (; i < elementsLength; ++i) {
    const element = elements[i];

    if (element) {
      exitGroup[i] = element;
    }
  }

  for (let i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
    if (previous = enterGroup[i0]) {
      if (i0 >= i1) i1 = i0 + 1;
      while (!(next = updateGroup[i1]) && ++i1 < dataLength);
      previous._next = next || null;
    }
  }

  const that = {
    // enter mapper
    enter(cb: (d: T, i: number) => Element) {
      return enterGroup.map((element, index) => {
        enteredGroup[index] = element.appendChild(cb(data[index], index))
      }), that
    },

    update(cb: (element: Element, d: T, i: number) => void) {
      return updateGroup.map((element, index) => cb(element, data[index], index)), that
    },

    merge(cb: (element: Element, d: T, index: number) => void) {
      for (let index = 0; index < dataLength; index++) {
        const element = updateGroup[index] || enteredGroup[index];

        cb(element, data[index], index);
      }

      return that;
    },

    exit(cb: (element: Element, index: number) => void) {
      return exitGroup.map((element, index) => cb(element, index)), that
    }
  }

  return that;
}

class EnterNode<T> {
  next: Element | null;
  parent: Element;
  datum: T

  constructor(parent: Element, datum: T) {
    this.next = null;
    this.parent = parent;
    this.datum = datum;
  }

  appendChild(child: Element) {
    return this.parent.insertBefore(child, this.next);
  }
}