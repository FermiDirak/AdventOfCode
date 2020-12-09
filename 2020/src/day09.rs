use std::collections::HashSet;
use std::fs;

use std::cmp::Ordering;

fn input_generator() -> Vec<usize> {
    let raw_input = fs::read_to_string("input/day09.txt").unwrap();
    raw_input
        .lines()
        .map(|line| line.parse::<usize>().unwrap())
        .collect()
}

pub fn part_one() -> usize {
    let input = input_generator();

    for i in 25..input.len() {
        let window = &input[(i - 25)..i];
        let window: HashSet<usize> = window.iter().cloned().collect();
        let curr = input[i];

        let mut is_valid = false;

        for &num in window.iter() {
            if num <= curr && window.contains(&(curr - num)) {
                is_valid = true;
            }
        }

        if !is_valid {
            return curr;
        }
    }

    panic!();
}

pub fn part_two() -> usize {
    let input = input_generator();
    let target_sum = part_one();

    let mut curr_sum = 0;
    let mut start = 0;
    let mut end = 0;

    while !(end == input.len() && curr_sum >= target_sum) {
        match curr_sum.cmp(&target_sum) {
            Ordering::Equal => {
                let window = &input[start..end];
                let min = *window.iter().min().unwrap();
                let max = *window.iter().max().unwrap();
                return min + max;
            }
            Ordering::Greater => {
                curr_sum -= input[start];
                start += 1;
            }
            Ordering::Less => {
                curr_sum += input[end];
                end += 1;
            }
        }
    }

    panic!();
}
