/* 
ID: 91963132
Для того чтобы посчитать минимальное кол-во необходимых правок,
нужно знать предыдущие значения и текущие(два ряда матрицы), поэтому
вместо двумерного массива dp, я храню два массива prev и result. 
Если две буквы совпадают, то result[j] = prev[j - 1], в противном случае
формула переход динамики - min(result[j - 1], prev[j], prev[j - 1]) + 1
Ответ будет находится в конце массива result.

Временная сложность: 
O(N * M) N и M - длины строк

Пространственная сложность:
O(2 * N) два массива длиной равной N, где N длина меньшей строки
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
  let s1 = input[0];
  let s2 = input[1];
  if (s2.length > s1.length) {
    [s1, s2] = [s2, s1];
  }
  const m = s1.length;
  const n = s2.length;
  let result = Array(n + 1)
    .fill(0)
    .map((_, i) => i);
  let prev = Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let k = 0; k < prev.length; k++) {
      prev[k] = 0;
    }
    prev[0] = i;
    [prev, result] = [result, prev];

    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        result[j] = prev[j - 1];
      } else {
        result[j] = Math.min(result[j - 1], prev[j], prev[j - 1]) + 1;
      }
    }
  }

  console.log(result[n]);
}
