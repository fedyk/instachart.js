

export function generalUpdatePattern(parent: Element) {
  function select<T>(selector: string, data: T[]) {
    const elements = parent.querySelectorAll(selector);
    const elementsLength = elements.length;
    const dataLength = data.length;
    const enterGroup = new Array(dataLength);
    const updateGroup = new Array(dataLength);
    const exitGroup = new Array(elementsLength);
    let i = 0;

    class EnterNode {
      next: Element | null;
      parent: Element;
      datum: T

      constructor(parent: Element, datum: T) {
        this.next = null;
        this.parent = parent;
        this.datum = datum;
      }

      appendChild(child) {
        return this.parent.insertBefore(child, this.next);
      }

      insertBefore(child, next) {
        return this.parent.insertBefore(child, next);
      }

      querySelector(selector) {
        return this.parent.querySelector(selector);
      }

      querySelectorAll(selector) {
        return this.parent.querySelectorAll(selector);
      }
    }

    for (; i < dataLength; i++) {
      const element = elements[i];

      if (element) {
        updateGroup[i] = element;
      }
      else {
        enterGroup[i] = new EnterNode(parent, data[i]);
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

    // enter mapper
    function enter(cb) {
      return enterGroup.map(cb)
    }

    function update(cb) {
      return updateGroup.filter(cb)

    }

    function exit(cb) {
      return exitGroup.map(cb)
    }

    return {
      enter,
      update,
      exit
    }
  }

  return {
    select
  }
}
