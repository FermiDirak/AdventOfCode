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

const layers = split(pixels, 25 * 6);

const layerZerosCount = layers.map((layer) => {
  return layer.reduce((a, b) => {
    if (b === 0) {
      a += 1;
    }
    return a;
  }, 0);
})

const layerOnesCount = layers.map((layer) => {
  return layer.reduce((a, b) => {
    if (b === 1) {
      a += 1;
    }
    return a;
  }, 0);
})

const layerTwosCount = layers.map((layer) => {
  return layer.reduce((a, b) => {
    if (b === 2) {
      a += 1;
    }
    return a;
  }, 0);
})

const minZero = Math.min(...layerZerosCount);

const i = layerZerosCount.findIndex(count => count === minZero);

console.log(layerOnesCount[i] * layerTwosCount[i]);