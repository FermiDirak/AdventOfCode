use regex::Regex;
use std::collections::HashSet;
use std::fs;

#[derive(Debug, Clone)]
enum OpCode {
    ACC,
    JMP,
    NOP,
}

#[derive(Debug, Clone)]
struct Instruction {
    pub op_code: OpCode,
    pub argument: isize,
}

fn input_generator() -> Vec<Instruction> {
    let raw_input = fs::read_to_string("input/day08.txt").unwrap();
    let instruction_regex = Regex::new("^(.*?) (.*?)$").unwrap();

    raw_input
        .lines()
        .map(|line| {
            let captures = instruction_regex.captures(line).unwrap();
            let op_code = captures.get(1).unwrap().as_str();
            let op_code = match op_code {
                "acc" => OpCode::ACC,
                "jmp" => OpCode::JMP,
                "nop" => OpCode::NOP,
                _ => panic!(),
            };

            let argument = captures.get(2).unwrap().as_str();
            let argument = argument.parse::<isize>().unwrap();

            Instruction { op_code, argument }
        })
        .collect()
}

#[derive(Debug)]
enum ResCode {
    SuccessfullyTerminated,
}

#[derive(Debug)]
struct Program {
    instructions: Vec<Instruction>,
    next_line: usize,
    accumulator: isize,
}

impl Program {
    pub fn new(instructions: Vec<Instruction>) -> Self {
        Program {
            instructions,
            next_line: 0,
            accumulator: 0,
        }
    }

    pub fn tick(&mut self) {
        let instruction = self.instructions.get(self.next_line).unwrap();
        match instruction.op_code {
            OpCode::ACC => {
                self.accumulator += instruction.argument;
                self.next_line += 1;
            }
            OpCode::JMP => {
                self.next_line = (self.next_line as isize + instruction.argument) as usize;
            }
            OpCode::NOP => self.next_line += 1,
        }
    }
}

pub fn part_one() -> isize {
    let instructions = input_generator();
    let mut visited_instructions = HashSet::new();
    let mut program = Program::new(instructions);

    loop {
        if visited_instructions.contains(&program.next_line) {
            return program.accumulator;
        }

        visited_instructions.insert(program.next_line);
        program.tick();
    }
}

pub fn part_two() -> isize {
    let instructions = input_generator();

    for i in 0..instructions.len() {
        let mut instructions = instructions.clone();
        let mut operation = instructions.get(i).unwrap().clone();

        match operation.op_code {
            OpCode::JMP => operation.op_code = OpCode::NOP,
            OpCode::NOP => operation.op_code = OpCode::JMP,
            _ => continue,
        }

        instructions[i] = operation;

        let mut program = Program::new(instructions);
        let mut visited_instructions: HashSet<usize> = HashSet::new();

        loop {
            if program.next_line == program.instructions.len() {
                return program.accumulator;
            }

            if visited_instructions.contains(&program.next_line) {
                break;
            }

            visited_instructions.insert(program.next_line);
            program.tick();
        }
    }

    panic!();
}
