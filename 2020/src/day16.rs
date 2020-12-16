use regex::Regex;
use std::collections::{HashMap, HashSet};
use std::fs;

#[derive(Debug)]
struct Input {
    fields: HashMap<String, Vec<(usize, usize)>>,
    ticket: Vec<usize>,
    nearby_tickets: Vec<Vec<usize>>,
}

fn input_generator() -> Input {
    let raw_input = fs::read_to_string("input/day16.txt").unwrap();
    let mut sections = raw_input.split("\n\n");

    let mut fields = HashMap::new();
    let ranges_section = sections.next().unwrap();
    ranges_section.lines().for_each(|line| {
        let field_name_regex = Regex::new("^(.*?):").unwrap();
        let caps = field_name_regex.captures(line).unwrap();
        let field_name = caps.get(1).unwrap().as_str().to_owned();

        let mut range = Vec::new();

        let range_regex = Regex::new("(\\d*)-(\\d*)").unwrap();
        for caps in range_regex.captures_iter(line) {
            let start = caps.get(1).unwrap().as_str().parse::<usize>().unwrap();
            let end = caps.get(2).unwrap().as_str().parse::<usize>().unwrap();
            range.push((start, end));
        }

        fields.insert(field_name, range);
    });

    let ticket = sections
        .next()
        .unwrap()
        .split(",")
        .map(|text| text.parse::<usize>().unwrap())
        .collect();

    let nearby_tickets = sections
        .next()
        .unwrap()
        .lines()
        .map(|line| {
            line.split(",")
                .map(|text| text.parse::<usize>().unwrap())
                .collect()
        })
        .collect();

    Input {
        fields,
        ticket,
        nearby_tickets,
    }
}

pub fn part_one() -> usize {
    let input = input_generator();
    let values: Vec<usize> = input
        .nearby_tickets
        .iter()
        .flat_map(|nums| nums.clone())
        .collect();

    let mut invalid_vals = Vec::new();

    for &val in &values {
        let is_valid = input
            .fields
            .values()
            .flat_map(|ranges| ranges.clone())
            .any(|(start, end)| val >= start && val <= end);

        if !is_valid {
            invalid_vals.push(val);
        }
    }

    invalid_vals.iter().sum()
}

pub fn part_two() -> usize {
    fn is_ticket_valid(ranges: &Vec<(usize, usize)>, ticket: &Vec<usize>) -> bool {
        ticket.iter().all(|&val| {
            ranges
                .iter()
                .any(|&(start, end)| val >= start && val <= end)
        })
    }

    fn transpose<T: Copy>(matrix: &Vec<Vec<T>>) -> Vec<Vec<T>> {
        let mut res = Vec::new();
        for _ in 0..matrix[0].len() {
            res.push(Vec::new());
        }

        matrix.iter().for_each(|row| {
            for (i, val) in row.iter().enumerate() {
                res[i].push(*val);
            }
        });

        res
    }

    let input = input_generator();
    let ranges = input.fields.values().cloned().flat_map(|vec| vec).collect();
    let valid_nearby_tickets: Vec<Vec<usize>> = input
        .nearby_tickets
        .iter()
        .cloned()
        .filter(|ticket| is_ticket_valid(&ranges, ticket))
        .collect();

    let columns = transpose(&valid_nearby_tickets);

    let mut field_indicies: HashMap<String, Vec<usize>> = HashMap::new();

    for (field_name, ranges) in input.fields.iter() {
        for (i, column) in columns.iter().enumerate() {
            let is_match = {
                column.iter().all(|&val| {
                    ranges
                        .iter()
                        .any(|&(start, end)| val >= start && val <= end)
                })
            };

            if is_match {
                match field_indicies.get_mut(field_name) {
                    Some(list) => list.push(i),
                    None => {
                        field_indicies.insert(field_name.clone(), vec![i]);
                    }
                };
            }
        }
    }

    let mut field_indicies: Vec<(String, Vec<usize>)> = field_indicies.into_iter().collect();
    field_indicies
        .sort_by(|(_, indicies_a), (_, indicies_b)| indicies_b.len().cmp(&indicies_a.len()));

    let mut field_indicies: Vec<(String, HashSet<usize>)> = field_indicies
        .iter()
        .map(|(field_name, indicies)| (field_name.clone(), indicies.iter().cloned().collect()))
        .collect();

    for i in 1..field_indicies.len() {
        let prev_indicies = &field_indicies[i - 1];
        let curr_indicies = &field_indicies[i];

        let difference: HashSet<usize> = prev_indicies
            .1
            .difference(&curr_indicies.1)
            .cloned()
            .collect();

        *field_indicies.get_mut(i - 1).unwrap() = (prev_indicies.0.clone(), difference);
    }

    let field_indicies: HashMap<String, usize> = field_indicies
        .iter()
        .map(|(field_name, indicies)| (field_name.clone(), *indicies.iter().next().unwrap()))
        .collect();

    let departure_fields = vec![
        "departure location",
        "departure station",
        "departure platform",
        "departure track",
        "departure date",
        "departure time",
    ];

    departure_fields
        .iter()
        .map(|&field_name| field_indicies.get(field_name).unwrap())
        .map(|&ticket_index| input.ticket[ticket_index])
        .fold(1, |acc, curr| acc * curr)
}
