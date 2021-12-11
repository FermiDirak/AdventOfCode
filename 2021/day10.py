# nodemon --exec "python3 ./2021/day10.py" ./2021/day10.py

import collections
from day10input import input

def mapper(line):
    return list(line)

input = list(map(mapper, input))

def is_corrupted(line):
    stack = []

    open = list('([{<')
    close = list(')]}>')

    for item in line:
        if item in open:
            stack.append(item)
        elif item in close:
            if len(stack) == 0:
                return True

            last = stack.pop()
            if item == ')' and last != '(':
                return ')'
            if item == ']' and last != '[':
                return ']'
            if item == '}' and last != '{':
                return '}'
            if item == '>' and last != '<':
                return '>'

    return False

def line_score(line):
    stack = []

    open = list('([{<')
    close = list(')]}>')

    for item in line:
        if item in open:
            stack.append(item)
        elif item in close:
            if len(stack) == 0:
                return True

            last = stack.pop()
            if item == ')' and last != '(':
                return ')'
            if item == ']' and last != '[':
                return ']'
            if item == '}' and last != '{':
                return '}'
            if item == '>' and last != '<':
                return '>'

    return stack

score = 0

# for line in input:
#     end = is_corrupted(line)

    # if end == ')':
    #     score += 3
    # elif end == ']':
    #     score += 57
    # elif end == '}':
    #     score += 1197
    # elif end == '>':
    #     score += 25137

scores = []

for line in input:
    if is_corrupted(line) != False:
        continue

    l_score = line_score(line)
    print(l_score)
    s = 0

    for item in reversed(l_score):
        s *= 5
        if item == '(':
            s += 1
        elif item == '[':
            s += 2
        elif item == '{':
            s += 3
        elif item == '<':
            s += 4

    scores.append(s)
    print(s)

scores.sort()

print(55 // 2)

print(scores[55//2])