import {readFileSync} from 'fs';

const inputs = readFileSync('./day16-1.txt', 'utf8').split('\n');
const frequencies = inputs[0].split('').map(input => Number.parseInt(input));
const offset = Number.parseInt(frequencies.slice(0, 7).join(''));

function getOnesDigit(num: number) {
  return Math.floor(Math.abs(num) % 10);
}

function dupInput(input: number[], count: number) {
  const res = [];

  for (let i = 0; i < count; ++i) {
    res.push(...input);
  }

  return res;
}

function phase(inputs: number[]) {
  const res = [];
  let runningSum = 0;

  for (let i = inputs.length - 1; i >= 0; --i) {
    runningSum += inputs[i];

    res.push(getOnesDigit(runningSum));
  }

  return res.reverse();
}

function run() {
  const startTime = Date.now();

  const rightHalfFrequencies = dupInput(frequencies, 10000).slice(offset);

  let currFreq = rightHalfFrequencies;

  for (let i = 0; i < 100; ++i) {
    currFreq = phase(currFreq);
  }

  const endTime = Date.now();

  const result = currFreq.join('');
  console.log(100, endTime - startTime, result.substr(0, 8));
}

run();

// console.log(currFreq.join('').substr(offset, 8));
