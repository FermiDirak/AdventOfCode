import {readFileSync} from 'fs';

const inputs = readFileSync('./day7-1.txt', 'utf8').split('\n');
const program = inputs[0].split(',').map(num => Number.parseInt(num));

type InstructionResult =
  | 'next'
  | 'halt'
  | 'exit';

class IntcodeInterpreter {
  /** The current program being ran */
  program: number[];

  /** Our global instruction pointer used to keep track of our current location */
  instructionPointer: number;

  input: number;

  /** output */
  output: number;

  constructor(program: number[], hyperParam: number) {
    this.program = program.slice();

    this.instructionPointer = 0;
    this.input = hyperParam;
    this.output = -Infinity;

    this.step();
  }

  /** Parses an operation for the opCode and parameter position / immediate modes */
  parseOperation(operation: number) {
    function getNthDigit(num: number, digit: number) {
      return Math.floor(num % (10 ** (digit + 1)) / (10 ** digit));
    }

    const opCode = operation % 100;
    const modes = [getNthDigit(operation, 2), getNthDigit(operation, 3), 1];
    return {opCode, modes};
  }

  /** Use to define the schema and operation of an instruction */
  instruction(args: Array<'r' | 'w'>, cb: (params: number[]) => InstructionResult) {
    return (operation: number) => {
      const {modes} = this.parseOperation(operation);
      const params = args
        .map((_, i) => this.program[this.instructionPointer + i + 1])
        .map((param, i) => {
          if (args[i] === 'w') {
            return param;
          }

          return modes[i] === 0 ? this.program[param] : param;
        });

      const instructionResult = cb(params);

      // only increment the instruction pointer if the instruction is unchanged
      if (operation === this.program[this.instructionPointer]) {
        this.instructionPointer += args.length + 1;
      }

      return instructionResult;
    }
  }

  instructions = {
    // exit
    99: this.instruction([], params => {
      return 'exit';
    }),
    // add
    1: this.instruction(['r', 'r', 'w'], params => {
      this.program[params[2]] = params[0] + params[1];
      return 'next';
    }),
    // multiply
    2: this.instruction(['r', 'r', 'w'], params => {
      this.program[params[2]] = params[0] * params[1];
      return 'next';
    }),
    // input
    3: this.instruction(['w'], (params) => {
      this.program[params[0]] = this.input;
      return 'next';
    }),
    // output
    4: this.instruction(['r'], params => {
      this.output = params[0];
      return 'halt';
    }),
    // is not zero
    5: this.instruction(['r', 'r'], params => {
      if (params[0] !== 0) {
        this.program[this.instructionPointer] = params[1];
        this.instructionPointer = params[1];
        return 'next';
      }
    }),
    // is zero
    6: this.instruction(['r', 'r'], (params) => {
      if (params[0] === 0) {
        this.program[this.instructionPointer] = params[1];
        this.instructionPointer = params[1];
        return 'next';
      }
    }),
    // less than
    7: this.instruction(['r', 'r', 'w'], params => {
      this.program[params[2]] = params[0] < params[1] ? 1 : 0;
      return 'next';
    }),
    // equal
    8: this.instruction(['r', 'r', 'w'], params => {
      this.program[params[2]] = params[0] === params[1] ? 1 : 0;
      return 'next';
    }),
  };

  step() {
    const currentOperation = program[this.instructionPointer];
    const {opCode} = this.parseOperation(currentOperation);
    console.log(opCode, this.instructionPointer);
    return this.instructions[opCode](currentOperation);
  }

  runTillHalt(input: number) {
    this.input = input;
    while (true) {
      const instructionResult = this.step();

      if (instructionResult === 'halt' || instructionResult === 'exit') {
        return this.output;
      }
    }
  }

  runTillExit(input: number) {
    this.input = input;
    while (true) {
      const instructionResult = this.step();

      if (instructionResult === 'exit') {
        return this.output;
      }
    }
  }
}

function permutations(arr: number[]) {
  const res = [];
  const builder = [];
  const remainder = arr.slice().fill(1);

  recurse();
  return res;

  function recurse() {
    if (builder.length === arr.length) {
      res.push(builder.slice());
      return;
    }

    remainder.forEach((mask, i) => {
      if (mask === 0) {
        return;
      }

      const item = arr[i];

      builder.push(item);
      remainder[i] = 0;
      recurse();
      builder.pop();
      remainder[i] = 1;
    });
  }
}

const hyperparams = [0,1,2,3,4];
let maxSignal = -Infinity;

permutations(hyperparams).forEach(randomizedHyperparams => {
  let signal = 0;

  randomizedHyperparams.forEach(hyperparam => {
    const amplifier = new IntcodeInterpreter(program, hyperparam);
    signal = amplifier.runTillExit(signal);
  })

  maxSignal = Math.max(signal, maxSignal);
});

console.log('maxSignal', maxSignal);
process.exit(0);
