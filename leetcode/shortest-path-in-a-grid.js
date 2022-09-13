// 1293. Shortest Path in a Grid with Obstacles Elimination (hard)
// https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/

class QItem {
  constructor(row, col, distance, obstaclesRemaining) {
    this.row = row;
    this.col = col;
    this.distance = distance;
    this.obstaclesRemaining = obstaclesRemaining;
  }
}

// В решении shortestPath2 есть ошибка. Используя только один цикл по queue мы делаем DFS фактически.
// А нам нужно на каждой итерации матрицы брать следующие элементы для всех ячеек данного шага!
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var shortestPath2 = function (grid, k) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  const start = new QItem(0, 0, 0, k);

  const destination = new QItem(gridRows - 1, gridCols - 1, 0, k);

  const visited = {
    [`${start.row}-${start.col}-${start.obstaclesRemaining}`]: true,
  };

  const queue = [start];

  const traverseResult = [];

  while (queue.length) {
    console.log(queue.map((el) => [el.row, el.col, el.obstaclesRemaining]));
    // console.log('visited: ', visited);
    // console.log('================================');
    const currentEl = queue.shift();

    if (
      currentEl.row === destination.row &&
      currentEl.col === destination.col
    ) {
      traverseResult.push(currentEl.distance);
      return currentEl.distance;
    }

    // up
    if (
      currentEl.row - 1 >= 0 &&
      !visited[
        `${currentEl.row - 1}-${currentEl.col}-${currentEl.obstaclesRemaining}`
      ]
    ) {
      if (grid[currentEl.row - 1][currentEl.col] === 1) {
        if (currentEl.obstaclesRemaining >= 1) {
          visited[
            `${currentEl.row - 1}-${currentEl.col}-${
              currentEl.obstaclesRemaining - 1
            }`
          ] = true;
          queue.push(
            new QItem(
              currentEl.row - 1,
              currentEl.col,
              currentEl.distance + 1,
              currentEl.obstaclesRemaining - 1
            )
          );
        }
      } else {
        visited[
          `${currentEl.row - 1}-${currentEl.col}-${
            currentEl.obstaclesRemaining
          }`
        ] = true;
        queue.push(
          new QItem(
            currentEl.row - 1,
            currentEl.col,
            currentEl.distance + 1,
            currentEl.obstaclesRemaining
          )
        );
      }
    }

    // down
    if (
      currentEl.row + 1 < gridRows &&
      !visited[
        `${currentEl.row + 1}-${currentEl.col}-${currentEl.obstaclesRemaining}`
      ]
    ) {
      if (grid[currentEl.row + 1][currentEl.col] === 1) {
        if (currentEl.obstaclesRemaining >= 1) {
          visited[
            `${currentEl.row + 1}-${currentEl.col}-${
              currentEl.obstaclesRemaining - 1
            }`
          ] = true;
          queue.push(
            new QItem(
              currentEl.row + 1,
              currentEl.col,
              currentEl.distance + 1,
              currentEl.obstaclesRemaining - 1
            )
          );
        }
      } else {
        visited[
          `${currentEl.row + 1}-${currentEl.col}-${
            currentEl.obstaclesRemaining
          }`
        ] = true;
        queue.push(
          new QItem(
            currentEl.row + 1,
            currentEl.col,
            currentEl.distance + 1,
            currentEl.obstaclesRemaining
          )
        );
      }
    }

    // left
    if (
      currentEl.col - 1 >= 0 &&
      !visited[
        `${currentEl.row}-${currentEl.col - 1}-${currentEl.obstaclesRemaining}`
      ]
    ) {
      if (grid[currentEl.row][currentEl.col - 1] === 1) {
        if (currentEl.obstaclesRemaining >= 1) {
          visited[
            `${currentEl.row}-${currentEl.col - 1}-${
              currentEl.obstaclesRemaining - 1
            }`
          ] = true;
          queue.push(
            new QItem(
              currentEl.row,
              currentEl.col - 1,
              currentEl.distance + 1,
              currentEl.obstaclesRemaining - 1
            )
          );
        }
      } else {
        visited[
          `${currentEl.row}-${currentEl.col - 1}-${
            currentEl.obstaclesRemaining
          }`
        ] = true;
        queue.push(
          new QItem(
            currentEl.row,
            currentEl.col - 1,
            currentEl.distance + 1,
            currentEl.obstaclesRemaining
          )
        );
      }
    }

    // right
    if (
      currentEl.col + 1 < gridCols &&
      !visited[
        `${currentEl.row}-${currentEl.col + 1}-${currentEl.obstaclesRemaining}`
      ]
    ) {
      if (grid[currentEl.row][currentEl.col + 1] === 1) {
        if (currentEl.obstaclesRemaining >= 1) {
          visited[
            `${currentEl.row}-${currentEl.col + 1}-${
              currentEl.obstaclesRemaining - 1
            }`
          ] = true;
          queue.push(
            new QItem(
              currentEl.row,
              currentEl.col + 1,
              currentEl.distance + 1,
              currentEl.obstaclesRemaining - 1
            )
          );
        }
      } else {
        visited[
          `${currentEl.row}-${currentEl.col + 1}-${
            currentEl.obstaclesRemaining
          }`
        ] = true;
        queue.push(
          new QItem(
            currentEl.row,
            currentEl.col + 1,
            currentEl.distance + 1,
            currentEl.obstaclesRemaining
          )
        );
      }
    }
  }

  console.log(traverseResult);

  return -1;
};

