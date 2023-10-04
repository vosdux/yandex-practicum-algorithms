/*
ID: 89547495
Сначала ищу нужное мне значение, руководствуясь правилами BST
Если его нет, возвращают корневую ноду обратно без изменений.

Если значение найдено, то:
1. Если у него нет дочерних элементов, просто выкидываю его из дерева
2. Если есть только один дочерний элемент, то его я присваиваю элементу,
который является родительским для найденного. Если же наш элемент корневой, то просто
делаю дочерний элемент новой головой дерева
3. Если есть оба элемента. То нахожу самое большое значение в левом поддереве (d1).
Если у него нет детей, я просто вставляю его на место удаленного.
Если дети есть (это может быть только левый ребенок), то его я присоединяю к родителю(d1.parent).
А наш искомый d1 ставлю на место удаленного элемента


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
https://practicum.yandex.ru/learn/algorithms/courses/7f101a83-9539-4599-b6e8-8645c3f31fad/sprints/134503/topics/e7dbf42a-fd5a-434b-990d-9cfe0e3a10c8/lessons/03eb9b46-4c74-43b4-8d00-a125aeed47bf/

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Сложность удаления узла - O(h), где h –— высота дерева. Т.к в худшем случае мы обойдем только одно поддерево относительно корневого элемента

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(1) - так как я создаю фиксированное количество вспомогательных переменных, не зависимо от размера дерева
*/

/**
Comment it before submitting 
class Node { 
    constructor(value, left = null, right = null) { 
        this.value = value; 
        this.left = left; 
        this.right = right; 
    } 
}
**/

function findRight(root, parent) {
  let result = root;
  let currParent = parent;
  while (true) {
    if (result.right) {
      currParent = result;
      result = result.right
    } else {
      break;
    }
  }

  return { right: result, rightParent: currParent };
}

function remove(node, key) {
  if (!node) {
    return node;
  }

  let parent = null;
  let currentNode = node;
  let direction = "";

  while (true) {
    if (key > currentNode.value) {
      if (!currentNode.right) {
        break;
      } else {
        parent = currentNode;
        currentNode = currentNode.right;
        direction = "right";
        continue;
      }
    }

    if (key < currentNode.value) {
      if (!currentNode.left) {
        break;
      } else {
        parent = currentNode;
        currentNode = currentNode.left;
        direction = "left";
        continue;
      }
    }

    if (key === currentNode.value) {
      if (!currentNode.left && !currentNode.right) {
        if (parent) {
          parent[direction] = null;
        } else {
          node = null
        }
        break;
      }

      if (!currentNode.left) {
        if (parent) {
          parent[direction] = currentNode.right;
        } else {
          node = currentNode.right;
        }
        
        break;
      }

      if (!currentNode.right) {
        if (parent) {
          parent[direction] = currentNode.left;
        } else {
          node = currentNode.left
        }
        break;
      }

      const { right, rightParent } = findRight(
        currentNode.left,
        null
      );

      if (rightParent) {
        if (right.left) {
          rightParent.right = right.left;
        } else {
          rightParent.right = null;
        }
      } else {
        if (right.left) {
          currentNode.left = right.left;
        } else {
          currentNode.left = null;
        }
      }
      

      right.left = currentNode.left;
      right.right = currentNode.right

      if (parent) {
        parent[direction] = right;
        break;
      } else {
        return right;
      }
    }
  }
  return node;
}

function test() {
  var node1 = new Node(2, null, null);
  var node2 = new Node(3, node1, null);
  var node3 = new Node(1, null, node2);
  var node4 = new Node(6, null, null);
  var node5 = new Node(8, node4, null);
  var node6 = new Node(10, node5, null);
  var node7 = new Node(5, node3, node6);
  var newHead = remove(node7, 10);
  console.assert(newHead.value === 5);
  console.assert(newHead.right === node5);
  console.assert(newHead.right.value === 8);
}
