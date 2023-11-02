const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const input = [];

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input.push(line);
});

// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

function solve() {
  const brackets = input[0].split("");
  const stack = [];
  const bracketsMap = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  const opened = Object.keys(bracketsMap);
  let isFailed = false;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    if (opened.includes(bracket)) {
      stack.push(bracket);
    } else {
      const lastInStack = stack[stack.length - 1];
      if (bracketsMap[lastInStack] === bracket) {
        stack.pop();
        continue;
      } else {
        isFailed = true;
        break;
      }
    }
  }

  if (isFailed || stack.length) {
    console.log("False");
  } else {
    console.log("True");
  }
}
