import {readFileSync} from 'fs';

const inputs = readFileSync('./day16-2.txt', 'utf8').split('\n');
const offset = Number.parseInt(inputs[0]);
// const frequencies = inputs[1].split('').map(input => Number.parseInt(input));
const frequencies = '03036732577212944063491565474664'.split('').map(input => Number.parseInt(input));

const basePattern = [0, 1, 0, -1];

function dupInput(input: number[], count: number) {
  const res = [];

  for (let i = 0; i < count; ++i) {
    res.push(...input);
  }

  return res;
}

function getOnesDigit(num: number) {
  return Math.abs(num) % 10;
}

function getComputedRepeatingPattern(repeat: number, index: number) {
  const patternLength = repeat * 4;
  const patternIndex = index % patternLength;

  if (patternIndex === patternLength - 1) {
    return basePattern[0];
  } else if (patternIndex < (repeat * 1) - 1) {
    return basePattern[0];
  } else if (patternIndex < (repeat * 2) - 1) {
    return basePattern[1];
  } else if (patternIndex < (repeat * 3) - 1) {
    return basePattern[2];
  } else if (patternIndex < (repeat * 4) - 1) {
    return basePattern[3];
  }

  throw new Error('wtf');
}

function computeForCell(inputs: number[], index: number) {
  let sum = 0;

  for (let i = 0; i < inputs.length; ++i) {
    sum += inputs[i] * getComputedRepeatingPattern(index + 1, i);
  }

  return getOnesDigit(sum);
}

async function phase(inputs: number[]) {
  const res = [];

  for (let i = 0; i < inputs.length; ++i) {
    const resolver = (resolve) => {
      const result = computeForCell(inputs, i);
      resolve(result);
    }

    res.push(new Promise(resolver));
  }

  return Promise.all(res);
}

function run() {
  const startTime = Date.now();

  let currFreq = dupInput(frequencies, 500);

  for (let i = 0; i < 100; ++i) {
    process.stdout.write(`p${i}`)
    currFreq = phase(currFreq);
  }

  const endTime = Date.now();

  const result = currFreq.join('');
  console.log(100, endTime - startTime, result.includes('74527'), )
}

run();

// console.log(currFreq.join('').substr(offset, 8));
