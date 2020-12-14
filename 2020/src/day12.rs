use std::collections::HashMap;
use std::fs;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
enum Action {
    North,
    South,
    East,
    West,
    Left,
    Right,
    Forward,
}

#[derive(Debug, Clone)]
struct Instruction {
    action: Action,
    value: isize,
}

fn input_generator() -> Vec<Instruction> {
    let raw_input = fs::read_to_string("input/day12.txt").unwrap();

    raw_input
        .lines()
        .map(|line| {
            let mut line = line.chars();

            let action = line.next().unwrap();
            let action = match action {
                'N' => Action::North,
                'S' => Action::South,
                'E' => Action::East,
                'W' => Action::West,
                'L' => Action::Left,
                'R' => Action::Right,
                'F' => Action::Forward,
                _ => panic!(),
            };

            let value = line.collect::<String>().parse::<isize>().unwrap();

            Instruction { action, value }
        })
        .collect()
}

pub fn part_one() -> isize {
    let instructions = input_generator();

    let mut directions = HashMap::new();
    directions.insert(Action::North, (0, 1));
    directions.insert(Action::East, (1, 0));
    directions.insert(Action::South, (0, -1));
    directions.insert(Action::West, (-1, 0));

    let facings = vec![
        directions.get(&Action::North).unwrap(),
        directions.get(&Action::East).unwrap(),
        directions.get(&Action::South).unwrap(),
        directions.get(&Action::West).unwrap(),
    ];

    let mut pos = (0, 0);
    let mut dir: usize = 1;

    for instruction in instructions {
        match instruction.action {
            Action::North | Action::East | Action::South | Action::West => {
                let offset_dir = directions.get(&instruction.action).unwrap();
                let offset = (
                    offset_dir.0 * instruction.value as isize,
                    offset_dir.1 * instruction.value as isize,
                );

                pos = (pos.0 + offset.0, pos.1 + offset.1);
            }
            Action::Left => {
                let rot_steps = instruction.value / 90;
                dir = (dir as isize - rot_steps).rem_euclid(4) as usize;
            }
            Action::Right => {
                let rot_steps = instruction.value / 90;
                dir = (dir + rot_steps as usize).rem_euclid(4);
            }
            Action::Forward => {
                let offset_dir = facings[dir];
                let offset = (
                    offset_dir.0 * instruction.value,
                    offset_dir.1 * instruction.value,
                );

                pos = (pos.0 + offset.0, pos.1 + offset.1);
            }
        }
    }

    pos.0.abs() + pos.1.abs()
}

pub fn part_two() -> isize {
    let instructions = input_generator();

    let mut directions = HashMap::new();
    directions.insert(Action::North, (0, 1));
    directions.insert(Action::East, (1, 0));
    directions.insert(Action::South, (0, -1));
    directions.insert(Action::West, (-1, 0));

    let mut pos = (0, 0);
    let mut waypoint_pos = (10, 1);

    for instruction in instructions {
        match instruction.action {
            Action::North | Action::East | Action::South | Action::West => {
                let offset_dir = directions.get(&instruction.action).unwrap();
                let offset = (
                    offset_dir.0 * instruction.value as isize,
                    offset_dir.1 * instruction.value as isize,
                );

                waypoint_pos = (waypoint_pos.0 + offset.0, waypoint_pos.1 + offset.1);
            }
            Action::Left => {
                let rot_steps = instruction.value / 90;
                for _ in 0..rot_steps {
                    waypoint_pos = (-waypoint_pos.1, waypoint_pos.0)
                }
            }
            Action::Right => {
                let rot_steps = instruction.value / 90;
                for _ in 0..rot_steps {
                    waypoint_pos = (waypoint_pos.1, -waypoint_pos.0)
                }
            }
            Action::Forward => {
                let offset = (
                    waypoint_pos.0 * instruction.value,
                    waypoint_pos.1 * instruction.value,
                );

                pos = (pos.0 + offset.0, pos.1 + offset.1);
            }
        }
    }

    pos.0.abs() + pos.1.abs()
}
