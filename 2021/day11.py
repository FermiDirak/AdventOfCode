# nodemon --exec "python3 ./2021/day11.py" ./2021/day11.py

import collections
from day11input import input

def mapper(line):
    return list(line)

input = list(map(mapper, input))

matrix = input


def flash():
    pass

def in_bounds(i, j):
    return 0 <= i < 10 and 0 <= j < 10

total_flashes = 0

def step():
    for i in range(10):
        for j in range(10):
            matrix[i][j] += 1

    flash_counter = 1
    flashed = set()

    while flash_counter != 0:
        flash_counter = 0

        for i in range(10):
            for j in range(10):
                if matrix[i][j] > 9 and (i, j) not in flashed:
                    flashed.add((i, j))
                    flash_counter += 1
                    adj = [
                        [1, 1],
                        [1, -1],
                        [-1, 1],
                        [-1, -1],
                        [1, 0],
                        [-1, 0],
                        [0, 1],
                        [0, -1],
                    ]

                    for offset in adj:
                        pos = [i + offset[0], j + offset[1]]

                        if in_bounds(pos[0], pos[1]):
                            matrix[pos[0]][pos[1]] += 1

    for pos in flashed:
        matrix[pos[0]][pos[1]] = 0

    return len(flashed)

i = 0
while True:
    total_flashes = step()
    i += 1
    if total_flashes == 100:
        print(i)
        break
