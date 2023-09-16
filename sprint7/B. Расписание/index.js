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
  const n = parseInt(input[0]);
  const iData = [];

  for (let i = 1; i <= n; i++) {
    const [tb, te] = input[i].split(" ").map(Number);
    iData.push([te, tb]);
  }

  iData.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let taskend = -1.0;
  const res = [];

  for (const el of iData) {
    if (el[1] >= taskend) {
      taskend = el[0];
      res.push(el);
    }
  }

  console.log(res.length);
  for (const el of res) {
    console.log(el[1], el[0]);
  }
}
