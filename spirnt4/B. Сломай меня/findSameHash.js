/* Функция для поиска двух одинаковых хешей 
которая генерирует рандомные строки и запоминает их хеш
как только будут найдены два одинаковых хеша, функция вернет строки из которых они получились
*/

function getRandomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function getHash(str, a, m) {
  let result = 0;
  for (let symbol of str) {
    const code = symbol.charCodeAt(0);
    result = (result * a + code) % m
  }
  return result;
}

const obj = {};

function findSameHash() {
  while(true) {
    const string = getRandomString(20);
    const hash = getHash(string, 1000, 123987123);
  
    if (obj[hash]) {
      return {
        first: obj[hash],
        second: string,
      }
    } else {
      obj[hash] = string
    }
  }
}

const res = findSameHash();
console.log(res, 'res');