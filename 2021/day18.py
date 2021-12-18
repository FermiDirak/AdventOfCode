# nodemon --exec "python3 ./2021/day18.py" ./2021/day18.py

import copy
from day18input import input

def check_ten(root):
    stack = [(root, 0, (None, None))]
    while stack:
        (curr, depth, (parent, p_i)) = stack.pop()

        if isinstance(curr, int):
            if curr >= 10:
                r_down = curr // 2
                r_up = curr - r_down
                parent[p_i] = [r_down, r_up]
                return True
        else:
            stack.append((curr[1], depth + 1, (curr, 1)))
            stack.append((curr[0], depth + 1, (curr, 0)))

    return False


def explode(root):
    mutated = False

    prev_parent = None
    carry = -10

    stack = [(root, 0, (None, None))]
    while stack:
        (curr, depth, (parent, p_i)) = stack.pop()

        if isinstance(curr, int):
            prev_parent = (parent, p_i)

            if carry != -10:
                parent[p_i] = curr + carry
                break
        else:
            if isinstance(curr[0], int) and isinstance(curr[1], int) and depth >= 4 and mutated == False:
                if prev_parent:
                    prev_parent[0][prev_parent[1]] = prev_parent[0][prev_parent[1]] + curr[0]
                carry = curr[1]
                parent[p_i] = 0
                mutated = True
            else:
                stack.append((curr[1], depth + 1, (curr, 1)))
                stack.append((curr[0], depth + 1, (curr, 0)))

    return mutated

def reduce(list):
    mutated = True

    while mutated:
        mutated = False
        mutated = mutated or explode(list)
        mutated = mutated or check_ten(list)

    return mutated

def add(a, b):
    res = [a[:], b[:]]
    reduce(res)
    return res

def mag(root):
    if isinstance(root, int):
        return root

    return 3 * mag(root[0]) + 2 * mag(root[1])

# res = add([[[[4,3],4],4],[7,[[8,4],9]]], [1,1])
# print(res)

# res = add([[[1,1],[2,2]],[3,3]], [4,4])
# print(res)

data = [
    [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]],
    [[[5,[2,8]],4],[5,[[9,9],0]]],
    [6,[[[6,2],[5,6]],[[7,6],[4,7]]]],
    [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]],
    [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]],
    [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]],
    [[[[5,4],[7,7]],8],[[8,3],8]],
    [[9,3],[[9,9],[6,[4,9]]]],
    [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]],
    [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]],
]

# res = input[0]

# for d in input[1:]:
#     res = add(res, d)

# print(res)
# print(mag(res))


# a = [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]
# print(reduce(a))


max_sum = 0
for i in range(len(input)):
    for j in range(len(input)):
        if i == j: continue

        aa, bb = input[i], input[j]
        s = mag(add(copy.deepcopy(aa), copy.deepcopy(bb)))
        if s > max_sum:
            print(aa,'---', bb)
        max_sum = max(max_sum, s)

print(max_sum)
