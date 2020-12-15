use regex::Regex;
use std::collections::HashMap;
use std::convert::TryInto;
use std::fs;

#[derive(Debug, Clone, Copy, PartialEq)]
enum Mask {
    One,
    Zero,
    X,
}

type BitMask = [Mask; 36];

#[derive(Debug, Clone)]
enum Instruction {
    SetMask { bitmask: BitMask },
    SetMem { address: isize, value: isize },
}

fn input_generator() -> Vec<Instruction> {
    let raw_input = fs::read_to_string("input/day14.txt").unwrap();

    let mask_regex = Regex::new("^mask = (.*?)$").unwrap();
    let mem_regex = Regex::new("^mem\\[(.*?)\\] = (.*?)$").unwrap();

    raw_input
        .lines()
        .map(|line| {
            if mask_regex.is_match(&line) {
                let bitmask = mask_regex.captures(&line).unwrap().get(1).unwrap().as_str();
                let bitmask: BitMask = bitmask
                    .chars()
                    .map(|letter| match letter {
                        '1' => Mask::One,
                        '0' => Mask::Zero,
                        'X' => Mask::X,
                        _ => {
                            panic!()
                        }
                    })
                    .rev()
                    .collect::<Vec<Mask>>()
                    .try_into()
                    .unwrap();

                return Instruction::SetMask { bitmask };
            }

            if mem_regex.is_match(&line) {
                let captures = mem_regex.captures(&line).unwrap();
                let address = captures.get(1).unwrap().as_str().parse::<isize>().unwrap();
                let value = captures.get(2).unwrap().as_str().parse::<isize>().unwrap();

                return Instruction::SetMem { address, value };
            }

            panic!();
        })
        .collect()
}

pub fn part_one() -> isize {
    let instructions = input_generator();

    let mut curr_bitmask: BitMask = [Mask::X; 36];
    let mut mem: HashMap<isize, isize> = HashMap::new();

    for instruction in instructions {
        match instruction {
            Instruction::SetMask { bitmask } => {
                curr_bitmask = bitmask;
            }
            Instruction::SetMem { address, value } => {
                let mut value = value;

                for (bit_pos, &mask) in curr_bitmask.iter().enumerate() {
                    match mask {
                        Mask::One => {
                            value |= 1 << bit_pos;
                        }
                        Mask::Zero => {
                            value &= !(1 << bit_pos);
                        }
                        Mask::X => {}
                    }
                }

                mem.insert(address, value);
            }
        }
    }

    mem.values().sum()
}

pub fn part_two() -> isize {
    let instructions = input_generator();

    let mut curr_bitmasks: Vec<BitMask> = Vec::new();
    let mut mem: HashMap<isize, isize> = HashMap::new();

    for instruction in instructions {
        match instruction {
            Instruction::SetMask { bitmask } => {
                curr_bitmasks = bitmask_v2_to_v1(bitmask);
            }
            Instruction::SetMem { address, value } => {
                let computed_addresses = curr_bitmasks
                    .iter()
                    .map(|bitmask| {
                        let mut computed_address = address;

                        for (bit_pos, &mask) in bitmask.iter().enumerate() {
                            match mask {
                                Mask::One => {
                                    computed_address |= 1 << bit_pos;
                                }
                                Mask::Zero => {
                                    computed_address &= !(1 << bit_pos);
                                }
                                Mask::X => {}
                            }
                        }

                        computed_address
                    })
                    .collect::<Vec<isize>>();

                for computed_address in computed_addresses {
                    mem.insert(computed_address, value);
                }
            }
        }
    }

    mem.values().sum()
}

fn bitmask_v2_to_v1(bitmask: BitMask) -> Vec<BitMask> {
    fn helper(
        computed_masks: &mut Vec<BitMask>,
        bitmask: BitMask,
        builder: &mut BitMask,
        start_index: usize,
    ) {
        for i in start_index..36 {
            if bitmask[i] == Mask::Zero {
                builder[i] = Mask::X;
            }

            if bitmask[i] == Mask::X {
                builder[i] = Mask::One;
                helper(computed_masks, bitmask, builder, i + 1);
                builder[i] = Mask::Zero;
                helper(computed_masks, bitmask, builder, i + 1);
                return;
            }
        }

        computed_masks.push(builder.clone());
    }

    let mut computed_masks = Vec::new();
    helper(&mut computed_masks, bitmask, &mut bitmask.clone(), 0);
    computed_masks
}
