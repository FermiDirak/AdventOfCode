# nodemon --exec "python3 ./2021/day12.py" ./2021/day12.py

import collections
from day12input import input

def mapper(line):
    return line

input = list(map(mapper, input))

map = collections.defaultdict(list)
for line in input:
    map[line[0]].append(line[1])
    map[line[1]].append(line[0])

seen = collections.defaultdict(int)

res = [0]

def has_double(map):
    for (key, val) in map.items():
        if key == 'start': continue
        if val >= 2:
            return True

    return False

def dfs(start):
    if start == 'end':
        res[0] += 1
        return

    if seen[start] >= 2:
        return

    if seen[start] == 1 and has_double(seen):
        return

    should_backtrack = False
    if not start.isupper():
        if start == 'start':
            seen[start] = 2
        else:
            should_backtrack = True
            seen[start] += 1

    for connection in map[start]:
        dfs(connection)

    if should_backtrack:
        seen[start] -= 1


dfs('start')

print(res[0])