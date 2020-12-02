import {readFileSync} from 'fs';

const inputs = readFileSync('./day6-1.txt', 'utf8').split('\n');

const orbits = inputs.map(input => input.split(')'));

class Tree {
  datum: any;
  children: any[];

  constructor(datum: any) {
    this.datum = datum;
    this.children = [];
  }

  dfs(cb: (datum: any, depth: number) => void) {
    function helper(tree: Tree, cb: (datum: any, depth: number) => void, depth: number = 0) {
      cb(tree.datum, depth);
      tree.children.forEach(child => { helper(child, cb, depth + 1); })
    }

    helper(this, cb, 0);
  }
}

function buildTree(node: string) {
  const tree = new Tree(node);
  const children = orbits.filter(orbit => orbit[0] === node);
  tree.children = children.map(child => buildTree(child[1]));

  return tree;
}

const tree = buildTree('COM');

let sum = 0;
tree.dfs((datum, depth) => {
  sum += depth;
});
console.log(sum);
