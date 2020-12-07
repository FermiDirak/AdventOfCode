use regex::Regex;
use std::collections::HashMap;
use std::fs;

type BagGraph = HashMap<String, Vec<(String, usize)>>;

fn input_generator() -> BagGraph {
    let raw_input = fs::read_to_string("input/day07.txt").unwrap();

    let mut connections = HashMap::new();

    raw_input.lines().for_each(|line| {
        let leaf_regex = Regex::new("^(.*?) bags contain no other bags.$").unwrap();
        if leaf_regex.is_match(&line) {
            let captures = leaf_regex.captures(&line).unwrap();
            let bag = captures.get(1).unwrap().as_str();

            connections.insert(bag.to_string(), Vec::new());
            return;
        }

        let node_regex = Regex::new("^(.*?) bags contain (.*?)$").unwrap();
        if node_regex.is_match(&line) {
            let captures = node_regex.captures(&line).unwrap();
            let first = captures.get(1).unwrap().as_str().to_string();
            let second = captures.get(2).unwrap().as_str();

            let mut sub_bags = Vec::new();

            let second_regex = Regex::new("(.*?) bags?(?:\\.|, )").unwrap();

            for captures in second_regex.captures_iter(&second) {
                let sub_bag_info = captures.get(1).unwrap().as_str();

                let bag_info_regex = Regex::new("^(.*?) (.*?)$").unwrap();
                let captures = bag_info_regex.captures(&sub_bag_info).unwrap();
                let count = captures.get(1).unwrap().as_str().parse::<usize>().unwrap();
                let name = captures.get(2).unwrap().as_str().to_string();

                let connection = (name, count);
                sub_bags.push(connection);
            }

            connections.insert(first, sub_bags);
            return;
        }

        panic!();
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
