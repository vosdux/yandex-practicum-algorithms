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
  const [n, m] = input[0].split(" ").map(Number);

  const points = new Array(n).fill(new Array(m));
  const dp = new Array(n).fill(new Array(m));

  for (let i = 1; i < n + 1; i++) {
    const row = input[i].split("").map(Number);
    points[i - 1] = row;
  }

  points.reverse();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let left = 0;
      let bot = 0;

      if (dp[i] && dp[i][j - 1]) {
        left = dp[i][j - 1];
      } else if (j - 1 >= 0) {
        left = points[i][j - 1];
      }

      if (dp[i - 1] && dp[i - 1][j]) {
        bot = dp[i - 1][j];
      } else if (i - 1 >= 0) {
        bot = points[i - 1][j];
      }

      dp[i][j] = Math.max(left, bot) + points[i][j];
    }
  }

  console.log(dp[n - 1][m - 1]);
}
