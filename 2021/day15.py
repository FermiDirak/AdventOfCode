# nodemon --exec "python3 ./2021/day15.py" ./2021/day15.py

import collections
from day15input import input

def mapper(line):
    return line

input = map(mapper, input)

matrix = []
for line in input:
    row = []
    for char in line:
        row.append(int(char))
    matrix.append(row)

def gen_map(matrix):
    res = []

    for _ in range(5):
        for row in matrix:
            res.append(row[:])


    for row_i in range(len(res)):
        new_row = []
        for _ in range(5):
            new_row.extend(res[row_i][:])
        res[row_i] = new_row

    for i in range(len(res)):
        for j in range(len(res[0])):
            res[i][j] = (res[i][j] + (i // 100) + (j // 100) - 1) % 9 + 1

    return res

print(len(matrix), len(matrix[0]))
matrix = gen_map(matrix)
print(len(matrix), len(matrix[0]))


sample = ''.join(map(lambda x: str(x), matrix[0]))
print(sample)

min_risk_mat = []
for i in range(len(matrix)):
    row = []
    for j in range(len(matrix[0])):
        row.append(float('inf'))
    min_risk_mat.append(row)

def in_bounds(i, j):
    return 0 <= i < len(matrix) and 0 <= j < len(matrix[0])

def bfs():
    deq = collections.deque([(0, 0)])
    min_risk_mat[0][0] = 0

    while len(deq) != 0:
        lvl_count = len(deq)

        for _ in range(lvl_count):
            curr = deq.popleft()
            curr_val = min_risk_mat[curr[0]][curr[1]]

            for dir in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                new_pos = (curr[0] + dir[0], curr[1] + dir[1])

                if not in_bounds(new_pos[0], new_pos[1]):
                    continue

                new_val = curr_val + matrix[new_pos[0]][new_pos[1]]

                if new_val < min_risk_mat[new_pos[0]][new_pos[1]]:
                    min_risk_mat[new_pos[0]][new_pos[1]] = new_val
                    deq.append(new_pos)

bfs()


print(min_risk_mat[-1][-1])
