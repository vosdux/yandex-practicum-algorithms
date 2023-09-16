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
  let plannedIndex = 0;

  BFS(input.pop());

  console.log(result.join(" "));

  function BFS(s) {
    const planned = [s];
    color[s] = GRAY;
    while (plannedIndex < planned.length) {
      const u = planned[plannedIndex];
      plannedIndex += 1;
      for (const v of adjList[u]) {
        if (color[v] === WHITE) {
          color[v] = GRAY;
          planned.push(v);
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

function Queue() {
  let items = [];
  let front = 0;
  let rear = -1;
  let count = 0;

  //Add a new element in queue
  this.enqueue = (elm) => {
    items[++rear] = elm;
    count++;
  };

  //Remove element from the queue
  this.dequeue = () => {
    let current = front++;
    let temp = items[current];
    items[current] = null;
    count--;
    return temp;
  };

  //Return the first element from the queue
  this.front = () => {
    return items[front];
  };

  //Return the last element from the queue
  this.rear = () => {
    return items[rear];
  };

  //Check if queue is empty
  this.isEmpty = () => {
    return count === 0;
  };

  //Return the size of the queue
  this.size = () => {
    return count;
  };

  //Print the queue
  this.print = () => {
    let temp = items.filter((e) => e !== null);
    console.log(temp.toString());
  };
}
