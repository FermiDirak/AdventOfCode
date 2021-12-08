# nodemon --exec "python3 ./2021/day07.py" ./2021/day07.py

import collections
# from day07input import input



input = [16,1,2,0,4,2,7,1,2,14]

# a = input
def median(lst):
    s = sorted(lst)
    if len(s) % 2 == 1:
        return s[len(s)//2]
    else:
        return sum(s[len(s)//2-1:len(s)//2+1])/2.0

# diff = 0

# med = int(median(a))

# for val in a:
#     diff += abs(val - med)

# print(diff)

min_diff = float('inf')
min_v = 0


for target in range(min(input) - 1, max(input) + 1):
    diff = 0

    for crab in input:
        distance = abs(crab - target)
        diff += ((distance) * (distance + 1)) // 2

    if diff < min_diff:
        min_diff = diff
        min_v = target

print(min_diff, min_v)