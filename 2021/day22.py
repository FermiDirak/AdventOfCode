# nodemon --exec "python3 ./2021/day22.py" ./2021/day22.py

import copy
import collections
import random
from day22input import input

class Block:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

    def size(self):
        xs = self.x[1] - self.x[0]
        ys = self.y[1] - self.y[0]
        zs = self.z[1] - self.z[0]
        return xs * ys * zs

    def __hash__(self) -> int:
        return hash(repr(self))

    def __repr__(self):
        return f"<Block {self.x}, {self.y}, {self.z}>"

def mapper(line):
    (mode, x_range, y_range, z_range) = line
    x_range = (min(x_range), max(x_range) + 1)
    y_range = (min(y_range), max(y_range) + 1)
    z_range = (min(z_range), max(z_range) + 1)

    block = Block(x_range, y_range, z_range)
    return (mode, block)

input = list(map(mapper, input))

def intersect(a, b):
    x_range = (max(a.x[0], b.x[0]), min(a.x[1], b.x[1]))
    x_range = (x_range[0], max(x_range))

    y_range = (max(a.y[0], b.y[0]), min(a.y[1], b.y[1]))
    y_range = (y_range[0], max(y_range))

    z_range = (max(a.z[0], b.z[0]), min(a.z[1], b.z[1]))
    z_range = (z_range[0], max(z_range))

    return Block(x_range, y_range, z_range)


cubes = collections.Counter()
for (type, block) in input:
    print(len(cubes), block)

    updates = collections.Counter()

    for (other, count) in cubes.items():
        intersection = intersect(block, other)


        if intersection.size() > 0:
            updates[intersection] -= count

    if type == 'on':
        updates[block] += 1

    cubes.update(updates)

total = 0
for (cube, count) in cubes.items():
    total += cube.size() * count
print(total)


# # Breaks up the candidate block into 8 smaller pieces if intersection
# def collides(a, candidate):
#     if a.size() == 0 or candidate.size() == 0:
#         return None

#     if a.x[1] <= candidate.x[0] or a.x[0] >= candidate.x[1]:
#         return None

#     if a.y[1] <= candidate.y[0] or a.y[0] >= candidate.y[1]:
#         return None

#     if a.z[1] <= candidate.z[0] or a.z[0] >= candidate.z[1]:
#         return None


#     x1 = (min(a.x[0], candidate.x[0]), a.x[0])
#     x2 = (max(a.x[0], candidate.x[0]), min(a.x[1], candidate.x[1]))
#     x3 = (a.x[1], max(a.x[1], candidate.x[1]))

#     y1 = (min(a.y[0], candidate.y[0]), a.y[0])
#     y2 = (max(a.y[0], candidate.y[0]), min(a.y[1], candidate.y[1]))
#     y3 = (a.y[1], max(a.y[1], candidate.y[1]))

#     z1 = (min(a.z[0], candidate.z[0]), a.z[0])
#     z2 = (max(a.z[0], candidate.z[0]), min(a.z[1], candidate.z[1]))
#     z3 = (a.z[1], max(a.z[1], candidate.z[1]))


#     block1 = Block(x1, y1, z1)
#     block2 = Block( x2, y1, z1,)
#     block3 = Block( x3, y1, z1,)
#     block4 = Block( x1, y2, z1,)
#     block5 = Block( x2, y2, z1,)
#     block6 = Block( x3, y2, z1,)
#     block7 = Block( x1, y3, z1,)
#     block8 = Block( x2, y3, z1,)
#     block9 = Block( x3, y3, z1,)
#     block10 = Block( x1, y1, z2,)
#     block11 = Block( x2, y1, z2,)
#     block12 = Block( x3, y1, z2,)
#     block13 = Block( x1, y2, z2,)
#     # mid = Block( x2, y2, z2,)
#     block14 = Block( x3, y2, z2,)
#     block15 = Block( x1, y3, z2,)
#     block16 = Block( x2, y3, z2,)
#     block17 = Block( x3, y3, z2,)
#     block18 = Block( x1, y1, z3,)
#     block19 = Block( x2, y1, z3,)
#     block20 = Block( x3, y1, z3,)
#     block21 = Block( x1, y2, z3,)
#     block22 = Block( x2, y2, z3,)
#     block23 = Block( x3, y2, z3,)
#     block24 = Block( x1, y3, z3,)
#     block25 = Block( x2, y3, z3,)
#     block26 = Block( x3, y3, z3,)

#     blocks = [
#         block1,
#         block2,
#         block3,
#         block4,
#         block5,
#         block6,
#         block7,
#         block8,
#         block9,
#         block10,
#         block11,
#         block12,
#         block13,
#         block14,
#         block15,
#         block16,
#         block17,
#         block18,
#         block19,
#         block20,
#         block21,
#         block22,
#         block23,
#         block24,
#         block25,
#         block26,
#     ]

#     filtered_blocks = list(filter(lambda x: x.size() > 0, blocks))
#     print(len(filtered_blocks))

#     return filtered_blocks


# lines = collections.deque(input)
# on_cubes = set()
# while len(lines) > 0:
#     (type, block) = lines.popleft()

#     if type == 'on':
#         conflicts = False
#         for other in on_cubes:
#             blocks = collides(other, block)

#             if blocks != None:
#                 for b in blocks:
#                     if b.size() != 0:
#                         lines.append((type, b))
#                 conflicts = True
#                 break

#         if conflicts == False:
#             on_cubes.add(block)

#     else:
#         pass

print('done')

exit()
