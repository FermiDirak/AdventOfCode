use regex::Regex;
use std::collections::HashMap;
use std::fs;

type BagGraph = HashMap<String, Vec<(String, usize)>>;

fn input_generator() -> BagGraph {
    let raw_input = fs::read_to_string("input/day07.txt").unwrap();

    let mut connections = HashMap::new();

    raw_input.lines().for_each(|line| {
        let regex = Regex::new("^(.*?) bags contain (.*?)\\.$").unwrap();
        if !regex.is_match(line) {
            panic!();
        }

        let captures = regex.captures(&line).unwrap();
        let bag = captures.get(1).unwrap().as_str().to_owned();
        let connected_to = captures.get(2).unwrap().as_str();

        if connected_to == "no other bags" {
            connections.insert(bag.to_owned(), Vec::new());
            return;
        }

        let connected_to_regex = Regex::new("(.*?) bags?(?:, |)").unwrap();
        let connected_to: Vec<(String, usize)> = connected_to_regex
            .captures_iter(connected_to)
            .map(|captures| {
                let connection = captures.get(1).unwrap().as_str();

                let connection_regex = Regex::new("(.*?) (.*?)$").unwrap();
                let captures = connection_regex.captures(connection).unwrap();

                (
                    captures.get(2).unwrap().as_str().to_string(),
                    captures.get(1).unwrap().as_str().parse::<usize>().unwrap(),
                )
            })
            .collect();

        connections.insert(bag.to_owned(), connected_to);
    });

    connections
}

pub fn part_one() -> usize {
    let graph = input_generator();
    let mut has_shiny_gold_cache: HashMap<&str, bool> = HashMap::new();
    has_shiny_gold_cache.insert("shiny gold", true);

    fn recurse(graph: &BagGraph, cache: &mut HashMap<&str, bool>, bag: &str) -> bool {
        if cache.get(bag) == Some(&true) {
            return true;
        }

        graph
            .get(bag)
            .unwrap()
            .iter()
            .any(|(connection, _)| recurse(graph, cache, connection))
    };

    for bag in graph.keys() {
        let contains_shiny_gold = recurse(&graph, &mut has_shiny_gold_cache, bag);
        has_shiny_gold_cache.insert(bag, contains_shiny_gold);
    }

    has_shiny_gold_cache
        .values()
        .filter(|&&has_shiny| has_shiny)
        .count()
        - 1
}

pub fn part_two() -> usize {
    let graph = input_generator();

    fn recurse(graph: &BagGraph, bag: &str) -> usize {
        let bag = graph.get(bag).unwrap();
        let mut count = 1;

        for (sub_bag, sub_bag_count) in bag {
            count += sub_bag_count * recurse(&graph, sub_bag);
        }
        count
    }

    return recurse(&graph, "shiny gold") - 1;
}
