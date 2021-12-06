# nodemon --exec "python3 ./2021/day05.py" ./2021/day05.py

from day05input import input

def is_horz_vert(line_seg):
    return line_seg[0][0] == line_seg[1][0] or line_seg[0][1] == line_seg[1][1]

horz_vert_only = list(filter(lambda x: is_horz_vert(x), input))


grid = []

for i in range(1000):
    row = []
    for j in range(1000):
        row.append(0)
    grid.append(row)

def is_horizontal(line):
    dx = abs(line[1][0] - line[0][0])
    dy = abs(line[1][1] - line[0][1])
    return dx == dy

for line in input:
    if line[0][0] == line[1][0]:
        left, right = min(line[0][1], line[1][1]), max(line[0][1], line[1][1])
        for i in range(left, right + 1):
            grid[line[0][0]][i] += 1
    elif line[0][1] == line[1][1]:
        left, right = min(line[0][0], line[1][0]), max(line[0][0], line[1][0])
        for i in range(left, right + 1):
            grid[i][line[0][1]] += 1
    elif is_horizontal(line):
        dx = line[1][0] - line[0][0]
        dy = line[1][1] - line[0][1]

        a, b = None, None
        if dx > 0:
            a = line[0]
            b = line[1]
        else:
            a = line[1]
            b = line[0]

        dy = b[1] - a[1]

        y = a[1]
        for x in range(a[0], b[0] + 1):
            grid[x][y] += 1

            if dy > 0:
                y += 1
            else:
                y -= 1


overlap_count = 0

for i in range(1000):
    for j in range(1000):
        if grid[i][j] > 1:
            overlap_count += 1

print(overlap_count)