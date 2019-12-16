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
}

function buildTree(node: string) {
  const tree = new Tree(node);
  const children = orbits.filter(orbit => orbit[0] === node);
  tree.children = children.map(child => buildTree(child[1]));
  return tree;
}

const tree = buildTree('COM');

function genPath(tree: Tree, target: string, path: string[] = []) {
  if (tree.datum === target) {
    return path;
  }

  path.push(tree.datum);

  for (let i = 0; i < tree.children.length; ++i) {
    const child = tree.children[i];
    const res = genPath(child, target, path);

    if (res) {
      return res;
    }
  }

  path.pop();

  return null;
}

const pathToYOU = genPath(tree, 'YOU');
const pathToSAN = genPath(tree, 'SAN');
const intersection = [...pathToYOU].filter(x => new Set(pathToSAN).has(x));

console.log(JSON.stringify(pathToYOU));
console.log(JSON.stringify(pathToSAN));
console.log(JSON.stringify(intersection));

console.log(pathToSAN.length, pathToYOU.length, (2 * intersection.length));
console.log(pathToSAN.length + pathToYOU.length - (2 * intersection.length));