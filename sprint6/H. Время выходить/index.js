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
  let color = new Array(Number(peaksCount) + 1).fill("white");
  const adjList = getAdjList(peaksCount);
  let entry = Array(Number(peaksCount) + 1).fill(null);
  let leave = Array(Number(peaksCount) + 1).fill(null);
  const elems = adjList[1];
  const stack = [{ value: 1, childrens: elems }];
  let time = -1;

  while (stack.length) {
    const elem = stack[stack.length - 1];
    const stackPrevLength = stack.length;

    if (color[elem.value] === "white") {
      time += 1;
      entry[elem.value] = time;
      color[elem.value] = "gray";
    }

    if (elem.childrens) {
      elem.childrens.forEach((elem) => {
        const number = Number(elem);
        if (color[number] === "white") {
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

    if (stackNextLength === stackPrevLength) {
      if (color[elem.value] !== "black") {
        time += 1;
        color[elem.value] = "black";
        leave[elem.value] = time;
      }

      stack.pop();
    }
  }
  for (let i = 1; i < Number(peaksCount) + 1; i++) {
    console.log(`${entry[i]} ${leave[i]}`);
  }
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
    map[elem] = map[elem].sort((a, b) => Number(b) - Number(a));
  });

  return map;
}
