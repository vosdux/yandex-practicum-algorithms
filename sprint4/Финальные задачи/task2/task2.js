/*
ID: 89365605
-- ПРИНЦИП РАБОТЫ --
Для хранения данных используется массив. Хеш получаем путем деления с остатком ключа на
размер хеш таблицы. Размер таблицы простое число, подобранное методом эксперемента - 6000103.
Отрицательного хеша не бывает. По хешу вставляем данные в массив.
Для решения коллизий используется метод цепочек. Но вместо стандартного связанного списка
использую массив. Данные хранятся в таком формате:
[
  [
    [key, value]
  ],
  [ Здесь сполучилась коллизия и по этому хешу в массиве лежат несколько элементов
    [key, value],
    [key, value],
  ]
]

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Получаем рабочую хеш таблицу, которая сохоранит все нужные данные за отведенное время

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Все операции выполняются за O(1) в среднем, O(n) в худшем

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(n), где n - размер массива в хэш-таблице,

*/

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

const out = [];

class NewMap {
  data = new Array(6000103);

  _getHash(key) {
    if (key < 0) {
      key = key * -1;
    }
    return key % this.data.length;
  }

  put(key, value) {
    const hash = this._getHash(key);
    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i][0] === key) {
          this.data[hash][i] = [key, value];
          return;
        }
      }

      this.data[hash].push([key, value]);
    } else {
      this.data[hash] = [[key, value]];
    }
  }

  delete(key) {
    const hash = this._getHash(key);

    if (this.data[hash] && this.data[hash].length) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i][0] === key) {
          out.push(`${this.data[hash][i][1]}\n`);

          this.data[hash].splice(i, 1);
          return;
        }
      }
      out.push("None\n");
    } else {
      out.push("None\n");
    }
  }

  get(key) {
    const elem = this.data[this._getHash(key)];

    if (elem && elem.length) {
      for (let i = 0; i < elem.length; i++) {
        if (elem[i][0] === key) {
          out.push(`${elem[i][1]}\n`);
          return;
        }
      }
      out.push("None\n");
    } else {
      out.push("None\n");
    }
  }
}

function solve() {
  const map = new NewMap();

  for (let i = 1; i < input.length; i++) {
    const [command, key, value] = input[i].split(" ");

    if (command === "get") {
      map.get(key);
    } else if (command === "put") {
      map.put(key, value);
    } else {
      map.delete(key);
    }
  }

  process.stdout.write(`${out.join("")}`);
}
