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
  const firstRow = input[0].split("");
  const secondRow = input[1].split("");
  const n = firstRow.length;
  const m = secondRow.length;
  const dp = new Array(n + 1);

  for (let i = 0; i < n + 1; i++) {
    dp[i] = new Array(m + 1).fill(0);
  }

  for (let i = 1; i < n + 1; i++) {
    const letter = firstRow[i - 1];

    for (let j = 1; j < m + 1; j++) {
      const secondRowLetter = secondRow[j - 1];

      if (letter === secondRowLetter) {
        const prevElement = dp[i - 1][j - 1] || 0;
        dp[i][j] = 1 + prevElement;
      } else {
        const prevRowElement = dp[i - 1][j];
        const currRowElement = dp[i][j - 1] || 0;
        dp[i][j] = Math.max(prevRowElement, currRowElement);
      }
    }
  }

  const last = dp[n][m];
  
  let largest = firstRow.length;

  if (secondRow.length > firstRow.length) {
    largest = secondRow.length
  }

  console.log(largest - last);
}
