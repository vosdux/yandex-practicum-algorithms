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
  const map = {};
  for (let i = 1; i < Number(peaksCount) + 1; i++) {
    map[i] = [];
  }

  for (let i = 1; i < input.length; i++) {
    const [from, to] = input[i].split(" ");

    map[from].push(to);
  }

  Object.entries(map).forEach(([key, value]) => {
    const str = `${value.length} ${value.join(" ")}`;
    console.log(str);
  });
}
