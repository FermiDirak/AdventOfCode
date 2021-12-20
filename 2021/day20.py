# nodemon --exec "python3 ./2021/day20.py" ./2021/day20.py

import copy
import collections
import random
from day20input import input

print('aloha')

first = '####...###.###.##.##.##..###..##.#.##.#...####..##...#..#..#....#..#..##.##..#.#.####.######.#..#.##..##....#.####.##...#.#..#.####.#.#.#..###.##..#.#.#.#...#.....###.#.#...#..#....#######....#..#...###.##.........#.#.##.#........##...#..##.......####.#.#.#.#.#.####..#..........#.##......##......###.#..##.#.#.....###.#..#...###.##........#..#.##.#.###.#..#####..##..#..#.#.#...###..##..#.###.##...#.##.#.....#.#..........#..##.#########.#.#..##.#.##..######.....####...###..###.#..##########.#.#.....###.##.##.'

# dem
# first = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#'

fill = ['0']

matrix = []
for line in input:
    row = []
    for char in line:
        row.append(char)
    matrix.append(row)

def in_bounds(image, x, y):
    return 0 <= x < len(image) and 0 <= y < len(image[0])

def apply(image, i, j):
    dirs = [
        (-1, -1),
        (-1, 0),
        (-1, 1),
        (0, -1),
        (0, 0),
        (0, 1),
        (1, -1),
        (1, 0),
        (1, 1),
    ]

    bit_builder = ''

    for dir in dirs:
        ni, nj = i + dir[0], j + dir[1]
        if not in_bounds(image, ni, nj):
            bit_builder += fill[0]
            continue

        if image[ni][nj] == '#':
            bit_builder += '1'
        else:
            bit_builder += '0'

    return int(bit_builder, base=2)

def pprint(image):
    for row in image:
        print(''.join(row))

def enhance(image):
    new_image = []

    for i in range(len(image) + 4):
        row = []
        for j in range(len(image[0]) + 4):
            bitindex = apply(image, i - 2, j - 2)
            val = first[bitindex]
            row.append(val)
        new_image.append(row)

    if fill[0] == '1':
        fill[0] = '0'
    else:
        fill[0] = '1'

    return new_image


thing = matrix

for i in range(50):
    print(i)
    thing = enhance(thing)

pixel_count = 0
for i in range(len(thing)):
    for j in range(len(thing[0])):
        pixel_count += 1 if thing[i][j] == '#' else 0

print(pixel_count)
