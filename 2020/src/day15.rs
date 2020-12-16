use std::collections::HashMap;
use std::fs;

fn input_generator() -> Vec<usize> {
    let raw_input = fs::read_to_string("input/day15.txt").unwrap();

    raw_input
        .split(",")
        .map(|text| text.parse::<usize>().unwrap())
        .collect()
}

/// Leaving this here for the record since this was my first-pass solution
// pub fn elf_game(initial_list: Vec<usize>, end_turn: usize) -> usize {
//     if end_turn < initial_list.len() {
//         panic!();
//     }

//     let mut turn = 0;
//     let mut nums_last_seen: HashMap<usize, Vec<usize>> = HashMap::new();

//     for &val in &initial_list {
//         turn += 1;

//         match nums_last_seen.get_mut(&val) {
//             Some(num_history) => {
//                 num_history.push(turn);
//             }
//             None => {
//                 nums_last_seen.insert(val, vec![turn]);
//             }
//         }
//     }

//     let mut last_num = *initial_list.last().unwrap();

//     while turn < end_turn {
//         turn += 1;

//         match nums_last_seen.contains_key(&last_num)
//             && nums_last_seen.get(&last_num).unwrap().len() >= 2
//         {
//             true => {
//                 let history = nums_last_seen.get(&last_num).unwrap();
//                 let turns_apart = (turn - 1) - history[history.len() - 2];

//                 match nums_last_seen.get_mut(&turns_apart) {
//                     Some(num_history) => {
//                         num_history.push(turn);
//                     }
//                     None => {
//                         nums_last_seen.insert(turns_apart, vec![turn]);
//                     }
//                 }
//                 last_num = turns_apart;
//             }
//             false => {
//                 match nums_last_seen.get_mut(&0) {
//                     Some(num_history) => {
//                         num_history.push(turn);
//                     }
//                     None => {
//                         nums_last_seen.insert(0, vec![turn]);
//                     }
//                 }
//                 last_num = 0;
//             }
//         }
//     }

//     last_num
// }

pub fn elf_game(initial_list: Vec<usize>, end_turn: usize) -> usize {
    let mut nums_last_seen: HashMap<usize, usize> = HashMap::new();
    let mut curr_num = *initial_list.first().unwrap();
    let mut next_num = *initial_list.first().unwrap();

    for turn in 0..end_turn {
        curr_num = next_num;

        if turn < initial_list.len() - 1 {
            next_num = initial_list[turn + 1];
        } else {
            if nums_last_seen.contains_key(&curr_num) {
                next_num = turn + 1 - *nums_last_seen.get(&curr_num).unwrap();
            } else {
                next_num = 0;
            }
        }

        nums_last_seen.insert(curr_num, turn + 1);
    }

    curr_num
}

pub fn part_one() -> usize {
    let input = input_generator();
    elf_game(input, 2020)
}

pub fn part_two() -> usize {
    let input = input_generator();
    elf_game(input, 30000000)
}
