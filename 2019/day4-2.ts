import {readFileSync} from 'fs';

const inputs = readFileSync('./day4-2.txt', 'utf8');

const [low, high] = inputs.split('-').map(num => parseInt(num))

function match(num: number) {
  const digits = String(num).split('');

  let repeating = false;
  let growing = true;

  for (let i = 0; i < digits.length - 1; ++i) {
    if (digits[i] === digits[i + 1] && (i + 2 === digits.length || digits[i] !== digits[i + 2]) && (i - 1 === -1 || digits[i] !== digits[i - 1])) {
      repeating = true;
    }
  }

  for (let i = 0; i < digits.length - 1; ++i) {
    if (digits[i] > digits[i + 1]) {
      growing = false;
    }
  }

  return repeating && growing;
}

let counter = 0;

for (let i = low; i < high; ++i) {
  counter += match(i) ? 1 : 0;
}

console.log(counter);