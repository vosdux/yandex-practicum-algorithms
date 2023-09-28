const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = [];

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input.push(line);
});
// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

function solve() {
  const [peaksCount, connectionsCount] = input[0].split(" ");
  const adjList = getAdjList(peaksCount, connectionsCount);

  const color = new Set();
  const distance = new Array(Number(peaksCount) + 1);

  BFS(Number(input.pop()));

  distance.sort((a, b) => b - a);
  console.log(distance[0]);

  function BFS(s) {
    const planned = new Queue();
    planned.enqueue(s)
    color.add(s);
    distance[s] = 0;
    while (!planned.isEmpty()) {
      const u = planned.dequeue();
      for (const v of adjList.get(Number(u))) {
        if (!color.has(v)) {
          color.add(v);
          distance[v] = distance[u] + 1;
          planned.enqueue(v);
        }
      }

    }
  }

  function getAdjList(peaksCount, numberConnectionsCount) {
    const map = new Map();

    for (let i = 1; i <= peaksCount; i++) {
      map.set(i, []);
    }

    for (let i = 1; i <= numberConnectionsCount; i++) {
      const [from, to] = input[i].split(" ");
      const numberFrom = Number(from);
      const numberTo = Number(to);

      map.get(numberFrom).push(numberTo);
      map.get(numberTo).push(numberFrom);
    }

    map.forEach((v) => v.sort((a, b) => a - b));

    return map;
  }
}

class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }

  enqueue(elm) {
    this.items[++this.rear] = elm;
    this.count++;
  }

  dequeue() {
    let current = this.front++;
    let temp = this.items[current];
    this.items[current] = null;
    this.count--;
    return temp;
  }

  isEmpty() {
    return this.count === 0;
  }
}
