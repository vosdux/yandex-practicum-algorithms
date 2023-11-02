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

  class StackMaxEffective {
    items = [];
    maxArr = [];

    push(x) {
      const number = Number(x);
      this.items.push(number);

      if (!this.maxArr.length) {
        this.maxArr.push(number);
        return;
      }

      if (number >= this.maxArr[this.maxArr.length - 1]) {
        this.maxArr.push(number);
      }
    }

    pop() {
      if (!this.items.length) {
        console.log("error");
        return;
      }
      const last = this.items.pop();

      if (last === this.maxArr[this.maxArr.length - 1]) {
        this.maxArr.pop();
      }
    }

    get_max() {
      if (!this.items.length) {
        console.log("None");
        return;
      }

      console.log(this.maxArr[this.maxArr.length - 1]);
    }
  }

  const stack = new StackMaxEffective();

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