var shortestPath = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;

  const DIR = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const v = {};
  v[`0-0-${k}`] = true;

  const q = [];
  let steps = 0;

  q.push([0, 0, k]);

  while (q.length > 0) {
    let size = q.length;
    console.log('queue', q);

    while (size--) {
      let curr = q.shift();
      //If curr is the destination; return steps
      if (curr[0] == m - 1 && curr[1] == n - 1) return steps;
      //Else go in all valid directions
      for (const d of DIR) {
        let i = curr[0] + d[0];
        let j = curr[1] + d[1];
        let obs = curr[2];

        //Traverse through the valid cells
        if (i >= 0 && i < m && j >= 0 && j < n) {
          //If cell is empty visit the cell and add in queue
          if (grid[i][j] == 0 && !v[`${i}-${j}-${obs}`]) {
            q.push([i, j, obs]);
            v[`${i}-${j}-${obs}`] = true;
          } else if (grid[i][j] == 1 && obs > 0 && !v[`${i}-${j}-${obs - 1}`]) {
            q.push([i, j, obs - 1]);
            v[`${i}-${j}-${obs - 1}`] = true;
          }
        }
      }
    }
    ++steps;
  }
  return -1;
};

console.log(
  shortestPath2(
    // [
    //   [0, 0],
    //   [1, 0],
    //   [1, 0],
    //   [1, 0],
    //   [1, 0],
    //   [1, 0],
    //   [0, 0],
    //   [0, 1],
    //   [0, 1],
    //   [0, 1],
    //   [0, 0],
    //   [1, 0],
    //   [1, 0],
    //   [0, 0],
    // ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    1
    // [
    //   [0, 1, 1],
    //   [1, 1, 1],
    //   [1, 0, 0],
    // ],
    // [
    //   [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    //   [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    //   [1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    //   [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    //   [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1],
    //   [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
    //   [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    //   [0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    //   [1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    //   [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    //   [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    //   [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    //   [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
    //   [0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    //   [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    //   [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    //   [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    //   [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0],
    //   [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0],
    //   [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    //   [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    //   [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
    //   [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    // ],
    // 38
  )
);

console.log(
  shortestPath(
    // [
    //   [0, 0],
    //   [1, 0],
    //   [1, 0],
    //   [1, 0],
    //   [1, 0],
    //   [1, 0],
    //   [0, 0],
    //   [0, 1],
    //   [0, 1],
    //   [0, 1],
    //   [0, 0],
    //   [1, 0],
    //   [1, 0],
    //   [0, 0],
    // ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    1
    // [
    //   [0, 1, 1],
    //   [1, 1, 1],
    //   [1, 0, 0],
    // ],
    // [
    //   [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    //   [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    //   [1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    //   [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    //   [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1],
    //   [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
    //   [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    //   [0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    //   [1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    //   [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    //   [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    //   [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    //   [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
    //   [0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    //   [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    //   [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    //   [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    //   [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0],
    //   [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0],
    //   [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    //   [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    //   [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
    //   [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    // ],
    // 38
  )
);
