/*
ID: 89295205
-- ПРИНЦИП РАБОТЫ --
Я создал хеш таблицу, в которой индексом является слово, а значением еще одна хеш таблица,
в которой индекс - номер документа, а значение количество этого слова в этом документе.
Пример:
{
  "Word": {
    '1' //номер документа : 10 // встретилось раз в этом документе
  }
}

Затем я прохожусь по словам поисковой фразы, ищу их в хеш таблице. Если слово
встретилось, то забираю идексы всех документов, которые его содержат и начинаю считать
релевантность для них в отдельной таблице.
{
  "1" //номер документа : 5 // его релевантноть
}

В конце забираю 5 самых релевантных и сортирую их как указано в задаче и вывожу


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Мы по очереди достаем каждое слово поискового запроса из хеш таблице (ели оно там есть)
и модем узнать все документы, в которых это слово встречается и количество вхождений,
поэтому без проблем можем посчитать релевантность поискового запроса для каждого документа

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
0(n) - построение хеш таблицы. Где n - количество всех слов во всех документах
O(n) - Поиск по запросам. Где n - количество всех слов в поиковых запросах

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(n + k)
n - хеш таблица с данными о словах
k - хеш таблица для значений релевантности
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
  const map = {};

  for (let i = 1; i < n + 1; i++) {
    const words = input[i].split(" ");
    
    for (let j = 0; j < words.length; j++) {

      const word = words[j];
      const wordInMap = map[word];

      if (!wordInMap) {
        map[word] = {
          [i]: 1
        }
      } else {
        if (wordInMap[i]) {
          wordInMap[i] = wordInMap[i] + 1
        } else {
          wordInMap[i] = 1;
        }
      }
    }
  }

  const searchNumber = Number(input[n + 1]);

  for (let j = n + 2; j < n + 2 + searchNumber; j++) {
    const query = input[j].split(' ');
    const res = {};
    const searched = [];

    for (let k = 0; k < query.length; k++) {
      const word = query[k];
      const wordInMap = map[word];

      if (searched.includes(word)) {
        continue;
      }
      searched.push(word);

      if (wordInMap) {
        const data = Object.entries(wordInMap);
        data.forEach((item) => {
          const [key, value] = item;
          
          if (res[key]) {
            res[key] = res[key] + value;
          } else {
            res[key] = value;
          }
        });
      }

      searched.push(word)
    }

    const sorted = Object.entries(res).sort((a, b) => b[1] - a [1]).map(item => item[0]).splice(0, 5);

    console.log(sorted.join(' '))
  }
}
