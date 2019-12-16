import {readFileSync} from 'fs';

const inputs = readFileSync('./day5-1.txt', 'utf8').split('\n');
const program = inputs[0].split(',').map(num => Number.parseInt(num));

/** Runs a given INTCODE program with specified input */
function runProgram(program: number[], input: number) {
  /** Our global instruction pointer used to keep track of our current location */
  let instructionPointer = 0;

  /** Parses an operation for the opCode and parameter position / immediate modes */
  function parseOperation(operation: number) {
    function getNthDigit(num: number, digit: number) {
      return Math.floor(num % (10 ** (digit + 1)) / (10 ** digit));
    }

    const opCode = operation % 100;
    const modes = [getNthDigit(operation, 2), getNthDigit(operation, 3), 1];
    return {opCode, modes};
  }

  /** Use to define the schema and operation of an instruction */
  function instruction(args: Array<'r' | 'w'>, cb: (params: number[]) => void) {
    return (operation: number) => {
      const {modes} = parseOperation(operation);
      const params = args
        .map((_, i) => program[instructionPointer + i + 1])
        .map((param, i) => {
          if (args[i] === 'w') {
            return param;
          }

          return modes[i] === 0 ? program[param] : param;
        });

      cb(params);

      // only increment the instruction pointer if the instruction is unchanged
      if (operation === program[instructionPointer]) {
        instructionPointer += args.length + 1;
      }
    }
  }

  const instructions = {
    // exit
    99: instruction([], params => {
      console.log('exiting');
      process.exit(0);
    }),
    // add
    1: instruction(['r', 'r', 'w'], params => {
      program[params[2]] = params[0] + params[1];
    }),
    // multiply
    2: instruction(['r', 'r', 'w'], params => {
      program[params[2]] = params[0] * params[1];
    }),
    // input
    3: instruction(['w'], (params) => {
      program[params[0]] = input;
    }),
    // output
    4: instruction(['r'], params => {
      console.log('output:', params[0]);
    }),
    // is not zero
    5: instruction(['r', 'r'], params => {
      if (params[0] !== 0) {
        program[instructionPointer] = params[1];
        instructionPointer = params[1];
      }
    }),
    // is zero
    6: instruction(['r', 'r'], (params) => {
      if (params[0] === 0) {
        program[instructionPointer] = params[1];
        instructionPointer = params[1];
      }
    }),
    // less than
    7: instruction(['r', 'r', 'w'], params => {
      program[params[2]] = params[0] < params[1] ? 1 : 0;
    }),
    // equal
    8: instruction(['r', 'r', 'w'], params => {
      program[params[2]] = params[0] === params[1] ? 1 : 0;
    }),
  };

  while (true) {
    const currentOperation = program[instructionPointer];
    const {opCode} = parseOperation(currentOperation);
    instructions[opCode](currentOperation);
  }
}

runProgram(program, 5);
