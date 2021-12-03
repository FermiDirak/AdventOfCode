# nodemon --exec "python3 ./2021/day03.py" ./2021/day03.py

from day03input import input
input = list(map(lambda x: list(x), input))

def find_oxygen():
    valids = set()
    for i in range(len(input)):
        valids.add(i)

    for i in range(len(input[0])):
        if len(valids) == 1:
            break

        is_one = 0

        for num_i in valids:
            num = input[num_i]
            if num[i] == '1':
                is_one += 1
            else:
                is_one -= 1

        new_valids = set()

        for num_i in valids:
            num = input[num_i]

            if is_one > 0:
                if num[i] == '1':
                    new_valids.add(num_i)
            elif is_one < 0:
                if num[i] == '0':
                    new_valids.add(num_i)
            else: # == 0
                if num[i] == '1':
                    new_valids.add(num_i)

        valids = new_valids

    oxygen = input[valids.pop()]
    ox_val = 0

    for i in range(len(oxygen)):
        ai = len(oxygen) - i - 1
        ox_ai = 1 if oxygen[ai] == '1' else 0
        ox_val += (2 ** i) * ox_ai

    return ox_val

def find_co2():
    valids = set()
    for i in range(len(input)):
        valids.add(i)

    for i in range(len(input[0])):
        if len(valids) == 1:
            break

        is_one = 0

        for num_i in valids:
            num = input[num_i]
            if num[i] == '1':
                is_one += 1
            else:
                is_one -= 1

        new_valids = set()

        for num_i in valids:
            num = input[num_i]

            if is_one > 0:
                if num[i] == '0':
                    new_valids.add(num_i)
            elif is_one < 0:
                if num[i] == '1':
                    new_valids.add(num_i)
            else: # == 0
                if num[i] == '0':
                    new_valids.add(num_i)

        valids = new_valids

    oxygen = input[valids.pop()]
    ox_val = 0

    for i in range(len(oxygen)):
        ai = len(oxygen) - i - 1
        ox_ai = 1 if oxygen[ai] == '1' else 0
        ox_val += (2 ** i) * ox_ai

    return ox_val


ox_val = find_oxygen()
co2_val = find_co2()
print(ox_val, co2_val, ox_val * co2_val)


# values = []

# first = list(input[0])

# for i in range(len(list(input[0]))):
#     values.append(0)

# for data in input:
#     data = list(data)

#     for i in range(len(data)):
#         cell = data[i]
#         if cell == '1':
#             values[i] += 1
#         else:
#             values[i] -= 1

# gamma = []
# eps = []

# for val in values:
#     if val > 0:
#         gamma.append(1)
#         eps.append(0)
#     else:
#         gamma.append(0)
#         eps.append(1)

# g_val = 0
# eps_val = 0

# for i in range(len(gamma)):
#     ai = len(gamma) - i - 1
#     g_val += (2 ** i) * gamma[ai]

# for i in range(len(eps)):
#     ai = len(eps) - i - 1
#     eps_val += (2 ** i) * eps[ai]

# print(g_val * eps_val)

# print(g_val, eps_val)