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

function insertion(node, key) {
  if (node.value > key) {
    if (node.left === null) {
      node.left = { value: key, left: null, right: null };
    } else {
      insert(node.left, key);
    }
  }

  if (node.value <= key) {
    if (node.right === null) {
      node.right = { value: key, left: null, right: null };
    } else {
      insert(node.right, key);
    }
  }
}

function insert(node, key) {
  insertion(node, key);
  return node;
}

function test() {
  var node1 = new Node(7, null, null);
  var node2 = new Node(8, node1, null);
  var node3 = new Node(7, null, node2);
  var newHead = insert(node3, 6);
  console.assert(newHead === node3);
  console.assert(newHead.left.value === 6);
}
