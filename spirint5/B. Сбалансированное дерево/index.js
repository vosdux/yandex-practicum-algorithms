/**
Comment it before submitting
class CNode {  
    constructor(value) {  
        this.value = value;  
        this.left = null;  
        this.right = null;  
    }  
}
*/

function getHeight(root) {
  if (root === null) {
    return 0
  }

  return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
}

function solution(root) {
  if (root === null) {
    return true;
  }

  const rightHeight = getHeight(root.right)
  const leftHeight = getHeight(root.left)
  const rightTreeCorrect = solution(root.right)
  const leftTreeCorrect = solution(root.left)

  let result = rightHeight - leftHeight;

  if (result < 0) {
    result = result * -1;
  }

  if (result > 1 || !rightTreeCorrect || !leftTreeCorrect) {
    return false;
  }

  return true;
}

function test() {
  var node1 = new CNode(1);
  var node2 = new CNode(-5);
  var node3 = new CNode(3);
  node3.left = node1;
  node3.right = node2;
  var node4 = new CNode(10);
  var node5 = new CNode(2);
  node5.left = node3;
  node5.right = node4;
  console.assert(solution(node5));
}
