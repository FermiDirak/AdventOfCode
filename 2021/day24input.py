# instructions = [
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0), # x0 y0 z0 wn
# ('add', 'x', 'z'), # x0 y0 z0 wn
# ('mod', 'x', 26), # x0 y0 z0 wn
# ('add', 'x', 11), # x11 y0 z0 wn
# ('eql', 'x', 'w'), # x0 y0 z0 wn
# ('eql', 'x', 0), # x1 y0 z0 wn
# ('mul', 'y', 0), # x1 y0 z0 wn
# ('add', 'y', 25), # x1 y25 z0 wn
# ('mul', 'y', 'x'), # x1 y25 z0 wn
# ('add', 'y', 1), # x1 y26 z0 wn
# ('mul', 'z', 'y'), # x1 y0 z0 wn
# ('mul', 'y', 0), # x1 y0 z0 wn
# ('add', 'y', 'w'), # x1 yn z0 wn
# ('add', 'y', 6), # x1 yn+6 z0 wn
# ('mul', 'y', 'x'), # x1 yn+6 z0 wn
# ('add', 'z', 'y'), # x1 yn+6 zn+6 wn
# ('inp', 'w',), # ------------------ # x1 yn+6 zn+6 wm
# ('mul', 'x', 0), # x0 yn+6 zn+6 wm
# ('add', 'x', 'z'), # xn+6 yn+6 zn+6 wm
# ('mod', 'x', 26), # x(n+6 % 26) yn+6 zn+6 wm
# ('add', 'x', 11), # x(n+6 % 26)+11 yn+6 zn+6 wm
# ('eql', 'x', 'w'), # x0 yn+6 zn+6 wm
# ('eql', 'x', 0), # x1 yn+6 zn+6 wm
# ('mul', 'y', 0), # x1 y0 zn+6 wm
# ('add', 'y', 25), # x1 y25 zn+6 wm
# ('mul', 'y', 'x'), # x1 y25 zn+6 wm
# ('add', 'y', 1), # x1 y26 zn+6 wm
# ('mul', 'z', 'y'), # x1 y26 z(n+6)*26 wm
# ('mul', 'y', 0), # x1 y0 z(n+6)*26 wm
# ('add', 'y', 'w'), # x1 ym z(n+6)*26 wm
# ('add', 'y', 12), # x1 ym+12 z(n+6)*26 wm
# ('mul', 'y', 'x'), # x1 ym+13 z(n+6)*26 wm
# ('add', 'z', 'y'), # x1 ym+13 z(n+6)*26+13+m wm
# ('inp', 'w',), # ------------------ # x1 ym+13 z(n+6)*26+13+m wc
# ('mul', 'x', 0), # x0 ym+13 z(n+6)*26+13+m wc
# ('add', 'x', 'z'), # x(n+6)*26+13+m ym+13 z(n+6)*26+13+m wc
# ('mod', 'x', 26), # x((n+6)*26+13+m) % 26 ym+13 z(n+6)*26+13+m wc
# ('add', 'x', 15), # x(((n+6)*26+13+m) % 26) + 15 ym+13 z(n+6)*26+13+m wc
# ('eql', 'x', 'w'), # x0 ym+13 z(n+6)*26+13+m wc
# ('eql', 'x', 0), # x1 ym+13 z(n+6)*26+13+m wc
# ('mul', 'y', 0), # x1 y0 z(n+6)*26+13+m wc
# ('add', 'y', 25), # x1 y25 z(n+6)*26+13+m wc
# ('mul', 'y', 'x'), # x1 y25 z(n+6)*26+13+m wc
# ('add', 'y', 1), # x1 y26 z(n+6)*26+13+m wc
# ('mul', 'z', 'y'),  # x1 y26 z((n+6)*26+13+m)*26 wc
# ('mul', 'y', 0),  # x1 y0 z((n+6)*26+13+m)*26 wc
# ('add', 'y', 'w'), # x1 yc z((n+6)*26+13+m)*26 wc
# ('add', 'y', 8), # x1 yc+8 z((n+6)*26+13+m)*26 wc
# ('mul', 'y', 'x'), # x1 yc+8 z((n+6)*26+13+m)*26 wc
# ('add', 'z', 'y'), # x1 yc+8 z((n+6)*26+13+m)*26+c+8 wc
# ('inp', 'w',), # ------------------ # x1 yc+8 z((n+6)*26+13+m)*26+c+8 wd
# ('mul', 'x', 0), # x0 yc+8 z((n+6)*26+13+m)*26+c+8 wd
# ('add', 'x', 'z'), # x((n+6)*26+13+m)*26+c+8 yc+8 z((n+6)*26+13+m)*26+c+8 wd
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -11),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 7),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 15),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 7),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 15),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 12),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 14),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 2),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -7),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 15),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 12),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 4),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -6),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 5),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -10),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 12),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -15),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 11),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -9),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 13),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# # ('add', 'x', 0),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 7),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),

# ]



