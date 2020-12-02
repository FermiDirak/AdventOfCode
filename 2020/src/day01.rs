use std::collections::HashSet;
use std::fs;

use std::cmp::Ordering;

pub fn input_generator() -> Vec<isize> {
    let raw_input = fs::read_to_string("input/day01.txt").unwrap();

    raw_input
        .lines()
        .map(|line| line.parse::<isize>().unwrap())
        .collect::<Vec<isize>>()
}

pub fn part_one() -> isize {
    let expenses = input_generator();
    let expenses = expenses.into_iter().collect::<HashSet<isize>>();

    for expense in &expenses {
        if expenses.contains(&(2020 - expense)) {
            return expense * (2020 - expense);
        }
    }

    panic!();
}

pub fn part_two() -> isize {
    let target = 2020;
    let mut expenses = input_generator();
    expenses.sort();

    for i in 1..(expenses.len() - 2) {
        let mut left = 0;
        let mut right = expenses.len() - 1;

        while left != i && right != i {
            let curr = expenses[left] + expenses[i] + expenses[right];

            match curr.cmp(&target) {
                Ordering::Equal => return expenses[left] * expenses[i] * expenses[right],
                Ordering::Greater => right -= 1,
                Ordering::Less => left += 1,
            }
        }
    }

    panic!();
}
