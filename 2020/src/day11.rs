use std::fs;

#[derive(Debug, Clone, Copy, PartialEq)]
enum Tile {
    Floor,
    Seat,
    Occupied,
}

#[derive(Debug, Clone, PartialEq)]
struct Grid<T> {
    pub data: Vec<T>,
    pub height: usize,
    pub width: usize,
}

impl<T: Copy> Grid<T> {
    pub fn get(&self, i: usize, j: usize) -> T {
        self.data[(i * self.width) + j]
    }

    pub fn set(&mut self, i: usize, j: usize, data: T) {
        self.data[(i * self.width) + j] = data;
    }

    pub fn get_adjacent(&self, i: usize, j: usize) -> Vec<T> {
        let dirs: Vec<[isize; 2]> = vec![
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
        ];

        let mut res = Vec::new();

        for dir in dirs {
            let adj_i = i as isize + dir[0];
            let adj_j = j as isize + dir[1];

            if self.in_bounds(adj_i, adj_j) {
                res.push(self.get(adj_i as usize, adj_j as usize));
            }
        }

        res
    }

    pub fn in_bounds(&self, i: isize, j: isize) -> bool {
        i >= 0 && i < (self.height as isize) && j >= 0 && j < (self.width as isize)
    }
}

impl Grid<Tile> {
    pub fn get_adjacent_special(&self, i: usize, j: usize) -> Vec<Tile> {
        let dirs: Vec<[isize; 2]> = vec![
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
        ];

        let mut res = Vec::new();

        for dir in dirs {
            let mut adj_i = i as isize + dir[0];
            let mut adj_j = j as isize + dir[1];

            while self.in_bounds(adj_i, adj_j) {
                let tile = self.get(adj_i as usize, adj_j as usize);

                if tile != Tile::Floor {
                    res.push(tile);
                    break;
                }

                adj_i += dir[0];
                adj_j += dir[1];
            }
        }

        res
    }
}

fn input_generator() -> Grid<Tile> {
    let raw_input = fs::read_to_string("input/day11.txt").unwrap();
    let height = raw_input.lines().count();
    let width = raw_input.lines().next().unwrap().len();
    let mut data = Vec::<Tile>::new();

    raw_input.lines().for_each(|line| {
        line.chars().for_each(|letter| {
            let tile = match letter {
                '#' => Tile::Occupied,
                'L' => Tile::Seat,
                '.' => Tile::Floor,
                _ => panic!(),
            };

            data.push(tile);
        });
    });

    Grid {
        data,
        height,
        width,
    }
}

pub fn part_one() -> usize {
    let mut grid = input_generator();
    let mut next_grid = grid.clone();

    let mut iteration = 0;
    loop {
        iteration += 1;

        for i in 0..grid.height {
            for j in 0..grid.width {
                let cell = next_grid.get(i, j);
                let adjacents = grid.get_adjacent(i, j);

                match cell {
                    Tile::Seat => {
                        // If a seat is empty (L) and there are no occupied seats adjacent
                        // to it, the seat becomes occupied.
                        if adjacents
                            .iter()
                            .filter(|&&tile| tile == Tile::Occupied)
                            .count()
                            == 0
                        {
                            next_grid.set(i, j, Tile::Occupied);
                        }
                    }
                    Tile::Occupied => {
                        // If a seat is occupied (#) and four or more seats adjacent to it
                        // are also occupied, the seat becomes empty.
                        if adjacents
                            .iter()
                            .filter(|&&tile| tile == Tile::Occupied)
                            .count()
                            >= 4
                        {
                            next_grid.set(i, j, Tile::Seat);
                        }
                    }
                    Tile::Floor => continue,
                }
            }
        }

        if iteration > 200 {
            return grid
                .data
                .iter()
                .cloned()
                .filter(|&tile| tile == Tile::Occupied)
                .count();
        }

        grid = next_grid.clone();
    }
}

pub fn part_two() -> usize {
    let mut grid = input_generator();
    let mut next_grid = grid.clone();

    let mut iteration = 0;
    loop {
        iteration += 1;

        for i in 0..grid.height {
            for j in 0..grid.width {
                let cell = next_grid.get(i, j);
                let adjacents = grid.get_adjacent_special(i, j);

                match cell {
                    Tile::Seat => {
                        // If a seat is empty (L) and there are no occupied seats adjacent
                        // to it, the seat becomes occupied.
                        if adjacents
                            .iter()
                            .filter(|&&tile| tile == Tile::Occupied)
                            .count()
                            == 0
                        {
                            next_grid.set(i, j, Tile::Occupied);
                        }
                    }
                    Tile::Occupied => {
                        // If a seat is occupied (#) and five or more seats adjacent to it
                        // are also occupied, the seat becomes empty.
                        if adjacents
                            .iter()
                            .filter(|&&tile| tile == Tile::Occupied)
                            .count()
                            >= 5
                        {
                            next_grid.set(i, j, Tile::Seat);
                        }
                    }
                    Tile::Floor => continue,
                }
            }
        }

        if iteration > 200 {
            return grid
                .data
                .iter()
                .cloned()
                .filter(|&tile| tile == Tile::Occupied)
                .count();
        }

        grid = next_grid.clone();
    }
}
