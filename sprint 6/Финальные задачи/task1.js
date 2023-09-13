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
  const error = "Oops! I did it again";

  const added = new Set();
  let edges = [];
  let weight = 0;

  const adjList = getAdjList(peaksCount);

  if (connectionsCount === "0") {
    if (peaksCount === "1") {
      console.log(0);
      return;
    } else {
      console.log(error);
      return;
    }
  }

  function addVertex(v) {
    added.add(v);
    adjList[v].filter(elem => !added.has(elem[0])).forEach(item => {
      edges.push(item);
      edges.sort((a, b) => a[1] - b[1]);
    });
  }

  function findMST() {
    let v = 1;

    addVertex(v);

    while (added.size !== Number(peaksCount) && edges.length !== 0) {
      const e = edges.pop();

      if (!added.has(e[0])) {
        weight += e[1];
        addVertex(e[0]);
      }
    }

    if (added.size !== Number(peaksCount)) {
      console.log(error);
    } else {
      console.log(weight);
    }
  }

  findMST();
}

function getAdjList(peaksCount) {
  const map = {};
  for (let i = 1; i < Number(peaksCount) + 1; i++) {
    map[i] = {};
  }

  for (let i = 1; i < input.length; i++) {
    const [from, to, weight] = input[i].split(" ");
    const numberFrom = Number(from);
    const numberTo = Number(to);
    const numberWeight = Number(weight);

    if (map[numberFrom][numberTo]) {
      map[numberFrom][numberTo] = Math.max(
        map[numberFrom][numberTo],
        numberWeight
      );
    } else {
      map[numberFrom][numberTo] = weight;
    }

    if (map[numberTo][numberFrom]) {
      map[numberTo][numberFrom] = Math.max(
        map[numberTo][numberFrom],
        numberWeight
      );
    } else {
      map[numberTo][numberFrom] = weight;
    }
  }

  Object.keys(map).forEach((key) => {
    map[key] = Object.entries(map[key]).map(([key, value]) => [
      Number(key),
      Number(value),
    ]);
  });

  return map;
}
