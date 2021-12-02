# nodemon --exec "python3 ./2021/day02.py" ./2021/day02.py

from day02input import input

x = 0
h = 0

for val in input:
    if val[0] == 'up':
        x -= val[1]
    if val[0] == 'down':
        x += val[1]
    if val[0] == 'forward':
        h += val[1]

print(x * h)

aim = 0
d = 0
x = 0

for val in input:
    if val[0] == 'up':
        aim -= val[1]
    if val[0] == 'down':
        aim += val[1]

    if val[0] == 'forward':
        x += val[1]
        d += val[1] * aim

print(d * x)
