/**
Comment it before submitting 
class CNode {  
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
*/

function isBst(node) {
  if (node === null) {
    return [true, null, null];
  }

  const [isBstL, minL, maxL] = isBst(node.left)
  const [isBstR, minR, maxR] = isBst(node.right)

  const isBstNode = (
    isBstL && isBstR 
    && (maxL === null || node.value > maxL)
    && (minR === null || node.value < minR)
  );

  const min = [minL, node.value, minR].filter(elem => elem !== null);
  const max = [maxL, node.value, maxR].filter(elem => elem !== null);
  const minValue = Math.min(...min);
  const maxValue = Math.max(...max);

  return [isBstNode, minValue, maxValue];
}

function solution(root) {
  return isBst(root)[0]
}
