import {readFileSync} from 'fs';

type InstructionResult =
  | 'next'
  | 'modifiedPointer'
  | 'halt'
  | 'consumedInput'
  | 'exit';

const positionModeEnum = {
  positional: 0,
  absolute: 1,
  relative: 2,
}

class IntcodeInterpreter {
  /** The current program being ran */
  program: number[];

  /** Our global instruction pointer used to keep track of our current location */
  instructionPointer: number;

  input: number;

  /** output */
  output: number;

  /** the relative base */
  relativeBase: number;


  constructor(program: number[], hyperParam: number) {
    this.program = program.slice();

    this.instructionPointer = 0;
    this.input = hyperParam;
    this.output = -Infinity;
    this.relativeBase = 0;
  }

  /** Parses an operation for the opCode and parameter position / immediate modes */
  parseOperation(operation: number) {
    function getNthDigit(num: number, digit: number) {
      return Math.floor(num % (10 ** (digit + 1)) / (10 ** digit));
    }

    const opCode = operation % 100;
    const modes = [getNthDigit(operation, 2), getNthDigit(operation, 3), getNthDigit(operation, 4)];
    return {opCode, modes};
  }

  getParams(readWriteModes: Array<'r' | 'w'>, positionModes: number[]) {
    return readWriteModes
      .map((_, i) => this.program[this.instructionPointer + i + 1] || 0)
      .map((param, i) => {
        const readWriteMode = readWriteModes[i];
        let positionMode = positionModes[i];

        if (readWriteMode === 'w') {
          switch (positionMode) {
            case positionModeEnum.positional:
              return param;
            case positionModeEnum.absolute:
              return param;
            case positionModeEnum.relative:
              return param + this.relativeBase;
          }
        }

        switch (positionMode) {
          case positionModeEnum.positional:
            return this.program[param] || 0;
          case positionModeEnum.absolute:
            return param;
          case positionModeEnum.relative:
            return this.program[this.relativeBase + param] || 0;
          default:
            throw new Error('wtf invalid position mode')
        }
      });
  }

  /** Use to define the schema and operation of an instruction */
  instruction(args: Array<'r' | 'w'>, cb: (params: number[]) => InstructionResult) {
    return (operation: number) => {
      const {modes} = this.parseOperation(operation);
      const params = this.getParams(args, modes);

      const instructionResult = cb(params);

      // only increment the instruction pointer if the instruction is unchanged
      if (instructionResult !== 'modifiedPointer') {
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
      return 'consumedInput';
    }),
    // output
    4: this.instruction(['r'], params => {
      this.output = params[0];
      return 'halt';
    }),
    // is not zero
    5: this.instruction(['r', 'r'], params => {
      if (params[0] !== 0) {
        this.instructionPointer = params[1];
        return 'modifiedPointer';
      }
      return 'next';
    }),
    // is zero
    6: this.instruction(['r', 'r'], (params) => {
      if (params[0] === 0) {
        this.instructionPointer = params[1];
        return 'modifiedPointer';
      }
      return 'next';
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
    // adjust relative base
    9: this.instruction(['r'], params => {
      this.relativeBase += params[0];
      return 'next';
    }),
  };

  step(input?: number) {
    if (typeof input === 'number') {
      this.input = input;
    }

    const currentOperation = this.program[this.instructionPointer];
    const {opCode} = this.parseOperation(currentOperation);

    const instructionResult = this.instructions[opCode](currentOperation);

    return [this.output, instructionResult];
  }

  runTillConsumeInput(input: number) {
    this.input = input;
    while (true) {
      const [output, instructionResult] = this.step();

      if (instructionResult === 'consumedInput' || instructionResult === 'exit') {
        return [output, instructionResult];
      }
    }
  }

  runTillHalt(input: number) {
    this.input = input;
    while (true) {
      const [output, instructionResult] = this.step();

      if (instructionResult === 'halt' || instructionResult === 'exit') {
        return [output, instructionResult];
      }
    }
  }

  runTillExit(input: number) {
    this.input = input;
    while (true) {
      const [output, instructionResult]  = this.step();

      if (instructionResult === 'exit') {
        return [output, instructionResult];
      }
    }
  }
}

const inputs = readFileSync('./day23-1.txt', 'utf8').split('\n');
const programmm = inputs[0].split(',').map(num => Number.parseInt(num));

type Packet = {
  x: number,
  y: number,
}

const computers = Array.from({length: 50}).map((_, i) => i).map(networkAddress => {
  const computer = new IntcodeInterpreter(programmm, networkAddress);
  computer.runTillConsumeInput(networkAddress);

  const incomingQueue: Packet[] = [];
  return {computer, incomingQueue};
});

function stepComputer(computerIndex: number) {
  const {computer, incomingQueue} = computers[computerIndex];
  const nextInput = incomingQueue.length === 0 ? -1 : incomingQueue[0].x;

  const [output, outputCode] = computer.step(nextInput);

  if (outputCode === 'consumedInput' && incomingQueue.length !== 0) {
    // feed in y value next
    computer.runTillConsumeInput(incomingQueue[0].y);
    incomingQueue.shift();
  }

  if (outputCode === 'halt') {
    // consume address, x, y
    const outputAddress = output;
    const [x] = computer.runTillHalt(nextInput);
    const [y] = computer.runTillHalt(nextInput);

    if (outputAddress === 255) {
      console.log('y @ 255: ', y);
      process.exit();
    }

    computers[outputAddress].incomingQueue.push({x, y});
  }
}

// const [output] = computers[0].computer.runTillHalt(-1);

// console.log(output);

let counter = 0;

while (true) {
  console.log(counter++, computers.reduce((acc, curr) => acc + curr.incomingQueue.length, 0));
  for (let i = 0; i < 50; ++i) {
    stepComputer(i);
  }
}

