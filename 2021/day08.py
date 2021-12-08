# nodemon --exec "python3 ./2021/day08.py" ./2021/day08.py

import collections
import random
from day08input import input

input2 = []
for pair in input:
    temp = (pair[0].split(" "), pair[1].split(" "))
    temp = (
        list(map(lambda x: ''.join(sorted(x)), temp[0])),
        list(map(lambda x: ''.join(sorted(x)), temp[1])),
    )
    input2.append(temp)

input = input2

# digit to seg count
digToSegCount = {
    0: 6,
    1: 2,
    2: 5,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 7,
    9: 6,
}

segCountToDig = {
    6: 0,
    2: 1,
    5: 2,
    5: 3,
    4: 4,
    5: 5,
    6: 6,
    3: 7,
    7: 8,
    6: 9,
}



# def decodeLine(line):
#     candidates = {
#         'a': set([1,2,3,4,5,6,7]),
#         'b': set([1,2,3,4,5,6,7]),
#         'c': set([1,2,3,4,5,6,7]),
#         'd': set([1,2,3,4,5,6,7]),
#         'e': set([1,2,3,4,5,6,7]),
#         'f': set([1,2,3,4,5,6,7]),
#         'g': set([1,2,3,4,5,6,7]),
#     }

#     a = 'abcdefg'

#     items = line[0][:]
#     for item in line[1]:
#         items.append(item)

#     for _ in range(10):

#         for item in items:
#             if len(item) == 2:
#                 for char in a:
#                     if char in item:
#                         candidates[char].discard(1)
#                         candidates[char].discard(2)
#                         candidates[char].discard(4)
#                         candidates[char].discard(5)
#                         candidates[char].discard(7)
#                     else:
#                         candidates[char].discard(3)
#                         candidates[char].discard(6)
#             if len(item) == 3:
#                 for char in item:
#                     if char in item:
#                         candidates[char].discard(2)
#                         candidates[char].discard(4)
#                         candidates[char].discard(5)
#                         candidates[char].discard(7)
#                     else:
#                         candidates[char].discard(1)
#                         candidates[char].discard(3)
#                         candidates[char].discard(6)
#             if len(item) == 4:
#                 for char in item:
#                     if char in item:
#                         candidates[char].discard(1)
#                         candidates[char].discard(5)
#                         candidates[char].discard(7)
#                     else:
#                         candidates[char].discard(2)
#                         candidates[char].discard(3)
#                         candidates[char].discard(4)
#                         candidates[char].discard(6)
#             if len(item) == 5:
#                 for char in item:
#                     pass



#     print(candidates)

segmentsToDigit = {
    '123567': '0',
    '36': '1',
    '13457': '2',
    '13467': '3',
    '2346': '4',
    '12467': '5',
    '124567': '6',
    '136': '7',
    '1234567': '8',
    '123467': '9',
}

def decodeLine(line):
    items = line[0][:]
    for item in line[1]:
        items.append(item)

    mapping = {}

    letters = list('abcdefg')
    numbers = [1,2,3,4,5,6,7]

    while True:
        random.shuffle(numbers)
        for i in range(7):
            mapping[letters[i]] = numbers[i]

        is_valid = True

        for word in items:
            mapped = sorted(list(map(lambda x: mapping[x], list(word))))
            serialized_mapped = ''.join(list(map(lambda x: str(x), mapped)))

            if serialized_mapped not in segmentsToDigit:
                is_valid = False

        if is_valid:
            break

    res = ''

    for word in line[1]:
        mapped = sorted(list(map(lambda x: mapping[x], list(word))))
        serialized_mapped = ''.join(list(map(lambda x: str(x), mapped)))

        res += segmentsToDigit[serialized_mapped]

    return int(res)


test_input = [
    ('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb', 'fdgacbe cefdb cefbgd gcbe'),
('edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec', 'fcgedb cgb dgebacf gc'),
('fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef', 'cg cg fdcagb cbg'),
('fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega', 'efabcd cedba gadfec cb'),
('aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga', 'gecf egdcabf bgf bfgea'),
('fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf', 'gebdcfa ecba ca fadegcb'),
('dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf', 'cefg dcbef fcge gbcadfe'),
('bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd', 'ed bcgafe cdgba cbgef'),
('egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg', 'gbdfcae bgc cg cgb'),
('gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc', 'fgae cfgab fg bagce'),
]

input2 = []
for pair in test_input:
    temp = (pair[0].split(" "), pair[1].split(" "))
    temp = (
        list(map(lambda x: ''.join(sorted(x)), temp[0])),
        list(map(lambda x: ''.join(sorted(x)), temp[1])),
    )
    input2.append(temp)

test_input = input2

total = 0

for (i, line) in enumerate(input):
    if i % 10 == 0: print(i)

    total += decodeLine(line)

print(total)



#   1111
#  2    3
#  2    3
#   4444
#  5    6
#  5    6
#   7777

#   0:      1:      2:      3:      4:
#  aaaa    ....    aaaa    aaaa    ....
# b    c  .    c  .    c  .    c  b    c
# b    c  .    c  .    c  .    c  b    c
#  ....    ....    dddd    dddd    dddd
# e    f  .    f  e    .  .    f  .    f
# e    f  .    f  e    .  .    f  .    f
#  gggg    ....    gggg    gggg    ....
#
#   5:      6:      7:      8:      9:
#  aaaa    aaaa    aaaa    aaaa    aaaa
# b    .  b    .  .    c  b    c  b    c
# b    .  b    .  .    c  b    c  b    c
#  dddd    dddd    ....    dddd    dddd
# .    f  e    f  .    f  e    f  .    f
# .    f  e    f  .    f  e    f  .    f
#  gggg    gggg    ....    gggg    gggg







# counter = 0

# for (_, codes) in input:
#     codes = codes.split(" ")

#     for code in codes:
#         lll = len(code)

#         if lll == 2 or lll == 4 or lll == 3 or lll == 7:
#             counter += 1

# print(counter)