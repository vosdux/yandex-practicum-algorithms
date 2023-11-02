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
  // Функция возвращает все позиции вхождения шаблона в тексте.
  let result = [];
  const p = input[1];
  const str = input[0];
  delete input;
  const newPattern = input[2];
  let s = `${p}#${str}`;
  let π = []
  π[0] = 0;
  let π_prev = 0;
  for (let i = 1; i < s.length; i++) {
    let k = π_prev;
    while (k > 0 && s[k] !== s[i]) {
      k = π[k - 1];
    }
    if (s[k] === s[i]) {
      k++;
    }
    // Запоминаем только первые |p| значений π-функции.
    if (i < p.length) {
      π[i] = k;
    }
    // Запоминаем последнее значение π-функции.
    π_prev = k;
    // Если значение π-функции равно длине шаблона, то вхождение найдено.
    if (k === p.length) {
      // i - это позиция конца вхождения шаблона.
      // Дважды отнимаем от него длину шаблона, чтобы получить позицию начала:
      //  - чтобы «переместиться» на начало найденного шаблона,
      //  - чтобы не учитывать добавленное "pattern#".
      result.push(i - 2 * p.length);
    }
  }

  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (!result.includes(i)) {
      newStr += str[i];
    } else {
      newStr += newPattern;
      i += p.length - 1;
    }
  }

  console.log(newStr);
}
