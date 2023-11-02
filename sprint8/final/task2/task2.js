/*
ID: 95320307

Подготовим данные. Запускаем функцию isSplitWords, которая проверяет
может ли данная строка быть разделена на слова, которые существуют
в переданном массиве words.

Функция создает древовидную структуру данных с помощью функции createTree и класса Node,
а затем инициализирует динамический массив dp, для первого элемента которого
установлено значение true, а для остальных элементов - значение false.
Затем выполняется итерация по символам строки и проверяем,
является ли значение dp в текущем индексе истинным.
Если это так, он выполняет итерацию по оставшимся символам строки и проверяет,
является ли текущий узел конечным узлом.
Если это так, то он устанавливает значение dp для текущего индекса равным true.

Наконец, функция возвращает значение по последнему индексу массива dp,
которое указывает, может ли строка быть разбита на слова из заданного массива words.

Временная сложность: 
Построение префиксного дерева - O(L), где L — суммарная длина всех слов во множестве.
Прохождение по префиксному дереву - O(n^2), где n - количество символов в строке.

Пространственная сложность:
Префиксное дерево - O(L), где L — суммарная длина всех слов во множестве.
Массив - O(n), где n - количество символов в строке.
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

function solve() {
  const string = input[0];
  const words = [];

  for (let i = 2; i < Number(input[1]) + 2; i++) {
    words.push(input[i]);
  }

  let result = isSplitWords(string, words);
  if (result) {
    console.log("YES");
  } else {
    console.log("NO");
  }
}

class Node {
  constructor(value, next = {}) {
    this.value = value;
    this.next = next;
    this.terminal = false;
  }
}

function createTree(words) {
  const root = new Node("");
  for (let word of words) {
    let node = root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      node.next[char] = node.next[char] || new Node(char);
      node = node.next[char];
    }
    node.terminal = word.length;
  }
  return root;
}

function isSplitWords(string, words) {
  const root = createTree(words);
  const dp = [true, ...new Array(string.length).fill(false)];
  for (let i = 0; i < string.length; i++) {
    let node = root;
    if (dp[i]) {
      for (let j = i; j < string.length + 1; j++) {
        if (node.terminal) {
          dp[j] = true;
        }
        if (j === string.length || !node.next[string[j]]) {
          break;
        }
        node = node.next[string[j]];
      }
    }
  }
  return dp[dp.length - 1];
}
