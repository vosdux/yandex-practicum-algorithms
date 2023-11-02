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

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  head = null;
  last = null;
  size = 0;

  getSize() {
    console.log(this.size);
  }

  get() {
    if (this.size === 0) {
      console.log("error");
    } else {
      console.log(this.head.value);
      const head = this.head;
      this.head = this.head.next;
      head.next = null;
      this.size -= 1;
    }
  }

  put(x) {
    const node = new Node(x, null);
    if (this.head === null) {
      this.head = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = this.last.next;
    }
    this.size += 1;
  }
}

function solve() {
  input.shift();

  const queue = new Queue();

  input.forEach((item) => {
    if (item.indexOf("put") >= 0) {
      const splitted = item.split(" ");
      queue.put(Number(splitted[1]));
    } else if (item === "size") {
      queue.getSize();
    } else if (item === "get") {
      queue.get();
    }
  });
}
