const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = "";

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input = line;
});

// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

function fibionaci(n, k) {
  let prev = 1;
  let prev2 = 1;
  for (let i = 2; i <= n; i++) {
    const sum = (prev + prev2) % k;
    prev2 = prev;
    prev = sum;
  }

  return prev.toString();
}

function solve() {
  const args = input.split(" ");
  const k = Math.pow(10, Number(args[1]));
  const fib = fibionaci(args[0], k);

  console.log(fib);
}
