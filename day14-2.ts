import {readFileSync} from 'fs';

const input = readFileSync('./day14-1.txt', 'utf8')

function parseRecipies(input: string) {
  function parseEncodedItem(str: string) {
    const [num, id] = str.split(' ');
    return [Number.parseInt(num), id];
  }

  const stash = {};

  const recipies = input.split('\n').reduce((acc, curr) => {
    const formula = curr.split(' => ');
    const result = parseEncodedItem(formula[1]);
    const items = formula[0].split(', ').map(item => parseEncodedItem(item));

    acc[result[1]] = {
      count: result[0],
      items,
    };

    stash[result[1]] = 0;

    return acc;
  }, {});

  return {stash, recipies};
}

function adjustRecipie(minCount: number, recipie: any) {
  const multConstant = minCount <= recipie.count ? 1 : Math.ceil(minCount / recipie.count);

  const newRecipie = {
    count: recipie.count * multConstant,
    items: recipie.items.map(item => [item[0] * multConstant, item[1]]),
  }

  return newRecipie;
}

function run(targetFuel: number) {
  const {stash, recipies} = parseRecipies(input);
  return dfs('FUEL', targetFuel);

  function dfs(itemName: string, minCount: number) {
    let recipie = recipies[itemName];
    let ores = 0;

    recipie = adjustRecipie(minCount, recipie);

    stash[itemName] += recipie.count - minCount;

    recipie.items.forEach(([itemCount, item]) => {
      if (item === "ORE") {
        ores += itemCount;
        return;
      }

      if (stash[item]) {
        if (stash[item] >= itemCount) {
          stash[item] -= itemCount;
          return;

        } else {
          const requiredCount = itemCount - stash[item];
          stash[item] = 0;
          ores += dfs(item, requiredCount);
          return;
        }
      }

      ores += dfs(item, itemCount);
      return;
    });


    return ores;
  }
}

function optimize(target: number) {
  let left = 0;
  let right = 10000000;

  let best = -Infinity;

  while (left <= right) {
    const center = Math.floor((right + left) / 2);

    const res = run(center);

    if (res < target) {
      best = Math.max(center, best);
      left = center + 1;
    } else if (res >= target) {
      right = center - 1;
    }
  }

  console.log(left, right);

  return best;
}


console.log(optimize(1000000000000));
