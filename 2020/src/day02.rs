use regex::Regex;
use std::fs;

#[derive(Debug)]
struct Validator {
    letter: char,
    num1: usize,
    num2: usize,
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
            let regex = Regex::new("^(.*?)-(.*?)\\s(.*?):\\s(.*?)$").unwrap();

            let captures = regex.captures_iter(line).next().unwrap();

            let num1 = captures.get(1).unwrap().as_str();
            let num2 = captures.get(2).unwrap().as_str();
            let letter = captures.get(3).unwrap().as_str();
            let password = captures.get(4).unwrap().as_str();

            Line {
                password: String::from(password),
                validator: Validator {
                    letter: letter.chars().next().unwrap(),
                    num1: num1.parse::<usize>().unwrap(),
                    num2: num2.parse::<usize>().unwrap(),
                },
            }
        })
        .collect::<Vec<Line>>()
}

pub fn part_one() -> isize {
    let lines = input_generator();

    let mut valid_count = 0;

    for line in &lines {
        let mut letter_count = 0;

        for letter in line.password.chars() {
            if letter == line.validator.letter {
                letter_count += 1;
            }
        }

        if letter_count >= line.validator.num1 && letter_count <= line.validator.num2 {
            valid_count += 1;
        }
    }
    valid_count
}

pub fn part_two() -> isize {
    let lines = input_generator();

    let mut valid_count = 0;

    for line in &lines {
        let mut matches = 0;
        let password_letters: Vec<char> = line.password.chars().collect();

        let match1 = password_letters.get(line.validator.num1 - 1);
        let match2 = password_letters.get(line.validator.num2 - 1);

        if Some(&line.validator.letter) == match1 {
            matches += 1;
        }

        if Some(&line.validator.letter) == match2 {
            matches += 1;
        }

        if matches == 1 {
            valid_count += 1;
        }
    }

    valid_count
}
