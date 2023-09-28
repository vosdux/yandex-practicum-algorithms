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

  const points = new Array(n);
  const dp = new Array(n);
  const way = [];

  for (let t = 1; t < n + 1; t++) {
    points[t - 1] = input[t].split("").map(Number);
    dp[t - 1] = new Array(m).fill(0);
  }

  points.reverse();

  for (let i in dp) {
    for (let j in dp[i]) {
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

  let i = n - 1;
  let j = m - 1;

  while (i > 0 || j > 0) {
    let left = -1;
    let bot = -1;
  
    if (dp[i] && dp[i][j - 1] !== undefined) {
      left = dp[i][j - 1];
    }

    if (dp[i - 1] && dp[i - 1][j] !== undefined) {
      bot = dp[i - 1][j];
    }

    if (left >= bot) {
      j--;
      way.push('R');
    } else {
      i--;
      way.push('U')
    }
  }

  console.log(dp[n - 1][m - 1]);
  console.log(way.reverse().join(''));
}
