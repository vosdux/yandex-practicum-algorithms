// const _readline = require("readline");

// const _reader = _readline.createInterface({
//   input: process.stdin,
// });

let input = ["5 4", "2 1", "4 5", "4 3", "3 2", "2"];

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
// _reader.on("line", (line) => {
//   input.push(line);
// });
// Когда ввод закончится, будет вызвана функция solve.
// process.stdin.on("end", solve);

const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

function solve() {
  const [peaksCount, connectionsCount] = input[0].split(" ");
  const numberPeaksCount = Number(peaksCount);
  const numberConnectionsCount = Number(connectionsCount);
  const adjList = getAdjList(numberPeaksCount, numberConnectionsCount);

  const color = new Array(numberPeaksCount + 1);
  const previous = new Array(numberPeaksCount + 1);
  const distance = new Array(numberPeaksCount + 1);

  BFS(input.pop());

  distance.sort((a, b) => b - a);
  console.log(distance[0]);

  function BFS(s) {
    // Создадим очередь вершин и положим туда стартовую вершину.
    const planned = [s];
    color[s] = GRAY;
    distance[s] = 0;
    while (planned.length > 0) {
      const u = planned.shift(); // Возьмём вершину из очереди.
      for (const v of adjList[u]) {
        // adjList - список смежности графа.
        if (color[v] === undefined) {
          // Серые и чёрные вершины уже
          // либо в очереди, либо обработаны.
          distance[v] = distance[u] + 1;
          previous[v] = u;
          color[v] = GRAY;
          planned.push(v); // Запланируем посещение вершины.
        }
      }
      color[u] = BLACK; // Теперь вершина считается обработанной.
    }
  }

  function getAdjList(peaksCount, numberConnectionsCount) {
    const map = {};

    for (let i = 1; i < peaksCount + 1; i++) {
      map[i] = [];
    }

    for (let i = 1; i < numberConnectionsCount + 1; i++) {
      const [from, to] = input[i].split(" ");
      const numberFrom = Number(from);
      const numberTo = Number(to);

      map[numberFrom].push(numberTo);
      map[numberTo].push(numberFrom);
      map[numberFrom].sort((a, b) => a - b);
      map[numberTo].sort((a, b) => a - b);
    }

    return map;
  }
}

solve()