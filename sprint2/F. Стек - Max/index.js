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
  input.shift();

  class StackMaks {
    items = [];

    push(x) {
      this.items.push(x);
    }

    pop() {
      if (!this.items.length) {
        console.log("error");
        return;
      }
      this.items.pop();
    }

    get_max() {
      if (!this.items.length) {
        console.log("None");
        return;
      }

      let max = Number(this.items[0]);

      for (let i = 1; i < this.items.length; i++) {
        const number = Number(this.items[i]);
        if (number > max) {
          max = number;
        }
      }

      console.log(max);
    }
  }

  const stack = new StackMaks();

  input.forEach((item) => {
    if (item.indexOf("push") >= 0) {
      const splitted = item.split(" ");
      stack.push(splitted[1]);
    } else if (item === "get_max") {
      stack.get_max();
    } else if (item === "pop") {
      stack.pop();
    }
  });
}
