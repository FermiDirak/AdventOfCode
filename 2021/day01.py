# nodemon --exec "python3 ./2021/day01.py" ./2021/day01.py

from day01input import input

counter = 0

for i in range(len(input) - 1):
    if input[i + 1] > input[i]:
        counter += 1

print(counter)

windowed_input = []

for i in range(1, len(input) - 1):
    a, b, c = input[i - 1], input[i], input[i + 1]
    windowed_input.append(a + b + c)

counter = 0

for i in range(len(windowed_input) - 1):
    if windowed_input[i + 1] > windowed_input[i]:
        counter += 1

print(counter)
