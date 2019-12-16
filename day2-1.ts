import {readFileSync} from 'fs';

const inputs = readFileSync('./day2-1.txt', 'utf8').split('\n');

const program = inputs[0].split(',').map(num => Number.parseInt(num));

function runProgram(program: number[]) {
  let currOp = 0;

  while (true) {
    const operation = program[currOp * 4];

    if (operation === 99) {
      break;
    }

    const ptrs = [program[currOp * 4 + 1], program[currOp * 4 + 2], program[currOp * 4 + 3]];

    if (operation === 1) {
      program[ptrs[2]] = program[ptrs[0]] + program[ptrs[1]];
    }

    if (operation === 2) {
      program[ptrs[2]] = program[ptrs[0]] * program[ptrs[1]];
    }

    currOp += 1;
  }

  return program[0];
}

for (let i = 0; i <= 99; ++i) {
  for (let j = 0; j <= 99; ++j) {
    const input = program.slice();
    input[1] = i;
    input[2] = j;

    const output = runProgram(input);

    if (output === 19690720) {
      console.log(i * 100 + j);
    }

  }
}