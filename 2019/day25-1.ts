import {readFileSync} from 'fs';
import { createInterface } from 'readline';

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

  runTillConsumeInput(input: number) {
    this.input = input;
    while (true) {
      const instructionResult = this.step();

      if (instructionResult === 'consumedInput' || instructionResult === 'exit') {
        return [this.output, instructionResult];
      }
    }
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

class AsciiComputer {
  computer: IntcodeInterpreter;

  constructor(program: number[]) {
    this.computer = new IntcodeInterpreter(program, 0);
  }

  printTillKeyword(keyword: string | null, opts?: {soft: boolean}) {
    let output = '';

    while (true) {
      const [charCode, outputCode] = this.computer.runTillHalt(2);
      const ascii = String.fromCharCode(charCode);

      if (charCode > 128 && outputCode !== 'exit') {
        output += charCode;
      } else if (charCode > 128 && outputCode === 'exit') {
        output += '\n' + 'exiting: ' + charCode;
      } else {
        output += ascii
      }


      if (outputCode === 'exit' || (keyword && output.includes(keyword))) {
        break;
      }
    }

    if (!opts || !opts.soft) {
      console.log(output);
    }

    return output;
  }

  inputInstructions(input: string | string[]) {
    let computedInput = ''

    if (Array.isArray(input)) {
      computedInput = input.join('\n').concat('\n');
    } else {
      computedInput = input + '\n';
    }

    const instructions = computedInput.split('').map(_ => _.charCodeAt(0));

    instructions.forEach(instruction => {
      this.computer.runTillConsumeInput(instruction);
    });
  }
}

function askQuestion(query) {
  const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise<string>(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
  }));
}

const inputs = readFileSync('./day25-1.txt', 'utf8').split('\n');
const programmm = inputs[0].split(',').map(num => Number.parseInt(num));

const droid = new AsciiComputer(programmm);

const instructions = `
south
take fixed pointed
north
north
take spool of cat6
north
take monolith
west
take planetoid
east
north
take hypercube
south
south
east
north
take candy cane
south
east
take easter egg
east
south
take ornament
west
south
drop planetoid
drop candy cane
drop spool of cat6
west
`;

instructions.split('\n').filter(_ => _.length !== 0).forEach(instruction => {
  droid.printTillKeyword('Command?');
  droid.inputInstructions(instruction);
});


(async () => {
  while (true) {
    droid.printTillKeyword('Command?');

    const res = await askQuestion('north | south | east | west | take <item> | drop <item>: ');

    console.log(res);

    droid.inputInstructions(res);
  }
})();