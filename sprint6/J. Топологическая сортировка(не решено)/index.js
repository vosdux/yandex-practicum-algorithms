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
  const numberPeaksCount = Number(peaksCount);

  let color = new Array(numberPeaksCount + 1).fill(1);

  const adjList = getAdjList(numberPeaksCount);
  const order = [];

  function mainSort() {
    for (let i = 1; i < numberPeaksCount + 1; i++) {
      if (!Object.values(adjList).some((elem) => elem.includes(i))) {
        topSort(i);
      }
    }
  }

  function topSort(v) {
    if (color[v] === 3) {
      return;
    }

    const startElemChilds = adjList[v];
    const stack = [{ value: v, childrens: startElemChilds }];
    const newOrder = [];

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
        newOrder.unshift(elem.value);
        stack.pop();
      }
    }

    order.push(...newOrder);
  }

  mainSort();

  console.log(order.join(" "));
}

function getAdjList(peaksCount) {
  const map = {};

  for (let i = 1; i < peaksCount + 1; i++) {
    map[i] = [];
  }

  for (let i = 1; i < input.length; i++) {
    const [from, to] = input[i].split(" ");
    const numberFrom = Number(from);
    const numberTo = Number(to);

    map[numberFrom].push(numberTo);
  }

  // Object.keys(map).forEach((elem) => {
  //   map[elem] = map[elem].sort((a, b) => map[a].length - map[b].length);
  // });

  return map;
}
