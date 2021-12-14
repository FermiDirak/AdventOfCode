# nodemon --exec "python3 ./2021/day14.py" ./2021/day14.py

import collections
from day14input import input

first_line = 'SHHBNFBCKNHCNOSHHVFF'

def mapper(line):
    return line

input = map(mapper, input)

res = 0

recepie = {}

for line in input:
    recepie[line[0]] = line[1]



# def tick(polymer):
#     new_poly = []

#     for i in range(len(polymer) - 1):
#         pair = polymer[i] + polymer[i + 1]
#         if pair not in recepie:
#             print('wtf')

#         new_poly.append(polymer[i])
#         new_poly.append(recepie[pair])

#     new_poly.append(polymer[-1])

#     return ''.join(new_poly)

char_count = [collections.defaultdict(int)]

def tick2(polymer):
    new_poly = collections.defaultdict(int)
    new_char_count = collections.defaultdict(int)

    for (pair, count) in polymer.items():
        new_char = recepie[pair]
        pair1 = pair[0] + new_char
        pair2 = new_char + pair[1]
        new_poly[pair1] += count
        new_poly[pair2] += count

        new_char_count[pair[0]] += count
        # new_char_count[pair[1]] += count
        new_char_count[new_char] += count

    char_count[0] = new_char_count
    return new_poly


poly = collections.defaultdict(int)
for i in range(len(first_line) - 1):
    pair = first_line[i] + first_line[i + 1]
    poly[pair] += 1


for i in range(40):
    poly = tick2(poly)


print(max(char_count[0].values()) - min(char_count[0].values()) - 1)


# print(poly)

# print(max(poly.values()) - min(poly.values()))
