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
  const [peaksCount] = input[0].split(" ");
  let color = new Array(Number(peaksCount) + 1).fill(1);

  const adjList = getAdjList(peaksCount);
  const order = [];

  function mainSort() {
    for (let i = 1; i < Number(peaksCount) + 1; i++) {
      topSort(i);
    }
  }

  function topSort(v) {
    if (color[v] === 3) {
      return;
    }

    const startElemChilds = adjList[v];
    const stack = [{ value: v, childrens: startElemChilds }];

    while (stack.length) {
      const elem = stack[stack.length - 1];
      const stackPrevLength = stack.length;

      if (color[elem.value] === 1) {
        color[elem.value] = 2;
      }

      if (elem.childrens) {
        elem.childrens.forEach((item) => {
          const number = Number(item);

          if (color[number] === 1) {
            stack.push({
              value: number,
              childrens: adjList[number],
            });
          }
        });
      } else {
        stack.pop();
      }

      const stackNextLength = stack.length;

      if (stackNextLength === stackPrevLength && color[elem.value] !== 3) {
        color[elem.value] = 3;
        order.push(elem.value);
        stack.pop();
      }
    }
  }

  mainSort();

  console.log(order.join(" "));
}

function solve() {
  let order = [];
  let color = new Array(n).fill(0);
  const [peaksCount] = input[0].split(" ");

  const adjList = getAdjList(peaksCount);

  function topSort(v) {
    color[v] = 1;
    for (let w of adjList[v]) {
      if (color[w] == 0) {
        topSort(w);
      }
    }
    color[v] = 2;
    order.push(v);
  }

  function mainTopSort() {
    for (let i = 0; i < n; i++) {
      if (color[i] == 0) {
        topSort(i);
      }
    }
  }
  mainTopSort();
}

function getAdjList(peaksCount) {
  const map = {};
  for (let i = 1; i < Number(peaksCount) + 1; i++) {
    map[i] = [];
  }

  for (let i = 1; i < input.length; i++) {
    const [from, to] = input[i].split(" ");

    map[from].push(to);
  }

  Object.keys(map).forEach((elem) => {
    map[elem] = map[elem].sort((a, b) => Number(a) - Number(b));
  });

  return map;
}
