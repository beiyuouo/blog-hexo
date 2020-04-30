import os
import re

path = "_posts/"
dirs = os.listdir(path)

patten = "20*"

rbt = open('robot.txt', 'w')
print("User-agent: *", file=rbt)

for file in dirs:
    # print(file)
    if re.match(patten, file):
        print(file)
        filename = file.split('.')[0]
        print(filename)
        print('Disallow:/blog/{}/*'.format(filename), file=rbt)


