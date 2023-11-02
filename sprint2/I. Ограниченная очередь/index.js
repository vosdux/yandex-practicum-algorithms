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
  const size = input.shift();

  class MyQueueSized {
    items = [];

    constructor(maxSize) {
      this.maxSize = maxSize;
    }

    push(x) {
      if (this.items.length < this.maxSize) {
        const number = Number(x);
        this.items.push(number);
      } else {
        console.log("error");
      }
    }

    pop() {
      if (!this.items.length) {
        console.log("None");
        return;
      }

      const elem = this.items.shift();
      console.log(elem);
    }

    peek() {
      if (!this.items.length) {
        console.log("None");
        return;
      }

      const elem = this.items[0];
      console.log(elem);
    }

    size() {
      console.log(this.items.length);
    }
  }

  const queue = new MyQueueSized(size);

  input.forEach((item) => {
    if (item.indexOf("push") >= 0) {
      const splitted = item.split(" ");
      queue.push(splitted[1]);
    } else if (item === "size") {
      queue.size();
    } else if (item === "pop") {
      queue.pop();
    } else if (item === "peek") {
      queue.peek();
    }
  });
}
