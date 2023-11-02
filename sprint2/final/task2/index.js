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

class Stack {
  stack = [];

  push(value) {
    this.stack.push(value);
  }

  pop() {
    return this.stack.pop();
  }
}

const operations = ["+", "-", "*", "/"];

function solve() {
  const arr = input.split(" ");
  const stack = new Stack();

  arr.forEach((item) => {
    if (operations.includes(item)) {
      const operand2 = stack.pop();
      const operand1 = stack.pop();

      switch (item) {
        case "+":
          stack.push(operand1 + operand2);
          break;

        case "-":
          stack.push(operand1 - operand2);
          break;

        case "*":
          stack.push(operand1 * operand2);
          break;

        default:
          stack.push(Math.floor(operand1 / operand2));
      }
    } else {
      stack.push(Number(item));
    }
  });

  console.log(stack.pop());
}
