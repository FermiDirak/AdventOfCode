use std::collections::HashMap;
use std::fs;

fn input_generator() -> Vec<isize> {
    let raw_input = fs::read_to_string("input/day10.txt").unwrap();

    raw_input
        .lines()
        .map(|line| line.parse::<isize>().unwrap())
        .collect()
}

pub fn part_one() -> isize {
    let mut jolts = input_generator();
    let outlet_jolts = 0;
    let device_jolts = *jolts.iter().max().unwrap() + 3;
    jolts.push(outlet_jolts);
    jolts.push(device_jolts);
    jolts.sort();

    let mut differential_distribution: HashMap<isize, isize> = HashMap::new();

    for i in 1..(jolts.len()) {
        let a = jolts.get(i - 1).unwrap();
        let b = jolts.get(i).unwrap();
        let diff = b - a;
        differential_distribution
            .insert(diff, differential_distribution.get(&diff).unwrap_or(&0) + 1);
    }

    differential_distribution.get(&1).unwrap_or(&0)
        * differential_distribution.get(&3).unwrap_or(&0)
}

pub fn part_two() -> isize {
    let mut jolts = input_generator();
    let outlet_jolts = 0;
    let device_jolts = *jolts.iter().max().unwrap() + 3;
    jolts.push(outlet_jolts);
    jolts.push(device_jolts);
    jolts.sort();

    let mut dp = jolts.iter().cloned().map(|_| 0).collect::<Vec<isize>>();
    dp[jolts.len() - 1] = 1;

    for i in (0..dp.len() - 1).rev() {
        let curr = jolts[i];
        let mut cell = 0;

        for j in (i + 1)..dp.len() {
            let other = jolts[j];

            if other > curr + 3 {
                break;
            }

            cell += dp[j];
        }

        dp[i] = cell;
    }

    dp[0]
}
