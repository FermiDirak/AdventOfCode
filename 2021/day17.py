# nodemon --exec "python3 ./2021/day17.py" ./2021/day17.py

import collections
from day17input import input

print(input)

def in_bounds(x, y):
    return input['x_start'] <= x <= input['x_end'] and input['y_start'] <= y <= input['y_end']

def simulate(dx_init, dy_init):
    max_y = 0

    dx = dx_init
    dy = dy_init

    x, y = 0, 0

    while x <= input['x_end'] and y >= input['y_start']:
        x += dx
        y += dy

        if dx > 0:
            dx -= 1
        elif dx < 0:
            dx += 1

        dy -= 1

        max_y = max(max_y, y)

        if in_bounds(x, y):
            return max_y

    return None


initials = set()

g_max_y = 0
for dx in range(10, 203):
    print(dx)
    for dy in range(-111, 2000):
        res = simulate(dx, dy)

        if res != None:
            initials.add((dx, dy))
            g_max_y = max(g_max_y, res)

print(g_max_y)
print(len(initials))
