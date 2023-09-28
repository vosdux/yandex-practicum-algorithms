/* ID: 90535635
Сначала необходимо построить граф, для этого используем список смежности.
В качестве рёбер будем использовать дороги и условия, которые обозначают
как связаны вершины. Нам небходимо выяснить, можно ли добраться в одну 
вершину двумя разными типами дорого. Если да, то карта не оптимльная.
Соответсвенно для этого в списке смежности нам нужно хранить информацию о
двух разных типов дорог. Если их города 1 в город 3 ведет дорога B, то
мы внесем ее в список смежности обычным способом adj[1].push(3). Но
если эта дорога типа R, то мы развернем ее и внесем ак adj[3].push(1).
В таком случае мы успешно храним информацию о двух типах дорог
и сможем решить задачу. Так как если в один город можно добраться
сразу двумя путями, то при таком списке смежности образуется цикл.
Задача сводится к поиску цилка, и если его нет, то карта оптимальная.
Для того что бы определить
существуют ли циклы в графе, будет использоваться обход в глубину с
определённым алгоритмом(isDfsCycle), который в случае обнаружения цикла
будет выдавать True. А для того чтобы были точно проверены все вершины,
запустим алгоритм для каждой из них(isCycle).

Временная сложность: O(V + E)

Пространственная сложность: O(E * V)

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
  const colors = new Array(peaksCount + 1).fill('w');

  for (let i = 1; i < peaksCount + 1; i++) {
    if (isDfsCycle(adjacency, colors, i)) {
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
      for (let i of adjacency[v]) {
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

   if (isCycle(adjacency)) {
    console.log('NO');
   } else {
    console.log('YES');
   }
}
