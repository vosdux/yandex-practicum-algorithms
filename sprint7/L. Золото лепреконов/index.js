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
  const [n, m] = input[0].split(" ");
  const maxWeight = Number(m);
  const weights = input[1].split(" ").map(Number);

  const dp = Array(maxWeight + 1).fill(0);
  for (const weight of weights) {
    for (let j = maxWeight; j >= weight; j--) {
      dp[j] = Math.max(dp[j], dp[j - weight] + weight);
      if (j === maxWeight && dp[j] === maxWeight) {
        console.log(maxWeight);
        return;
      }
    }
  }
  console.log(dp[maxWeight]);
}
