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
  const [n, k] = input[0].split(" ").map(Number);
  const dp = new Array(n + 1).fill(-1);
  dp[0] = 0;
  dp[1] = 1;
  const mod = 10 ** 9 + 7;
  const res = jumping(n, k, dp, mod);
  console.log(res);
}

function jumping(n, k, dp, mod) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  const id = n >= k ? k : n;

  let res = 0;
  for (let i = n - id; i < n; i++) {
    if (dp[i] === -1) {
      let tmp = 0;
      let tmpid = 0;

      if (i >= k) {
        tmpid = i - k;
      } else {
        tmpid = 0;
      }

      for (let j = tmpid; j < i; j++) {
        console.log(j, 'j')
        if (dp[j] !== -1) {
          tmp += dp[j];
        } else {
          tmp += jumping(j, k, dp, mod);
        }
      }


      dp[i] = tmp % mod;
    }

    res += dp[i] % mod;
  }

  return res % mod;
}
