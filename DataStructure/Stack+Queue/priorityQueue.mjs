// simple PriorityQueue with O(n*logn) time complexity
export class PriorityQueue {
  constructor() {
    this.values;
  }

  enqueue(value, priority) {
    this.values.push({ value, priority });
    this.sort();
  }

  sort() {
    this.values.sort((a, b) => a.priority < b.priority);
  }
}
