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

map = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};

const data = [];
function generatePhrase(numbers, prefix) {
  if (numbers.length === 0) {
    data.push(prefix);
    return;
  }

  const newNumbers = [...numbers];
  newNumbers.shift();

  for (let i of map[numbers[0]]) {
    generatePhrase(newNumbers, `${prefix}${i}`);
  }
}

function solve() {
  const numbers = input.split("");
  generatePhrase(numbers, "");
  console.log(data.join(" "));
}
