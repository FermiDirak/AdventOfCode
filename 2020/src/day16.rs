use regex::Regex;
use std::collections::{HashMap, HashSet};
use std::fs;

type FieldRules = HashMap<String, Vec<(usize, usize)>>;
type Ticket = Vec<usize>;

#[derive(Debug)]
struct Input {
    field_rules: FieldRules,
    my_ticket: Ticket,
    nearby_tickets: Vec<Ticket>,
}

fn input_generator() -> Input {
    let raw_input = fs::read_to_string("input/day16.txt").unwrap();
    let mut sections = raw_input.split("\n\n");
    let field_rules_section = sections.next().unwrap();
    let my_ticket_section = sections.next().unwrap();
    let nearby_tickets_section = sections.next().unwrap();

    let field_rules = field_rules_section
        .lines()
        .map(|line| {
            let field_name_regex = Regex::new("^(.*?):").unwrap();
            let caps = field_name_regex.captures(line).unwrap();
            let field_name = caps[1].to_owned();

            let mut range = Vec::new();

            let range_regex = Regex::new("(\\d*)-(\\d*)").unwrap();
            for caps in range_regex.captures_iter(line) {
                let start = caps[1].parse().unwrap();
                let end = caps[2].parse().unwrap();
                range.push((start, end));
            }

            (field_name, range)
        })
        .collect();

    let my_ticket = my_ticket_section
        .split(",")
        .map(str::parse)
        .map(Result::unwrap)
        .collect();

    let nearby_tickets = nearby_tickets_section
        .lines()
        .map(|line| {
            line.split(",")
                .map(str::parse)
                .map(Result::unwrap)
                .collect()
        })
        .collect();

    Input {
        field_rules,
        my_ticket,
        nearby_tickets,
    }
}

pub fn part_one() -> usize {
    let input = input_generator();
    let ticket_values: Vec<usize> = input.nearby_tickets.iter().flat_map(Vec::clone).collect();
    let ranges: Vec<(usize, usize)> = input.field_rules.values().flat_map(Vec::clone).collect();

    ticket_values
        .iter()
        .filter(|&ticket_value| {
            ranges
                .iter()
                .any(|(start, end)| ticket_value >= start && ticket_value <= end)
        })
        .sum()
}

pub fn part_two() -> usize {
    fn is_ticket_valid(ranges: &Vec<(usize, usize)>, ticket: &Vec<usize>) -> bool {
        ticket.iter().all(|&ticket_value| {
            ranges
                .iter()
                .any(|&(start, end)| ticket_value >= start && ticket_value <= end)
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
    let ranges = input.field_rules.values().flat_map(Vec::clone).collect();
    let valid_nearby_tickets: Vec<Vec<usize>> = input
        .nearby_tickets
        .iter()
        .cloned()
        .filter(|ticket| is_ticket_valid(&ranges, ticket))
        .collect();

    let field_columns = transpose(&valid_nearby_tickets);

    let mut field_possible_indicies: Vec<(String, HashSet<usize>)> = input
        .field_rules
        .iter()
        .map(|(field_name, ranges)| {
            let possible_indicies = field_columns
                .iter()
                .enumerate()
                .filter(|(_, column)| {
                    column.iter().all(|&val| {
                        ranges
                            .iter()
                            .any(|&(start, end)| val >= start && val <= end)
                    })
                })
                .map(|(i, _)| i)
                .collect();

            (field_name.clone(), possible_indicies)
        })
        .collect();

    field_possible_indicies
        .sort_by(|(_, indicies_a), (_, indicies_b)| indicies_b.len().cmp(&indicies_a.len()));

    for i in 1..field_possible_indicies.len() {
        let prev_indicies = &field_possible_indicies[i - 1].1;
        let curr_indicies = &field_possible_indicies[i].1;

        let difference: HashSet<usize> =
            prev_indicies.difference(&curr_indicies).cloned().collect();

        (*field_possible_indicies.get_mut(i - 1).unwrap()).1 = difference;
    }

    let field_indicies: HashMap<String, usize> = field_possible_indicies
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
        .map(|&field_index| input.my_ticket[field_index])
        .fold(1, |acc, curr| acc * curr)
}
