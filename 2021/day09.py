# nodemon --exec "python3 ./2021/day09.py" ./2021/day09.py

import collections
# from day09input import input

input = [
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678',
]

def mapper(line):
    return line

input = list(map(mapper, input))

matrix = []
for line in input:
    row = []
    for value in line:
        row.append(int(value))
    matrix.append(row)

m, n = len(matrix), len(matrix[0])

res = 0

dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
]

def in_bounds(pos):
    return 0 <= pos[0] < m and 0 <= pos[1] < n

start_points = []

for i in range(m):
    for j in range(n):
        pos = [i, j]
        pos_val = matrix[pos[0]][pos[1]]

        is_low = True

        for dir in dirs:
            o_pos = [i + dir[0], j + dir[1]]
            if in_bounds(o_pos):
                other_pos_val = matrix[o_pos[0]][o_pos[1]]
                if other_pos_val <= pos_val:
                    is_low = False

        if is_low:
            start_points.append(pos)



basin_sizes = []


def flood_fill(pos):
    deq = collections.deque([pos])
    count = 0

    seen = set([])

    # def dfs(curr):
    #     nonlocal count

    #     curr_val = matrix[curr[0]][curr[1]]
    #     count += 1

    #     print(curr)
    #     seen.add((curr[0], curr[1]))

    #     for dir in dirs:
    #         other = [curr[0] + dir[0], curr[1] + dir[1]]
    #         if not in_bounds(other):
    #             continue
    #         if (other[0], other[1]) in seen:
    #             continue

    #         other_val = matrix[other[0]][other[1]]

    #         if other_val != 9 and other_val > curr_val:
    #             dfs(other)

    # dfs(pos)

    while len(deq) != 0:
        ll = len(deq)
        curr = deq.popleft()
        if (curr[0], curr[1]) in seen:
            continue

        curr_val = matrix[curr[0]][curr[1]]
        count += 1

        seen.add((curr[0], curr[1]))

        for dir in dirs:
            other = [curr[0] + dir[0], curr[1] + dir[1]]
            if not in_bounds(other):
                continue

            other_val = matrix[other[0]][other[1]]
            if other_val != 9 and other_val > curr_val:
                deq.append(other)

    return count

basin_sizes = []
for start in start_points:
    basin_size = flood_fill(start)
    basin_sizes.append(basin_size)

basin_sizes.sort(reverse=True)

print(basin_sizes[0] * basin_sizes[1] * basin_sizes[2])
