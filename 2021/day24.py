# nodemon --exec "python3 ./2021/day24.py" ./2021/day24.py

import copy
import collections
import random
from day24input import instructions

# def run_instructions(input):
#     registers = dict([
#         ('x', 0),
#         ('y', 0),
#         ('z', 0),
#         ('w', 0),
#     ])

#     for instruction in instructions:
#         if instruction[0] == 'inp':
#             registers[instruction[1]] = input.popleft()
#             continue

#         other = None
#         if isinstance(instruction[2], int):
#             other = instruction[2]
#         else:
#             other = registers[instruction[2]]

#         if instruction[0] == 'add':
#             registers[instruction[1]] += other

#         if instruction[0] == 'mul':
#             registers[instruction[1]] *= other

#         if instruction[0] == 'div':
#             if other == 0: return 0

#             registers[instruction[1]] //= other

#         if instruction[0] == 'mod':
#             if other == 0: return 0

#             registers[instruction[1]] %= other

#         if instruction[0] == 'eql':
#             if registers[instruction[1]] == other:
#                 registers[instruction[1]] = 1
#             else:
#                 registers[instruction[1]] = 0

#         return registers['z']

def run_instructions(registers):
    letters = collections.deque([char for char in 'abcdefghijklmn'])

    # for _ in range(char_offset):
    #     letters.popleft()

    # registers = dict([
    #     ('x', 0),
    #     ('y', 0),
    #     ('z', 0),
    #     ('w', 0),
    # ])

    for instruction in instructions:
        # print(registers['z'])
        # print('')
        # print('')

        if instruction[0] == 'inp':
            registers[instruction[1]] = letters.popleft()
            continue

        other = None
        if isinstance(instruction[2], int):
            other = instruction[2]
        else:
            other = registers[instruction[2]]

        if instruction[0] == 'add':
            if other == 0:
                continue

            elif registers[instruction[1]] == 0:
                registers[instruction[1]] = other

            elif isinstance(registers[instruction[1]], int) and isinstance(other, int):
                registers[instruction[1]] += other

            else:
                registers[instruction[1]] = ['add', copy.deepcopy(registers[instruction[1]]), other]

        if instruction[0] == 'mul':
            if other == 0:
                registers[instruction[1]] = 0

            elif other == 1:
                continue
            elif registers[instruction[1]] == 1:
                registers[instruction[1]] = other

            elif isinstance(registers[instruction[1]], int) and isinstance(other, int):
                registers[instruction[1]] *= other
            else:
                registers[instruction[1]] = ['mul', copy.deepcopy(registers[instruction[1]]), other]

        if instruction[0] == 'div':
            if other == 1:
                continue

            elif isinstance(registers[instruction[1]], int) and isinstance(other, int):
                registers[instruction[1]] //= other
            else:
                registers[instruction[1]] = ['div', copy.deepcopy(registers[instruction[1]]), other]

        if instruction[0] == 'mod':
            if other == 1:
                continue

            elif isinstance(registers[instruction[1]], int) and isinstance(other, int):
                registers[instruction[1]] %= other
            else:
                registers[instruction[1]] = ['mod', copy.deepcopy(registers[instruction[1]]), other]

        if instruction[0] == 'eql':
            if instruction[1] == 'x' and instruction[2] == 'w':
                registers[instruction[1]] = 0
            elif isinstance(registers[instruction[1]], int) and isinstance(other, int):
                registers[instruction[1]] = 1 if registers[instruction[1]] == other else 0
            elif isinstance(registers[instruction[1]], str) and isinstance(other, int) and (other >= 10 or other <= 0):
                registers[instruction[1]] = 0
            elif isinstance(registers[instruction[1]], int) and isinstance(other, str) and (registers[instruction[1]] >= 10 or registers[instruction[1]] <= 0):
                registers[instruction[1]] = 0
            else:
                registers[instruction[1]] = ['eql', copy.deepcopy(registers[instruction[1]]), other]


    print(registers)
    return registers['z']

registers = dict([
    ('x', 0),
    ('y', 0),
    ('z', 0),
    ('w', 0),
])

# # 30 2
# registers = dict([
#     ('x', 1),
#     ('y', 26),
#     ('z', ['add', 'a', 6]),
#     ('w', 'b'),
# ])

# # 50 2
# registers = dict([
#     ('x', 1),
#     ('y', 26),
#     ('z', ['a', 6]),
#     ('w', 'b'),
# ])


def pprint(arr):
    if isinstance(arr, list):
        builder = '('
        builder += pprint(arr[1])
        if arr[0] == 'add':
            builder += ' + '
        elif arr[0] == 'mul':
            builder += ' * '
        elif arr[0] == 'div':
            builder += ' / '
        elif arr[0] == 'mod':
            builder += ' % '

        builder += pprint(arr[2])
        builder += ')'
        return builder

    return str(arr)

res = run_instructions(registers)
print(pprint(res))


# ['add', 'a', 6]
#



# model_no = 99999999999999
# while True:
#     if model_no % 100000 == 0:
#         print(model_no)

#     input = [int(a) for a in str(model_no)]
#     if 0 in input:
#         model_no -= 1
#         continue

#     input = collections.deque(input)
#     res = run_instructions(input)

#     if res != 0:
#         print(model_no)
#         exit()

#     model_no -= 1




#A 11, 6
#B 11, 12
#C 11, 8
#D -11, 7
#E 15, 7
#F 15, 12
#G 14, 2
#H -7, 15
#I 12, 4
#J -6, 5
#K -10, 12
#L -15, 11
#M -9, 13
#N -0, 7

# PUSH INPUT[0] + 6  !! 0
# PUSH INPUT[1] + 12  !! 0 1
# PUSH INPUT[2] + 8  !! 0 1 2
# POP INPUT[3] = (INPUT[2] + 8) - 11  !! 0 1
# PUSH INPUT[4] + 7  !! 0 1 4
# PUSH INPUT[5] + 12  !! 0 1 4 5
# PUSH INPUT[6] + 2  !! 0 1 4 5 6
# POP INPUT[7] = (INPUT[6] + 2) - 7  !! 0 1 4 5
# PUSH INPUT[8] + 4  !! 0 1 4 5 8
# POP INPUT[9] = (INPUT[8] + 4) - 6  !! 0 1 4 5
# POP INPUT[10] = (INPUT[5] + 12) - 10  !! 0 1 4
# POP INPUT[11] = (INPUT[4] + 7) - 15  !! 0 1
# POP INPUT[12] = (INPUT[1] + 12) - 9  !! 0
# POP INPUT[14] = (INPUT[0] + 6) - 0  !!


# D = (C + 8) - 11
# H = (G + 2) - 7
# J = (I + 4) - 6
# K = (F + 12) - 10
# L = (E + 7) - 15
# M = (B + 12) - 9
# N = (A + 6) - 0


# D = C - 3
# H = G - 5
# J = I - 2
# K = F + 2
# L = E - 8
# M = B + 3
# N = A + 6

# A = 1
# B = 1
# C = 4
# D = 1
# E = 9
# F = 1
# G = 6
# H = 1
# I = 3
# J = 1
# K = 3
# L = 1
# M = 4
# N = 7

# 11419161313147

# A = 3
# B = 6
# C = 9 +
# D = 6
# E = 9 +
# F = 7
# G = 9 +
# H = 4
# I = 9 +
# J = 7
# K = 9 +
# L = 1
# M = 9 +
# N = 9 +

# 36969794979189