instructions = [
('inp', 'w',), # ------------------
('mul', 'x', 0), # x0 y0 z0 wa
('add', 'x', 'z'), # x0 y0 z0 wa
('mod', 'x', 26), # x0 y0 z0 wa
('add', 'x', 11), # x11 y0 z0 wa
('eql', 'x', 'w'), # x0 y0 z0 wa
('eql', 'x', 0), # x1 y0 z0 wa
('mul', 'y', 0), # x1 y0 z0 wa
('add', 'y', 25), # x1 y25 z0 wa
('mul', 'y', 'x'), # x1 y25 z0 wa
('add', 'y', 1), # x1 y26 z0 wa
('mul', 'z', 'y'), # x1 y26 z0 wa
('mul', 'y', 0), # x1 y0 z0 wa
('add', 'y', 'w'), # x1 ya z0 wa
('add', 'y', 6), # x1 ya+6 z0 wa
('mul', 'y', 'x'), # x1 ya+6 z0 wa
('add', 'z', 'y'), # x1 ya+6 za+6 wa
('inp', 'w',), # ------------------ a+6 #b
('mul', 'x', 0), # x0 ya+6 za+6 wb
('add', 'x', 'z'), # xa+6 ya+6 za+6 wb
('mod', 'x', 26), # x(a+6)%26 ya+6 za+6 wb
('add', 'x', 11), # x((a+6)%26)+11 ya+6 za+6 wb
('eql', 'x', 'w'), # x((a+6)%26)+11 ya+6 za+6 wb
('eql', 'x', 0), # x1 ya+6 za+6 wb
('mul', 'y', 0), # x1 y0 za+6 wb
('add', 'y', 25), # x1 y25 za+6 wb
('mul', 'y', 'x'), # x1 y25 za+6 wb
('add', 'y', 1), # x1 y26 za+6 wb
('mul', 'z', 'y'), # x1 y26 z(a+6)*26 wb
('mul', 'y', 0), # x1 y0 z(a+6)*26 wb
('add', 'y', 'w'), # # x1 yb z(a+6)*26 wb
('add', 'y', 12), # x1 yb+12 z(a+6)*26 wb
('mul', 'y', 'x'), # x1 yb+12 z(a+6)*26 wb
('add', 'z', 'y'), # x1 yb+12 z((a+6)*26)+(b+12) wb
('inp', 'w',), # ------------------ (a+6), (b+12) #c
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26),
('add', 'x', 15),
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 8),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (c+8) #d
('mul', 'x', 0), # x0 y0 z! wd
('add', 'x', 'z'), # x! y0 z! wd
('mod', 'x', 26), #(c+8)
('div', 'z', 26), # (a+6), (b+12)
('add', 'x', -11), # x(c+8)-11 -> c=3
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 7),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), #e
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 7),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (e+7) #f
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 12),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (e+7), (f+12) #g
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 2),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (e+7), (f+12), (g+2) #h
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26), # (g+2)
('div', 'z', 26), # (a+6), (b+12), (d+7), (e+7), (f+12)
('add', 'x', -7), # g+2-7 -> g=5
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 15),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (e+7), (f+12), #i
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26),
('add', 'x', 12),
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 4),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (e+7), (f+12), (i+4), #j
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26),
('div', 'z', 26), # (a+6), (b+12), (e+7), (f+12), (h+15)
('add', 'x', -6), # i+4-6 -> i=2
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 5),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (e+7), (f+12), #k
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26),
('div', 'z', 26), # (a+6), (b+12), (e+7), (f+12), (h+15)
('add', 'x', -10), # f+12-10 -> g=-2
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 12),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), (e+7) #l
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26),
('div', 'z', 26), # (a+6), (b+12), (e+7), (f+12), (h+15), (j+5)
('add', 'x', -15), # e+7-15 -> e=8
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 11),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ (a+6), (b+12), #m
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26),
('div', 'z', 26), # (a+6), (b+12), (e+7), (f+12), (h+15), (j+5)
('add', 'x', -9), # b+12-9 -> l=-3
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 13),
('mul', 'y', 'x'),
('add', 'z', 'y'),
('inp', 'w',), # ------------------ # (a+6) #n
('mul', 'x', 0),
('add', 'x', 'z'),
('mod', 'x', 26),
('div', 'z', 26),
('add', 'x', 0), # a+6-0 -> m=-6
('mul', 'x', 0),
('mul', 'y', 0),
('add', 'y', 26),
('mul', 'z', 'y'),
('mul', 'y', 0),
('add', 'y', 'w'),
('add', 'y', 7),
('mul', 'y', 'x'),
('add', 'z', 'y'),

]



# instructions = [
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 11),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 6),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 11),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 12),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 15),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 8),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -11),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 7),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 15),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 7),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 15),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 12),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 14),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 2),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -7),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 15),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('add', 'x', 12),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 4),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -6),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 5),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -10),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 12),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -15),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 11),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', -9),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 13),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),
# ('inp', 'w',), # ------------------
# ('mul', 'x', 0),
# ('add', 'x', 'z'),
# ('mod', 'x', 26),
# ('div', 'z', 26),
# ('add', 'x', 0),
# ('eql', 'x', 'w'),
# ('eql', 'x', 0),
# ('mul', 'y', 0),
# ('add', 'y', 25),
# ('mul', 'y', 'x'),
# ('add', 'y', 1),
# ('mul', 'z', 'y'),
# ('mul', 'y', 0),
# ('add', 'y', 'w'),
# ('add', 'y', 7),
# ('mul', 'y', 'x'),
# ('add', 'z', 'y'),

# ]