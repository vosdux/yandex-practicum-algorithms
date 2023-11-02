/* 
ID: 94593148
Извлекаем количество строк и записываем в n.
Если n равно нулю, то возвращается пустая строка. 
В противном случае он переходит к итерации по оставшимся элементам входного массива.
Сначала будем считать префиксом всю первую строку и запишем в переменную prefix.
Мы распаковываем каждый элемент в виде строки и сравниваем ее префикс с переменной
prefix. Если префикс не совпадает, мы постепенно уменьшаем префикс,
удаляя последний символ, пока не будет найдено совпадение или префикс
не превратится в пустую строку.

Временная сложность: 
O(N * M), где N - количество строк, M - длина самой большой строки.

Пространственная сложность:
O(M), где M - длина самой большой строки.
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
  const n = Number(input[0]);

  if (n === 0) {
    return "";
  }

  let prefix = unpack(input[1]);
  for (let i = 2; i < n + 1; i++) {
    let string = unpack(input[i]);
    while (string.slice(0, prefix.length) !== prefix && prefix) {
      prefix = prefix.slice(0, -1);
    }
  }

  console.log(prefix);
}

function unpack(string) {
  let multiply = [];
  let symbol = [];
  let result = [];

  for (let char of string) {
    if (char.match(/\d/)) {
      multiply.push(parseInt(char));
      continue;
    }
    if (char === "[") {
      symbol.push([]);
      continue;
    }
    if (char === "]") {
      if (symbol.length === 1) {
        let text = "";
        let lastSymbol = symbol.pop().join("");
        const lastDigit = multiply.pop();
        for (let k = 0; k < lastDigit; k++) {
          text += lastSymbol;
        }
        result.push(text);
        continue;
      }
      let previous = symbol.pop().join("");
      let text = "";
      let lastDigit = multiply.pop();
      for (let k = 0; k < lastDigit; k++) {
        text += previous;
      }
      symbol[symbol.length - 1].push(text);
      continue;
    }
    if (symbol.length === 0) {
      result.push(char);
      continue;
    }
    symbol[symbol.length - 1].push(char);
  }

  return result.join("");
}
