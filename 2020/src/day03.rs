use std::fmt;
use std::fs;
use std::ops;

#[derive(Debug, PartialEq)]
struct Coord(isize, isize);

#[derive(Debug)]
enum Tile {
    Ground,
    Tree,
}

struct Forest {
    data: Vec<Tile>,
    pub width: usize,
    pub height: usize,
}

impl Forest {
    /// gets the tile. X wraps
    pub fn get(self: &Self, x: usize, y: usize) -> Option<&Tile> {
        let x = x % self.width;
        self.data.get(x + (y * self.width))
    }

    /// prints the tree
    pub fn print(self: &Self) {}
}

impl fmt::Debug for Forest {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut res = String::new();

        for y in 0..self.height {
            let mut line = String::new();

            for x in 0..self.width {
                let tile = self.get(x, y).unwrap();

                match tile {
                    Tile::Ground => line.push('.'),
                    Tile::Tree => line.push('#'),
                }
            }

            res.push_str(&line);
            res.push('\n');
        }

        write!(f, "{}", res)
    }
}

fn input_generator() -> Forest {
    let raw_input = fs::read_to_string("input/day03.txt").unwrap();
    let raw_input_lines: Vec<&str> = raw_input.lines().collect();

    let width = raw_input_lines.get(0).unwrap().len();
    let height = raw_input_lines.len();

    let mut data = Vec::new();

    raw_input_lines.iter().for_each(|line| {
        for symbol in line.chars() {
            match symbol {
                '#' => data.push(Tile::Tree),
                '.' => data.push(Tile::Ground),
                _ => panic!(),
            }
        }
    });

    Forest {
        data,
        width,
        height,
    }
}

pub fn part_one() -> isize {
    let forest = input_generator();
    let slope = (3, 1);
    let mut pos = (0, 0);

    let mut trees_hit = 0;

    while pos.1 < forest.height {
        let tile_hit = forest.get(pos.0, pos.1).unwrap();

        if let Tile::Tree = tile_hit {
            trees_hit += 1;
        }

        pos.0 += slope.0;
        pos.1 += slope.1;
    }

    trees_hit
}

pub fn part_two() -> isize {
    let forest = input_generator();
    let slopes = vec![(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)];
    let mut trees_hit_by_slope: Vec<isize> = Vec::new();

    for slope in slopes.iter() {
        let mut trees_hit = 0;
        let mut pos = (0, 0);

        while pos.1 < forest.height {
            let tile_hit = forest.get(pos.0, pos.1).unwrap();

            if let Tile::Tree = tile_hit {
                trees_hit += 1;
            }

            pos.0 += slope.0;
            pos.1 += slope.1;
        }

        trees_hit_by_slope.push(trees_hit);
    }

    trees_hit_by_slope.iter().fold(1, |acc, curr| acc * curr)
}
