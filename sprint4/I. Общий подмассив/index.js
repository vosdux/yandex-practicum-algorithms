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
  const firstTeam = input[1].split(" ");
  const secondTeam = input[3].split(" ");

  let minPoints = [];
  let maxPoints = [];

  if (firstTeam.length > secondTeam.length) {
    minPoints = secondTeam;
    maxPoints = firstTeam;
  } else {
    minPoints = firstTeam;
    maxPoints = secondTeam;
  }

  findMaxLength(maxPoints, minPoints);

}

function findMaxLength(maxArr, minArr) {
  const n = minArr.length;
  const m = maxArr.length;
  let dp = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(m + 1);
    for (let j = 0; j <= m; j++) dp[i][j] = 0;
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (maxArr[i] == minArr[j]) dp[j][i] = dp[j + 1][i + 1] + 1;
    }
  }
  let max = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      max = Math.max(max, dp[i][j]);
    }
  }

  console.log(max);
}
