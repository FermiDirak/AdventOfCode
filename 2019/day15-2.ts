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

const tiles = {
  unvisited: -1,
  wall: -2,
  oxygen: -3,
}

const instructions = {
  north: 1,
  south: 2,
  west: 3,
  east: 4,
};

const opposites = {
  [instructions.north]: instructions.south,
  [instructions.south]: instructions.north,
  [instructions.west]:  instructions.east,
  [instructions.east]:  instructions.west,
}

const dirVectors = {
  [instructions.north]: [-1,  0],
  [instructions.south]: [ 1,  0],
  [instructions.west]:  [ 0, -1],
  [instructions.east]:  [ 0,  1],
};

const outputs = {
  hitWall: 0,
  moved: 1,
  movedAndOxygen: 2,
};

const Game = new IntcodeInterpreter(programmm, 0);
let robotPos: any = [250, 250];
const display = Array.from({length: 500}).map(_ => Array.from({length: 500}).map(_ => tiles.unvisited));
display[robotPos[0]][robotPos[1]] = 0;

function drawDisplay() {
  const tileToPixel = {
    [tiles.unvisited]: '?',
    [tiles.wall]: '█',
    [tiles.oxygen]: '*',
  };

  for (let i = Math.max(robotPos[0] - 25, 0); i < Math.min(robotPos[0] + 25, display.length); ++i) {
    let row = '';

    for (let j = Math.max(robotPos[1] - 25, 0); j < Math.min(robotPos[1] + 25, display.length); ++j) {
      if (i === robotPos[0] && j === robotPos[1]) {
        row += '@';
        continue;
      }

      if (display[i][j] >= 0) {
        // row += String(display[i][j] % 10);
        row += ' ';
        continue;
      }

      row += tileToPixel[display[i][j]];
    }

    console.log(row);
  }
}

function computeMove(move: [number, number], instruction: number) {
  const res = move.slice();
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

function lightUpSurroundings(pos: [number, number]) {
  Object.values(instructions).forEach(instruction => {
    const [output, response] = Game.runTillHalt(instruction);

    if (response === 'exit') {
      console.log('wtf');
      process.exit(1);
    }

    const nextPos = computeMove(pos, instruction);

    if (output === outputs.hitWall) {
      display[nextPos[0]][nextPos[1]] = tiles.wall;
    }
    if (output === outputs.moved) {
      display[pos[0]][pos[1]] = 0;
      Game.runTillHalt(opposites[instruction]);
    }
    if (output === outputs.movedAndOxygen) {
      display[nextPos[0]][nextPos[1]] = tiles.oxygen;
      Game.runTillHalt(opposites[instruction]);
    }
  });
}

function navigateToOxygen() {
  let pos = robotPos.slice();
  let onOxygen = false;
  dfs(0);
  return pos;

  function dfs(depth: number) {
    if (
      display[pos[0]][pos[1]] !== tiles.unvisited &&
      depth > display[pos[0]][pos[1]]) {
      return false;
    }

    display[pos[0]][pos[1]] = depth;

    return Object.values(instructions).forEach(instruction => {
      const [output, response] = Game.runTillHalt(instruction);

      if (response === 'exit') {
        console.log('wtf navToOxygen');
        process.exit(1);
      }

      switch (output) {
        case outputs.moved: {
          const dirVector = dirVectors[instruction];

          pos = [pos[0] + dirVector[0], pos[1] + dirVector[1]];
          dfs(depth + 1);

          if (onOxygen) {
            return;
          }

          Game.runTillHalt(opposites[instruction]);
          pos = [pos[0] - dirVector[0], pos[1] - dirVector[1]];
          return;
        }

        case outputs.hitWall: {
          const dirVector = dirVectors[instruction];
          display[pos[0] + dirVector[0]][pos[1] + dirVector[1]] = tiles.wall;
          return;
        }

        case outputs.movedAndOxygen: {
          const dirVector = dirVectors[instruction];
          pos = [pos[0] + dirVector[0], pos[1] + dirVector[1]];
          onOxygen = true;
          return;
        }
      }
    });
  }
}

function clearMap() {
  for (let i = 0; i < display.length; ++i) {
    for (let j = 0; j < display[0].length; ++j) {
      if (display[i][j] >= 0) {
        display[i][j] = tiles.unvisited;
      }
    }
  }
}

function maxDepth() {
  clearMap();
  let pos = robotPos.slice();
  let maxDepth = 0;
  dfs(0);
  return maxDepth;

  function dfs(depth: number) {
    if (
      display[pos[0]][pos[1]] !== tiles.unvisited &&
      depth > display[pos[0]][pos[1]]) {
      return false;
    }

    display[pos[0]][pos[1]] = depth;
    maxDepth = Math.max(maxDepth, depth);

    return Object.values(instructions).forEach(instruction => {
      const [output, response] = Game.runTillHalt(instruction);

      if (response === 'exit') {
        console.log('wtf navToOxygen');
        process.exit(1);
      }

      switch (output) {
        case outputs.moved: {
          const dirVector = dirVectors[instruction];

          pos = [pos[0] + dirVector[0], pos[1] + dirVector[1]];
          dfs(depth + 1);
          Game.runTillHalt(opposites[instruction]);
          pos = [pos[0] - dirVector[0], pos[1] - dirVector[1]];
          return;
        }

        case outputs.hitWall: {
          const dirVector = dirVectors[instruction];
          display[pos[0] + dirVector[0]][pos[1] + dirVector[1]] = tiles.wall;
          return;
        }

        case outputs.movedAndOxygen: {
          console.log('wtf', pos);

          const dirVector = dirVectors[instruction];
          pos = [pos[0] + dirVector[0], pos[1] + dirVector[1]];
          return;
        }
      }
    });
  }
}

const oxygenPos = navigateToOxygen();
robotPos = oxygenPos;
drawDisplay();
console.log(maxDepth());
drawDisplay();

// const stdin = process.stdin;
// stdin.setRawMode(true);
// stdin.resume();
// stdin.setEncoding('utf8');

// stdin.addListener('data', (data: string) => {
//   const keyToMoveMap = {
//     w: instructions.north,
//     a: instructions.west,
//     s: instructions.south,
//     d: instructions.east,
//   }

//   if (data === '\u0003') {
//     process.exit();
//   }

//   if (Object.keys(keyToMoveMap).includes(data)) {
//     const move = keyToMoveMap[data];
//     lightUpSurroundings();
//     step(move);
//     drawDisplay();
//   }
// });
