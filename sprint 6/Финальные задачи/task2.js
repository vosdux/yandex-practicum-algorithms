/* ID: 69348107
Необходимо составить остовное дерево. При составлении оставного дерева
необходимо брать и сохранять вершину с самым тяжёлым ребром, которое к ней
ведёт.
Для реализации данного алгоритма используются функции find_mst и add_vertex.
При запуске функции find_mst, берётся самая первая вершина и запускается
функция add_vertex, которая добавляет все рёбра с вершинами у взятой вершины
в очередь с приоритетом(edges) и удаляет её из множества not_added(т.к.
данная вершина уже будет добавлена и больше её обрабатывать не нужно). После
данной операции, в функции find_mst выбирается максимальная вершина из
очереди с приоритетом, и повторяется весь алгоритм заново, пока все вершины
с рёбрами не будут добавлены в оставное дерево(пока есть вершины, которые не
добавленные в остов - not_added и рёбра исходящие из оставного дерева -
edges).

Временная сложность: O(E*logV) E — количество рёбер в графе, а V — количество
вершин. Т.к. используется очередь с приоритетом.

Пространственная сложность: O(V*E)

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

const B = 'B';
const R = 'R';

function isCycle(adjacency) {
  const peaksCount = Object.keys(adjacency).length;
  const colors = new Array(peaksCount).fill('w');

  for (let i = 0; i < peaksCount; i++) {
    if (isDfsCycle(adjacency, colors, 1)) {
      return true
    }
    
  }
  return false
}


function isDfsCycle(
  adjacency, colors, startVertex
) {
  const stack = [startVertex];

  while (stack.length) {
    const v = stack.pop();

    if (colors[v] === 'w') {
      colors[v] = 'g';
      stack.push(v);
      for (let i in adjacency[v]) {
        if (colors[i] === 'w') {
          stack.push(i);
        } else if (colors[i] === 'g') {
          return true
        }
      }
    } else if (colors[v] === 'g') {
      colors[v] = 'b';
    }
  }

  return false
}

function solve() {
   const vert = Number(input[0]);
   const adjacency = {};

   for (let i = 1; i < vert + 1; i++) {
    adjacency[i] = [];
   }
   
   for (let i = 1; i < vert; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const road = input[i][j];

      if (road === B) {
        adjacency[i].push(i + j + 1);
      } else if (road === R) {
        adjacency[i + j + 1].push(i)
      }
    }
   }

   console.log(adjacency, 'adjacency')

   if (isCycle(adjacency)) {
    console.log('NO');
   } else {
    console.log('YES')
   }
}
