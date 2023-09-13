// class CNode {  
//     constructor(value) {  
//         this.value = value;  
//         this.left = null;  
//         this.right = null;  
//     }  
// }

function findMax(node) {
  let max = 0;
  if (node.left) {
      max = Math.max(max, findMax(node.left));
  }

  if (node.right) {
      max = Math.max(max, findMax(node.right));
  }

  return Math.max(max, node.value);
}

function solution(root) {
  return findMax(root);
}

function test() {
  var node1 = new CNode(1);
  var node2 = new CNode(-5);
  var node3 = new CNode(3);
  node3.left = node1;
  node3.right = node2;
  var node4 = new CNode(2);
  node4.left = node3;
  console.assert(solution(node4) === 3);
}