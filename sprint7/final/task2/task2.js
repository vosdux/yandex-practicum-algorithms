/* 
ID: 91965431
Считаем сумму всех элементов последовательности

Если сумма нечетная, то разбить последовательность с выполнением условий
задачи нельзя. Возвращаем False

Находим половину суммы и инициализируем массив:
- первый элемент - True (сумма пустого множества равна 0)
- остальные элементы - False
- длина массива равна половине суммы элементов последовательности + 1

Для каждого элемента последовательности определяем какие суммы могут быть
составлены из него и ранее обработанных элементов последовательности.
Проверяем, если в какой-то момент может быть составлена сумма, равная
половине суммы элементов последовательности и обрабатывается последний
элемент массива, то возвращаем True.

Возвращаем значение последнего элемента массива: True - если полусумму
элементов последовательности можно составить, False - в противном случае.

https://ru.wikipedia.org/wiki/Задача_разбиения_множества_чисел

Временная сложность:
O(N * K), где N число элементов во входном множестве,
а K - сумма элементов

Пространственная сложность: 
O(n) - все элементы входного множества
O(n / 2) - для булевого массива
O(n + n / 2) - общая сложность
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
  const nums = input[1].split(" ").map(Number);
  const numsSum = nums.reduce((total, num) => total + num, 0);

  if (numsSum % 2 !== 0) {
    console.log("False");
    return;
  }

  const target = numsSum / 2;
  const dp = Array(target + 1).fill(false);

  dp[0] = true;

  for (const num of nums) {
    console.log(num, 'num');
    console.log(target, 'target');
    if (num === target) {
      console.log("True");
      return;
    }

    if (num > target) {
      console.log("False");
      return;
    }

    for (let j = target; j >= num; j--) {
      dp[j] = dp[j - num] || dp[j];
      console.log(dp, 'dp')
      if (dp[target]) {
        console.log("True");
        return;
      }
    }
  }

  console.log("False");
}
