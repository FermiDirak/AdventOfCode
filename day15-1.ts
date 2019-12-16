import {readFileSync} from 'fs';
import {createInterface} from 'readline';

const inputs = readFileSync('./day15-1.txt', 'utf8').split('\n');
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

const instructions = {
  north: 1,
  south: 2,
  west: 3,
  east: 4,
};

const outputs = {
  hitWall: 0,
  moved: 1,
  movedAndOxygen: 2,
};

const display = Array.from({length: 50}).map(_ => Array.from({length: 50}).map(_ => ' '));
const Game = new IntcodeInterpreter(programmm, 0);

let robotPos = [25, 25];

function computeMove(instruction: number) {
  const res = robotPos.slice();
  if (instruction === instructions.north) {
    res[0] -= 1;
  }
  if (instruction === instructions.east) {
    res[1] += 1;
  }
  if (instruction === instructions.south) {
    res[0] += 1;
  }
  if (instruction === instructions.west) {
    res[1] -= 1;
  }

  return res;
}

function lightUpSurroundings() {
  Object.values(instructions).forEach(instruction => {
    const [output, response] = Game.runTillHalt(instruction);

    if (response === 'exit') {
      console.log('wtf');
      process.exit(1);
    }

    const nextPos = computeMove(instruction);

    if (output === outputs.hitWall) {
      display[nextPos[0]][nextPos[1]] = '#';
    }
    if (output === outputs.moved) {
      display[robotPos[0]][robotPos[1]] = '.';
      const opposites = {
        [instructions.north]: instructions.south,
        [instructions.east]: instructions.west,
        [instructions.south]: instructions.north,
        [instructions.west]: instructions.east,
      }

      Game.runTillHalt(opposites[instruction]);
    }
    if (output === outputs.movedAndOxygen) {
      display[nextPos[0]][nextPos[1]] = '*';
      const opposites = {
        [instructions.north]: instructions.south,
        [instructions.east]: instructions.west,
        [instructions.south]: instructions.north,
        [instructions.west]: instructions.east,
      }

      Game.runTillHalt(opposites[instruction]);
    }

  })
}

function step(instruction: number) {
  const [output, response] = Game.runTillHalt(instruction);

  if (response === 'exit') {
    console.log('wtf');
    process.exit(1);
  }

  const nextPos = computeMove(instruction);

  if (output === outputs.hitWall) {
    display[nextPos[0]][nextPos[1]] = '█';
  }
  if (output === outputs.moved) {
    display[robotPos[0]][robotPos[1]] = '.';
    robotPos = nextPos;
  }
  if (output === outputs.movedAndOxygen) {
    robotPos = nextPos;
    display[nextPos[0]][nextPos[1]] = '*';
  }

  return output;
}

function drawDisplay() {
  for (let i = 0; i < display.length; ++i) {
    let row = '';

    for (let j = 0; j < display[0].length; ++j) {
      if (i === robotPos[0] && j === robotPos[1]) {
        row += '@';
        continue;
      }

      row += display[i][j];
    }

    console.log(row);
  }
}

const keyToMoveMap = {
  w: instructions.north,
  a: instructions.west,
  s: instructions.south,
  d: instructions.east,
}

lightUpSurroundings();

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.addListener('data', (data: string) => {
  if (data === '\u0003') {
    process.exit();
  }

  if (Object.keys(keyToMoveMap).includes(data)) {
    const move = keyToMoveMap[data];
    lightUpSurroundings();
    step(move);
    drawDisplay();
  }
});
