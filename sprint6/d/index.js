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

const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

function solve() {
  const [peaksCount, connectionsCount] = input[0].split(" ");
  const numberPeaksCount = Number(peaksCount);
  const numberConnectionsCount = Number(connectionsCount);
  const adjList = getAdjList(numberPeaksCount, numberConnectionsCount);

  const color = new Array(numberPeaksCount + 1).fill(WHITE);
  const result = [];

  BFS(input.pop());

  console.log(result.join(" "));

  function BFS(s) {
    const planned = new Queue();
    planned.enqueue(s)
    color[s] = GRAY;

    while (!planned.isEmpty()) {
      const u = planned.dequeue();
      for (const v of adjList[u]) {
        if (color[v] === WHITE) {
          color[v] = GRAY;
          planned.enqueue(v);
        }
      }
      color[u] = BLACK;
      result.push(u);
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

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }

  enqueue(elm) {
    const newNode = new Node(elm);
    if (this.isEmpty()) {
      this.front = newNode;
    } else {
      this.rear.next = newNode;
    }
    this.rear = newNode;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const temp = this.front.value;
    this.front = this.front.next;
    this.count--;
    if (this.isEmpty()) {
      this.rear = null;
    }
    return temp;
  }

  isEmpty() {
    return this.count === 0;
  }
}
