use regex::Regex;
use std::collections::{HashMap, HashSet};
use std::fs;

type Passport = HashMap<String, String>;

fn input_generator() -> Vec<Passport> {
    let raw_input = fs::read_to_string("input/day04.txt").unwrap();

    raw_input
        .split("\n\n")
        .map(|raw_passport| {
            let mut formatted_passport = raw_passport.to_owned();
            formatted_passport.push('\n');
            formatted_passport
        })
        .map(|formatted_passport| {
            let regex = Regex::new("(.*?):(.*?)[\\s\\n]").unwrap();
            let mut passport = Passport::new();

            for captures in regex.captures_iter(&formatted_passport) {
                let key = captures.get(1).unwrap().as_str().to_owned();
                let val = captures.get(2).unwrap().as_str().to_owned();

                passport.insert(key, val);
            }

            passport
        })
        .collect::<Vec<Passport>>()
}

pub fn part_one() -> usize {
    let passports = input_generator();

    let required_fields = vec![
        "byr", // Birth Year
        "iyr", // Issue Year
        "eyr", // Expiration Year
        "hgt", // Height
        "hcl", // Hair Color
        "ecl", // Eye Color
        "pid", // Passport ID
    ];

    passports
        .iter()
        .filter(|&passport| {
            let fields = passport.keys();
            let fields = fields.cloned().collect::<HashSet<String>>();

            for &required_field in required_fields.iter() {
                if !fields.contains(required_field) {
                    return false;
                }
            }

            true
        })
        .count()
}

pub fn part_two() -> usize {
    type Validator = fn(String) -> bool;
    let mut validation_rules: HashMap<&str, Validator> = HashMap::new();
    validation_rules.insert("byr", |byr| {
        let byr = byr.parse::<isize>();

        return match byr {
            Err(_) => false,
            Ok(year) => year >= 1920 && year <= 2002,
        };
    });
    validation_rules.insert("iyr", |iyr| {
        let iyr = iyr.parse::<isize>();

        return match iyr {
            Err(_) => false,
            Ok(year) => year >= 2010 && year <= 2020,
        };
    });
    validation_rules.insert("eyr", |eyr| {
        let eyr = eyr.parse::<isize>();

        return match eyr {
            Err(_) => false,
            Ok(year) => year >= 2020 && year <= 2030,
        };
    });
    validation_rules.insert("hgt", |hgt| {
        let (value, units) = hgt.split_at(hgt.len() - 2);
        let value = value.parse::<isize>();

        let value = match value {
            Err(_) => return false,
            Ok(v) => v,
        };

        return match units {
            "cm" => value >= 150 && value <= 193,
            "in" => value >= 59 && value <= 76,
            _ => false,
        };
    });
    validation_rules.insert("hcl", |hcl| {
        let regex = Regex::new("#[a-f0-9]{6}").unwrap();
        regex.is_match(&hcl)
    });
    validation_rules.insert("ecl", |ecl: String| {
        let valid_colors = vec!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
            .iter()
            .map(ToString::to_string)
            .collect::<HashSet<String>>();

        valid_colors.contains(&ecl)
    });
    validation_rules.insert("pid", |pid| {
        let regex = Regex::new("^[0-9]{9}$").unwrap();
        regex.is_match(&pid)
    });

    let passports = input_generator();

    passports
        .iter()
        .filter(|&passport| {
            for (&field_name, &validator) in &validation_rules {
                let value = match passport.get(field_name) {
                    None => return false,
                    Some(v) => v,
                };

                if !validator(value.to_string()) {
                    return false;
                }
            }

            true
        })
        .count()
}
