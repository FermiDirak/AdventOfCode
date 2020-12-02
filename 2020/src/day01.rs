use std::collections::HashSet;
use std::fs;

pub fn input_generator() -> Vec<i32> {
    let raw_input = fs::read_to_string("input/day01.txt").unwrap();

    raw_input
        .lines()
        .map(|line| line.parse::<i32>().unwrap())
        .collect::<Vec<i32>>()
}

pub fn part_one() -> Option<i32> {
    let expenses = input_generator();
    let expenses = expenses.into_iter().collect::<HashSet<i32>>();

    for expense in &expenses {
        if expenses.contains(&(2020 - expense)) {
            return Some(expense * (2020 - expense));
        }
    }

    return None;
}

pub fn part_two() -> Option<i32> {
    let target = 2020;
    let mut expenses = input_generator();
    expenses.sort();

    for i in 1..(expenses.len() - 2) {
        let mut left = 0;
        let mut right = expenses.len() - 1;

        while left != i && right != i {
            let curr = expenses[left] + expenses[i] + expenses[right];

            if curr == target {
                return Some(expenses[left] * expenses[i] * expenses[right]);
            } else if curr > target {
                right -= 1;
            } else if curr < target {
                left += 1;
            }
        }
    }

    return None;
}
