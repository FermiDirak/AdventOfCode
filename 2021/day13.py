# nodemon --exec "python3 ./2021/day13.py" ./2021/day13.py

import collections
from day13input import coords, folds


dots = set(coords)

print(len(dots))

for fold in folds:
    new_dots = set()

    if fold[0] == 'x':
        for dot in dots:
            if dot[0] > fold[1]:
                diff = dot[0] - fold[1]
                new_dot = (fold[1] - diff, dot[1])
            else:
                new_dot = dot
            new_dots.add(new_dot)
    if fold[0] == 'y':
        for dot in dots:
            if dot[1] > fold[1]:
                diff = dot[1] - fold[1]
                new_dot = (dot[0], fold[1] - diff)
            else:
                new_dot = dot
            new_dots.add(new_dot)

    dots = new_dots

dims = (
    min(map(lambda x: x[0], dots)),
    min(map(lambda x: x[1], dots)),

    max(map(lambda x: x[0], dots)) + 1,
    max(map(lambda x: x[1], dots)) + 1,
)

text = ''
for yi in range(dims[3]):
    for xi in range(dims[2]):
        if (xi, yi) in dots:
            text += '#'
        else:
            text += '.'

    text += '\n'

print(text)
