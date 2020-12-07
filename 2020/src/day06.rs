use std::collections::HashSet;
use std::fs;

type Group = Vec<HashSet<char>>;

fn input_generator() -> Vec<Group> {
    let raw_input = fs::read_to_string("input/day06.txt").unwrap();

    raw_input
        .split("\n\n")
        .map(|group| {
            group
                .split("\n")
                .map(|person| person.chars().into_iter().collect())
                .collect()
        })
        .collect()
}

pub fn part_one() -> usize {
    let groups = input_generator();

    let yeses: Vec<usize> = groups
        .iter()
        .map(|group| {
            let mut unique_yeses = HashSet::new();

            for person_yeses in group {
                unique_yeses = unique_yeses.union(person_yeses).cloned().collect();
            }

            unique_yeses.len()
        })
        .collect();

    yeses.iter().sum()
}

pub fn part_two() -> usize {
    let groups = input_generator();

    let yeses: Vec<usize> = groups
        .iter()
        .map(|group| {
            let mut unique_yeses = group.first().unwrap().clone();

            for person_yeses in group {
                unique_yeses = unique_yeses.intersection(person_yeses).cloned().collect();
            }

            unique_yeses.len()
        })
        .collect();

    yeses.iter().sum()
}
