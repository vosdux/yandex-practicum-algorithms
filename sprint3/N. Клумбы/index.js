const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = [];

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input.push(line.split(" "));
});
// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);
function solve() {
  input.shift();
  const sorted = input.sort((a, b) => (Number(a[0]) < Number(b[0]) ? -1 : 1));
  let i = 1;
  let [start, end] = sorted[0];

  while (i < sorted.length) {
    if (
      Number(start) <= Number(sorted[i][0]) &&
      Number(sorted[i][0]) <= Number(end)
    ) {
      end = Math.max(Number(end), Number(sorted[i][1]));
      i += 1;
    } else {
      console.log(`${start} ${end}`);
      start = sorted[i][0];
      end = sorted[i][1];
      i += 1;
    }
  }

  console.log(`${start} ${end}`);
}
