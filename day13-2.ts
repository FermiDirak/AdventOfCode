import {readFileSync} from 'fs';
import {createInterface} from 'readline';

const inputs = readFileSync('./day13-1.txt', 'utf8').split('\n');
const programmm = inputs[0].split(',').map(num => Number.parseInt(num));

type InstructionResult =
  | 'next'
  | 'modifiedPointer'
  | 'halt'
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
        this.instructionPointer = params[1];
        return 'modifiedPointer';
      }
    }),
    // is zero
    6: this.instruction(['r', 'r'], (params) => {
      if (params[0] === 0) {
        this.instructionPointer = params[1];
        return 'modifiedPointer';
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
    // adjust relative base
    9: this.instruction(['r'], params => {
      this.relativeBase += params[0];
      return 'next';
    }),
  };

  step() {
    const currentOperation = this.program[this.instructionPointer];
    const {opCode} = this.parseOperation(currentOperation);

    return this.instructions[opCode](currentOperation);
  }

  runTillHalt(input: number) {
    this.input = input;
    while (true) {
      const instructionResult = this.step();

      if (instructionResult === 'halt' || instructionResult === 'exit') {
        return [this.output, instructionResult];
      }
    }
  }

  runTillExit(input: number) {
    this.input = input;
    while (true) {
      const instructionResult = this.step();

      if (instructionResult === 'exit') {
        return [this.output, instructionResult];
      }
    }
  }
}

let instruction = 'gogogo';

const display = Array.from({length: 24}).map(_ => Array.from({length: 45}).map(_ => 0));
let score = 0;
const Game = new IntcodeInterpreter(programmm, 0);

function step(operation: number) {
  const [x, newInstruction1] = Game.runTillHalt(operation);
  instruction = newInstruction1 === 'exit' ? 'exit' : instruction;
  const [y, newInstruction2] = Game.runTillHalt(operation);
  instruction = newInstruction2 === 'exit' ? 'exit' : instruction;
  const [id, newInstruction3] = Game.runTillHalt(operation);
  instruction = newInstruction3 === 'exit' ? 'exit' : instruction;

  if (x < 0) {
    score = id;
    return score;
  }

  // update display
  display[y][x] = id;
  return null;
}

function stepTillScore(operation: number) {
  let output = null;

  while (output === null) {
    output = step(operation);
  }
}

function drawDisplay(paddleX: number, ballX: number) {
  const tileDisplayMap = [
    /* 0 */ ' ', // empty
    /* 1 */ '█', // wall
    /* 2 */ '*', // block
    /* 3 */ '_', // paddle
    /* 4 */ 'o', // ball
  ]

  console.log("score: ", score, 'paddle: ', paddleX, 'ballX ', ballX);

  for (let i = 0; i < display.length; ++i) {
    let row = '';

    for (let j = 0; j < display[0].length; ++j) {
      row += tileDisplayMap[display[i][j]];
    }

    console.log(row);
  }
}

function calcAssetXs() {
  let ballX = -1;
  let paddleX = -1;

  display.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 4) {
        ballX = j;
      }
      if (cell === 3) {
        paddleX = j;
      }
    });
  });

  return [ballX, paddleX];
}

let userInput = 0;

// const stdin = process.stdin;
// stdin.setRawMode(true);
// stdin.resume();
// stdin.setEncoding('utf8');

// stdin.addListener('data', (data: string) => {
//   const keyToOp = {
//     a: -1,
//     s: 0,
//     d: 1,
//   }

//   if (data === '\u0003') {
//     process.exit();
//   }

//   if (Object.keys(keyToOp).includes(data)) {
//     userInput = keyToOp[data];
//   }
// });

function sleep(ms: number){
  const resolve = (resolver => {
    setTimeout(resolver, ms);
  });

  return new Promise(resolve);
}

(async () => {
  stepTillScore(0);
  drawDisplay(-1, -1);

  while (true) {
    const [ballX, paddleX] = calcAssetXs();

    if (ballX > paddleX) {
      userInput = 1;
    } else if (ballX === paddleX) {
      userInput = 0;
    } else {
      userInput = -1;
    }

    step(userInput);
    step(userInput);
    drawDisplay(ballX, paddleX);
    await sleep(10);
  }

})();

