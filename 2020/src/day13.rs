use std::fs;

#[derive(Debug, Clone)]
struct MyNotes {
    earliest_timestamp: usize,
    bus_ids: Vec<usize>,
}

fn input_generator_one() -> MyNotes {
    let raw_input = fs::read_to_string("input/day13.txt").unwrap();
    let mut lines = raw_input.lines();

    let earliest_timestamp = lines.next().unwrap().parse::<usize>().unwrap();
    let bus_ids = lines
        .next()
        .unwrap()
        .split(",")
        .filter(|text| *text != "x")
        .map(|text| text.parse::<usize>().unwrap())
        .collect();

    MyNotes {
        earliest_timestamp,
        bus_ids,
    }
}

pub fn part_one() -> usize {
    let my_notes = input_generator_one();

    println!("{:?}", my_notes);

    let next_bus_times = my_notes
        .bus_ids
        .iter()
        .map(|bus_id| {
            let factor = my_notes.earliest_timestamp as f64 / (*bus_id as f64);
            let factor = factor.ceil() as usize;

            factor * bus_id
        })
        .collect::<Vec<usize>>();

    let mut min_bus_id = 0;
    let mut min = usize::MAX;

    for (i, &bus_time) in next_bus_times.iter().enumerate() {
        if bus_time < min {
            min = bus_time;
            min_bus_id = my_notes.bus_ids[i];
        }
    }

    (min - my_notes.earliest_timestamp) * min_bus_id
}

struct Bus {
    id: usize,
    offset: usize,
}

fn input_generator_two() -> Vec<Bus> {
    let raw_input = fs::read_to_string("input/day13.txt").unwrap();
    let mut lines = raw_input.lines();
    lines.next();

    let timetable = lines.next().unwrap().split(",");
    let mut offset = 0;
    let mut buses = Vec::new();

    for entry in timetable {
        match entry {
            "x" => {
                offset += 1;
            }
            _ => {
                let id = entry.parse::<usize>().unwrap();
                buses.push(Bus { id, offset });
                offset += 1;
            }
        }
    }

    buses
}

pub fn part_two() -> usize {
    let buses = input_generator_two();
    let mut t = 0;
    let mut lcd = 1;

    for bus in buses {
        while (t + bus.offset) % bus.id != 0 {
            t += lcd;
        }
        lcd *= bus.id;
    }

    t
}
