import { Graph } from './graph.mjs';

let g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

console.log('g.adjacencyList :>> ', g.adjacencyList);

function DFSRecursive(vertex) {
  const traverseResult = [];
  const visitedVertexMap = {};
  const adjacencyList = g.adjacencyList;

  // function that calls itself recursively
  const helper = (vertex, traverseResult, visitedVertexMap) => {
    if (!vertex) {
      return;
    }

    visitedVertexMap[vertex] = true;
    traverseResult.push(vertex);

    adjacencyList[vertex].forEach((neighbor) => {
      if (!visitedVertexMap[neighbor]) {
        helper(neighbor, traverseResult, visitedVertexMap);
      }
    });
  };

  helper(vertex, traverseResult, visitedVertexMap);

  return traverseResult;
}

function DFSIterative(vertex) {
  const stack = [];
  const traverseResult = [];
  const visitedVertexMap = {};
  const adjacencyList = g.adjacencyList;

  stack.push(vertex);

  while (stack.length) {
    const currentVertex = stack.pop();

    if (!visitedVertexMap[currentVertex]) {
      visitedVertexMap[currentVertex] = true;
      traverseResult.push(currentVertex);

      adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visitedVertexMap[neighbor]) {
          stack.push(neighbor);
        }
      });
    }
  }

  return traverseResult;
}

console.log(DFSRecursive('A'));
console.log(DFSIterative('A'));
