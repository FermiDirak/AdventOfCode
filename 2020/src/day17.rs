use std::collections::{HashMap, HashSet};
use std::fs;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
enum CellState {
    Active,
    Inactive,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct Pos(isize, isize, isize, isize);

impl Pos {
    pub fn neighbors_3d(&self) -> HashSet<Pos> {
        let mut res = HashSet::new();

        for i in -1..=1 {
            for j in -1..=1 {
                for k in -1..=1 {
                    res.insert(Pos(self.0 + i, self.1 + j, self.2 + k, 0));
                }
            }
        }

        res.remove(&self);

        res
    }

    pub fn neighbors_4d(&self) -> HashSet<Pos> {
        let mut res = HashSet::new();

        for i in -1..=1 {
            for j in -1..=1 {
                for k in -1..=1 {
                    for m in -1..=1 {
                        res.insert(Pos(self.0 + i, self.1 + j, self.2 + k, self.3 + m));
                    }
                }
            }
        }

        res.remove(&self);

        res
    }
}

#[derive(Debug, Clone)]
struct PocketDimension {
    cells: HashMap<Pos, CellState>,
}

impl From<&String> for PocketDimension {
    fn from(input: &String) -> Self {
        let mut pocket_dimension = PocketDimension {
            cells: HashMap::new(),
        };

        input.lines().enumerate().for_each(|(i, line)| {
            line.chars().enumerate().for_each(|(j, symb)| {
                let cube_state = match symb {
                    '#' => CellState::Active,
                    '.' => CellState::Inactive,
                    _ => panic!(),
                };

                pocket_dimension
                    .cells
                    .insert(Pos(i as isize, j as isize, 0, 0), cube_state);
            });
        });

        pocket_dimension
    }
}

// impl Iterator for PocketDimension {
//     type Item = Self;

//     fn next(&mut self) -> Option<Self::Item> {
//         self.fill_neighbors();

//         let mut cells_next = self.cells.clone();

//         self.cells.iter().for_each(|(pos, cell_state)| {
//             let neighbors = pos.neighbors_3d();
//             let active_neighbors = neighbors
//                 .iter()
//                 .cloned()
//                 .filter(|pos| {
//                     self.cells.contains_key(pos)
//                         && *self.cells.get(pos).unwrap() == CellState::Active
//                 })
//                 .count();

//             match cell_state {
//                 CellState::Active => {
//                     if !(active_neighbors == 2 || active_neighbors == 3) {
//                         cells_next.insert(*pos, CellState::Inactive);
//                     }
//                 }
//                 CellState::Inactive => {
//                     if active_neighbors == 3 {
//                         cells_next.insert(*pos, CellState::Active);
//                     }
//                 }
//             }
//         });

//         self.cells = cells_next;
//         Some(self.clone())
//     }
// }

impl PocketDimension {
    fn fill_neighbors_3d(&mut self) {
        let mut cells_next = self.cells.clone();

        self.cells.iter().for_each(|(pos, cell_state)| {
            if *cell_state != CellState::Active {
                return;
            }

            pos.neighbors_3d().iter().for_each(|neighbor_pos| {
                if !cells_next.contains_key(neighbor_pos) {
                    cells_next.insert(*neighbor_pos, CellState::Inactive);
                }
            })
        });

        self.cells = cells_next;
    }

    fn fill_neighbors_4d(&mut self) {
        let mut cells_next = self.cells.clone();

        self.cells.iter().for_each(|(pos, cell_state)| {
            if *cell_state != CellState::Active {
                return;
            }

            pos.neighbors_4d().iter().for_each(|neighbor_pos| {
                if !cells_next.contains_key(neighbor_pos) {
                    cells_next.insert(*neighbor_pos, CellState::Inactive);
                }
            })
        });

        self.cells = cells_next;
    }

    pub fn next_3d(&mut self) {
        self.fill_neighbors_3d();

        let mut cells_next = self.cells.clone();

        self.cells.iter().for_each(|(pos, cell_state)| {
            let neighbors = pos.neighbors_3d();
            let active_neighbors = neighbors
                .iter()
                .cloned()
                .filter(|pos| {
                    self.cells.contains_key(pos)
                        && *self.cells.get(pos).unwrap() == CellState::Active
                })
                .count();

            match cell_state {
                CellState::Active => {
                    if !(active_neighbors == 2 || active_neighbors == 3) {
                        cells_next.insert(*pos, CellState::Inactive);
                    }
                }
                CellState::Inactive => {
                    if active_neighbors == 3 {
                        cells_next.insert(*pos, CellState::Active);
                    }
                }
            }
        });

        self.cells = cells_next;
    }

    pub fn next_4d(&mut self) {
        self.fill_neighbors_4d();

        let mut cells_next = self.cells.clone();

        self.cells.iter().for_each(|(pos, cell_state)| {
            let neighbors = pos.neighbors_4d();
            let active_neighbors = neighbors
                .iter()
                .cloned()
                .filter(|pos| {
                    self.cells.contains_key(pos)
                        && *self.cells.get(pos).unwrap() == CellState::Active
                })
                .count();

            match cell_state {
                CellState::Active => {
                    if !(active_neighbors == 2 || active_neighbors == 3) {
                        cells_next.insert(*pos, CellState::Inactive);
                    }
                }
                CellState::Inactive => {
                    if active_neighbors == 3 {
                        cells_next.insert(*pos, CellState::Active);
                    }
                }
            }
        });

        self.cells = cells_next;
    }
}

fn input_generator() -> PocketDimension {
    let raw_input = fs::read_to_string("input/day17.txt").unwrap();
    PocketDimension::from(&raw_input)
}

pub fn part_one() -> isize {
    let mut pocket_dimension = input_generator();

    for _ in 0..6 {
        pocket_dimension.next_3d();
    }

    pocket_dimension
        .cells
        .values()
        .filter(|&cell_state| *cell_state == CellState::Active)
        .count() as isize
}

pub fn part_two() -> isize {
    let mut pocket_dimension = input_generator();

    for _ in 0..6 {
        pocket_dimension.next_4d();
    }

    pocket_dimension
        .cells
        .values()
        .filter(|&cell_state| *cell_state == CellState::Active)
        .count() as isize
}
