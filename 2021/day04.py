# nodemon --exec "python3 ./2021/day04.py" ./2021/day04.py

from day04input import input
boards = input


drawn_nums = [
    17,25,31,22,79,72,58,47,62,50,30,91,11,63,66,83,33,75,44,18,56,81,32,46,93,13,41,65,14,95,19,38,8,35,52,7,12,70,84,23,4,42,90,60,6,40,97,16,27,86,5,48,54,64,29,67,26,89,99,53,34,0,57,3,92,37,59,9,21,78,51,80,73,82,76,28,88,96,45,69,98,1,2,71,68,49,36,15,55,39,87,77,74,94,61,85,10,43,20,24
]


# board is a set of marked positions
def is_board_win(board):
    is_win = False

    for i in range(5):
        is_row_win = True
        for j in range(5):
            cell = i * 5 + j
            if cell not in board:
                is_row_win = False

        is_win = is_win or is_row_win

    for i in range(5):
        is_col_win = True
        for j in range(5):
            cell = i + j * 5
            if cell not in board:
                is_col_win = False

        is_win = is_win or is_col_win

    return is_win

board_scores = list(map(lambda x: set(), boards))

winning_boards = set()
winning_boards_list = []

last_num = None
winning_board = None

for num in drawn_nums:
    for (board_i, board) in enumerate(boards):
        for i in range(25):
            cell = board[i]
            if cell == num:
                board_scores[board_i].add(i)

    for i in range(len(boards)):
        if is_board_win(board_scores[i]):
            if i not in winning_boards:
                winning_boards_list.append(i)
            winning_boards.add(i)

    if len(winning_boards) == len(boards):
        winning_board = winning_boards_list.pop()
        last_num = num
        break

print(last_num, winning_board)

board_score = board_scores[winning_board]
board = boards[winning_board]

sum_of_unmarked = 0
for i in range(25):
    if i not in board_score:
        sum_of_unmarked += board[i]

print(sum_of_unmarked)
print(last_num)

print(sum_of_unmarked * last_num)
