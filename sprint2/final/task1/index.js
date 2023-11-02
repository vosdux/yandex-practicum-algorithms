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

class Dek {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.head = 0;
    this.tail = 0;
    this.size = 0;
    this.queue = new Array(maxSize).fill(null);
  }

  _isFull() {
    return this.size === this.maxSize;
  }

  _isEmpty() {
    return this.size === 0;
  }

  pushBack(value) {
    if (this._isFull()) {
      console.log("error");
      return;
    }

    this.queue[this.tail] = value;

    if (this.tail + 1 > this.maxSize - 1) {
      this.tail = 0;
    } else {
      this.tail += 1;
    }

    this.size += 1;
  }

  pushFront(value) {
    if (this._isFull()) {
      console.log("error");
      return;
    }

    if (this.head - 1 < 0) {
      this.head = this.maxSize - 1;
    } else {
      this.head -= 1;
    }

    this.queue[this.head] = value;
    this.size += 1;
  }

  popFront() {
    if (this._isEmpty()) {
      console.log("error");
      return;
    }

    console.log(this.queue[this.head]);
    this.queue[this.head] = null;

    if (this.head + 1 > this.maxSize - 1) {
      this.head = 0;
    } else {
      this.head += 1;
    }

    this.size -= 1;
  }

  popBack() {
    if (this._isEmpty()) {
      console.log("error");
      return;
    }

    if (this.tail - 1 < 0) {
      this.tail = this.maxSize - 1;
    } else {
      this.tail -= 1;
    }

    console.log(this.queue[this.tail]);
    this.queue[this.tail] = null;
    this.size -= 1;
  }
}

function solve() {
  const maxSize = Number(input[1]);

  const dek = new Dek(maxSize);

  for (let i = 2; i < input.length; i++) {
    const command = input[i];

    if (command.indexOf("push_front") >= 0) {
      const [text, value] = command.split(" ");
      dek.pushFront(Number(value));
    }

    if (command.indexOf("push_back") >= 0) {
      const [text, value] = command.split(" ");
      dek.pushBack(Number(value));
    }

    if (command === "pop_front") {
      dek.popFront();
    }

    if (command === "pop_back") {
      dek.popBack();
    }
  }
}
