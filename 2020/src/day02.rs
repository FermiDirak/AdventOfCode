use regex::Regex;
use std::fs;

#[derive(Debug)]
struct Validator {
    letter: char,
    min_count: i32,
    max_count: i32,
}

#[derive(Debug)]
struct Line {
    password: String,
    validator: Validator,
}

fn input_generator() -> Vec<Line> {
    let raw_input = fs::read_to_string("input/day02.txt").unwrap();

    raw_input
        .lines()
        .map(|line| {
            let regex = Regex::new("^(.*?)-(.*?)\\s(.*?): (.*?)$").unwrap();

            let captures = regex.captures_iter(line).next().unwrap();

            let min_count = captures.get(1).unwrap().as_str();
            let max_count = captures.get(2).unwrap().as_str();
            let letter = captures.get(3).unwrap().as_str();
            let password = captures.get(4).unwrap().as_str();

            Line {
                password: String::from(password),
                validator: Validator {
                    letter: letter.chars().next().unwrap(),
                    min_count: min_count.parse::<i32>().unwrap(),
                    max_count: max_count.parse::<i32>().unwrap(),
                },
            }
        })
        .collect::<Vec<Line>>()
}

pub fn part_one() -> Option<i32> {
    let lines = input_generator();

    let mut valid_count = 0;

    for line in &lines {
        let mut letter_count = 0;

        for letter in line.password.chars() {
            if letter == line.validator.letter {
                letter_count += 1;
            }
        }

        if letter_count >= line.validator.min_count && letter_count <= line.validator.max_count {
            valid_count += 1;
        }
    }
    Some(valid_count)
}

pub fn part_two() -> Option<i32> {
    Some(-1)
}
