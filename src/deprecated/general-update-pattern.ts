function bindByIndex<T>(parent: Element, elements: NodeListOf<Element>, enterGroup: EnterNode<T>[], updateGroup: Element[], exitGroup: Element[], data: T[]) {
  const dataLength = data.length;
  const elementsLength = elements.length;

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
}

const KEY_PREFIX = "$";

function bindByKey<T>(parent: Element, elements: NodeListOf<Element>, enterGroup: EnterNode<T>[], updateGroup: Element[], exitGroup: Element[], data: T[], key: Key<T>) {
  const elementsByKeyValue = {};
  const elementsLength = elements.length
  const dataLength = data.length
  const keyValues = new Array(elementsLength)

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (let i = 0; i < elementsLength; ++i) {
    let element = elements[i];

    if (element) {
      let keyValue = KEY_PREFIX + key(element["__data__"], i);

      keyValues[i] = keyValue;

      if (keyValue in elementsByKeyValue) {
        exitGroup[i] = element;
      } else {
        elementsByKeyValue[keyValue] = element;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (let i = 0; i < dataLength; ++i) {
    let keyValue = KEY_PREFIX + key(data[i], i);
    let element = elementsByKeyValue[keyValue];

    if (element) {
      updateGroup[i] = element;
      element["__data__"] = data[i];
      elementsByKeyValue[keyValue] = null;
    } else {
      enterGroup[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (let i = 0; i < elementsLength; ++i) {
    const element = elements[i];

    if (element && (elementsByKeyValue[keyValues[i]] === element)) {
      exitGroup[i] = element;
    }
  }
}

interface Key<T> {
  (datum: T, index: number): string;
}

export function generalUpdatePattern<T>(parent: Element, selector: string, data: T[], key: Key<T> | null = null) {
  const elements = parent.querySelectorAll(selector);
  const elementsLength = elements.length;
  const dataLength = data.length;
  const enterGroup: EnterNode<T>[] = new Array(dataLength);
  const enteredGroup: Element[] = new Array(dataLength);
  const updateGroup: Element[] = new Array(dataLength);
  const exitGroup: Element[] = new Array(elementsLength);

  if (key == null) {
    bindByIndex(parent, elements, enterGroup, updateGroup, exitGroup, data)
  }
  else {
    bindByKey(parent, elements, enterGroup, updateGroup, exitGroup, data, key)
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
        enteredGroup[index]["__data__"] = data[index]
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

    exit(cb: (element: Element, datum: T, index: number) => void) {
      return exitGroup.map((element, index) => cb(element, element["__data__"], index)), that
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