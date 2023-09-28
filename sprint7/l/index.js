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
  const [n, m] = input[0].split(' ');
  const number = Number(n);
  const maxWeight = Number(m);
  const ingots = input[1].split(' ');
  let dp = {};
  let currRow = new Array(maxWeight + 1).fill(0);

  if (number === 0 || maxWeight === 0) {
    console.log(0);
    return;
  }

  for (let i = 0; i < number; i++) {
    const ingot = Number(ingots[i]);
    currRow = new Array(maxWeight + 1).fill(0);
    for (let j = 0; j < maxWeight + 1; j++) {
      const prev = dp[j - ingot] || 0;
      const curr = dp[j] || 0

      if (j - ingot >= 0) {
        currRow[j] = Math.max(curr, ingot + prev);
			}
			else {
				currRow[j] = curr;
			}
    }
    dp = { ...currRow };
  }

  console.log(dp[maxWeight]);
}
