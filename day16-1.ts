import {readFileSync} from 'fs';

const inputs = readFileSync('./day16-1.txt', 'utf8').split('\n');
const frequencies = inputs[0].split('').map(input => Number.parseInt(input));

const basePattern = [0, 1, 0, -1];

function getOnesDigit(num: number) {
  return Math.floor(Math.abs(num) % 10);
}

function computeRepeatingPattern(repeat: number) {
  const res = [];

  basePattern.forEach(pattern => {
    for (let i = 0; i < repeat; ++i) {
      res.push(pattern);
    }
  });

  // offset by one
  const first = res.shift();
  res.push(first);

  return res;
}

function phase(inputs: number[]) {
  const res = [];

  for (let i = 0; i < inputs.length; ++i) {
    const pattern = computeRepeatingPattern(i + 1);
    let sum = 0;

    for (let j = 0; j < inputs.length; ++j) {
      sum += inputs[j] * pattern[j % pattern.length];
    }

    res.push(getOnesDigit(sum));
  }

  return res;
}

let currFreq = frequencies;

console.log(Date.now())

for (let i = 0; i < 100; ++i) {
  currFreq = phase(currFreq);
}
console.log(Date.now())

console.log(currFreq.join('').substr(0, 8));

