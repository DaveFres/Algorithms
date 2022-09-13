// simple PriorityQueue with O(n*logn) time complexity
export class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    this.values.push({ value, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

export class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
}

let wg = new WeightedGraph();
wg.addVertex('A');
wg.addVertex('B');
wg.addVertex('C');
wg.addVertex('D');
wg.addVertex('E');
wg.addVertex('F');

wg.addEdge('A', 'B', 4);
wg.addEdge('A', 'C', 2);
wg.addEdge('B', 'E', 3);
wg.addEdge('C', 'D', 2);
wg.addEdge('C', 'F', 4);
wg.addEdge('D', 'E', 3);
wg.addEdge('D', 'F', 1);
wg.addEdge('E', 'F', 1);

function Dijkstra(startVertex, endVertex) {
  const adjacencyList = wg.adjacencyList;
  const priorityQueue = new PriorityQueue();

  const distances = {};
  const previous = {};
  let smallest;
  let path = [];

  for (let [vertex, value] of Object.entries(adjacencyList)) {
    distances[vertex] = vertex === startVertex ? 0 : Infinity;

    priorityQueue.enqueue(vertex, distances[vertex]);

    previous[vertex] = null;
  }

  while (priorityQueue.values.length > 0) {
    smallest = priorityQueue.dequeue().value;

    if (smallest === endVertex) {
      // here smallest is equal to endVertex
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      break;
    }

    if (smallest || distances[smallest] !== Infinity) {
      for (let neighbor of adjacencyList[smallest]) {
        // calculate new distance to neighboring node
        let candidate = distances[smallest] + neighbor.weight;
        // console.log('candidate :>> ', candidate);
        if (candidate < distances[neighbor.node]) {
          // updating new smallest distance to neighbor
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;

          //enqueue in priority queue with new priority
          priorityQueue.enqueue(neighbor.node, candidate);
        }
      }
    }
  }

  return path.concat(smallest).reverse();
}

console.log('Dijkstra :>> ', Dijkstra('A', 'E'));
