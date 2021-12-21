# nodemon --exec "python3 ./2021/day21.py" ./2021/day21.py

import copy
import collections
import random


input = [
    6,
    2,
]

print('aloha')

cache = {}

def dfs(args):
    (a_pos, b_pos, a_score, b_score, turn) = args

    if a_score >= 21:
        return (1, 0)
    if b_score >= 21:
        return (0, 1)

    if args in cache:
        return cache[args]

    counter = (0, 0)
    for roll1 in range(1, 3+1):
        for roll2 in range(1, 3+1):
            for roll3 in range(1, 3+1):
                rolls = roll1 + roll2 + roll3

                if turn == 'a':
                    new_a_pos = ((a_pos - 1) + rolls) % 10 + 1

                    outcome = dfs((
                        new_a_pos,
                        b_pos,
                        a_score + new_a_pos,
                        b_score,
                        'b'
                    ))
                    counter = (counter[0] + outcome[0], counter[1] + outcome[1])
                else:
                    new_b_pos = ((b_pos - 1) + rolls) % 10 + 1

                    outcome = dfs((
                        a_pos,
                        new_b_pos,
                        a_score,
                        b_score + new_b_pos,
                        'a'
                    ))
                    counter = (counter[0] + outcome[0], counter[1] + outcome[1])


    cache[args] = counter

    return counter


ress = dfs((input[0], input[1], 0, 0, 'a'))
print(ress, max(ress[0], ress[1]))

# print('aloha')

# dice_i = 0

# a_i = input[0] - 1
# b_i = input[1] - 1

# a_score = 0
# b_score = 0

# roll_count = 0

# while True:
#     a_i = (a_i + dice_i + 1) % 10
#     dice_i = (dice_i + 1) % 100
#     a_i = (a_i + dice_i + 1) % 10
#     dice_i = (dice_i + 1) % 100
#     a_i = (a_i + dice_i + 1) % 10
#     dice_i = (dice_i + 1) % 100

#     roll_count += 3

#     a_score += a_i + 1

#     if a_score >= 1000:
#         print(b_score, roll_count, b_score * roll_count)
#         break

#     b_i = (b_i + dice_i + 1) % 10
#     dice_i = (dice_i + 1) % 100
#     b_i = (b_i + dice_i + 1) % 10
#     dice_i = (dice_i + 1) % 100
#     b_i = (b_i + dice_i + 1) % 10
#     dice_i = (dice_i + 1) % 100

#     roll_count += 3

#     b_score += b_i + 1

#     if b_score >= 1000:
#         print(a_score, roll_count, a_score * roll_count)
#         break

# print('done')
