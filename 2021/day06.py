# nodemon --exec "python3 ./2021/day06.py" ./2021/day06.py

import collections
from day06input import input

# input = list(map(lambda x: x, input))

# input = [3,4,3,1,2]

# for batch in range(256):
#     print(batch)

#     for i in range(len(input)):
#         fish = input[i]

#         if fish != 0:
#             input[i] -= 1
#         else: # 0
#             input[i] = 6
#             input.append(8)

dd = collections.defaultdict(int)

for fish in input:
    dd[fish] += 1

for iteration in range(256):
    dd2 = collections.defaultdict(int)

    for i in range(1, 9):
        dd2[i - 1] = dd[i]

    # handle 0
    dd2[8] += dd[0]
    dd2[6] += dd[0]

    dd = dd2

print(sum(dd.values()))
