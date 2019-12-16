import {readFileSync} from 'fs';

const inputs = readFileSync('./day8-1.txt', 'utf8').split('\n');

const pixels = inputs[0].split('').map(_ => Number.parseInt(_));

const width = 25;
const height = 6;

function split(arr: number[], n: number) {
  const res = [];
  let counter = 0;

  while (counter < arr.length) {
      const curr = [];

      for (let i = 0; i < n; ++i) {
          curr.push(arr[counter]);
          counter += 1;
      }

      res.push(curr);
  }

  return res;
}

const layers = split(pixels, 25 * 6).reverse();

const res = layers[0].slice();

for (let i = 0; i < res.length; ++i) {
  for (let j = 0; j < layers.length; ++j) {
    if (layers[j][i] !== 2) {
      res[i] = layers[j][i];
    }
  }
}

const rows = split(res, 25);

rows.forEach(row => {
  console.log(row.map(_ => _ === 0 ? ' ' : _).join(''));
});
