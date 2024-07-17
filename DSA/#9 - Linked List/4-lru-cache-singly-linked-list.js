class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.head = null;
    this.tail = null;
  }

  get(key) {
    if (this.cache[key]) {
      this.moveToFront(key);
      return this.cache[key].value;
    }
    return null;
  }

  put(key, value) {
    if (this.cache[key]) {
      this.cache[key].value = value;
      this.moveToFront(key);
    } else {
      if (Object.keys(this.cache).length === this.capacity) {
        this.removeLast();
      }
      this.addToFront(key, value);
    }
  }

  addToFront(key, value) {
    const newNode = {key, value, next: null};
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.cache[key] = newNode;
  }

  removeLast() {
    if (!this.head) return;

    const lastKey = this.tail.key;
    delete this.cache[lastKey];

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next;
      }

      current.next = null;
      this.tail = current;
    }
  }

  moveToFront(key) {
    const current = this.cache[key];

    if (current === this.head) return;

    let prev = null;
    let node = this.head;
    while (node && node.key !== key) {
      prev = node;
      node = node.next;
    }

    if (!node) return;

    if (node === this.tail) {
      this.tail = prev;
    }

    if (prev) {
      prev.next = node.next;
    }

    node.next = this.head;
    this.head = node;
  }
}
