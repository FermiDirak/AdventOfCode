use std::fs;

#[derive(Debug)]
enum SeatingCode {
    F,
    B,
    R,
    L,
}

#[derive(Debug)]
struct BoardingPass {
    pub seating_codes: Vec<SeatingCode>,
}

fn input_generator() -> Vec<BoardingPass> {
    let raw_input = fs::read_to_string("input/day05.txt").unwrap();

    raw_input
        .lines()
        .map(|line| {
            let chars = line.chars();
            let seating_codes = chars
                .map(|char| match char {
                    'F' => SeatingCode::F,
                    'B' => SeatingCode::B,
                    'R' => SeatingCode::R,
                    'L' => SeatingCode::L,
                    _ => panic!(),
                })
                .collect();

            BoardingPass { seating_codes }
        })
        .collect::<Vec<BoardingPass>>()
}

#[derive(Debug)]
struct Seating {
    pub row: isize,
    pub col: isize,
}

impl Seating {
    pub fn seat_id(&self) -> isize {
        self.row * 8 + self.col
    }
}

impl From<&BoardingPass> for Seating {
    fn from(boarding_pass: &BoardingPass) -> Self {
        let mut min_row = 0;
        let mut max_row = 127;

        let mut min_col = 0;
        let mut max_col = 7;

        for seating_code in &boarding_pass.seating_codes {
            let mid_row = (min_row + max_row) / 2;
            let mid_col = (min_col + max_col) / 2;

            match seating_code {
                SeatingCode::B => min_row = mid_row + 1,
                SeatingCode::F => max_row = mid_row,
                SeatingCode::R => min_col = mid_col + 1,
                SeatingCode::L => max_col = mid_col,
            }
        }

        Seating {
            row: min_row,
            col: min_col,
        }
    }
}

pub fn part_one() -> isize {
    let boarding_passes = input_generator();

    let seatings_ids = boarding_passes
        .iter()
        .map(|boarding_pass| Seating::from(boarding_pass))
        .map(|seating| seating.seat_id())
        .collect::<Vec<isize>>();

    *seatings_ids.iter().max().unwrap()
}

pub fn part_two() -> isize {
    let boarding_passes = input_generator();

    let mut seatings_ids = boarding_passes
        .iter()
        .map(|boarding_pass| Seating::from(boarding_pass))
        .map(|seating| seating.seat_id())
        .collect::<Vec<isize>>();

    seatings_ids.sort();

    for index in 1..(seatings_ids.len() - 1) {
        let curr = *seatings_ids.get(index).unwrap();
        let last = *seatings_ids.get(index - 1).unwrap();

        if last + 2 == curr {
            return last + 1;
        }
    }

    panic!();
}
