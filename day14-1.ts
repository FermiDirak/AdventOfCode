import {readFileSync} from 'fs';

const inputs = readFileSync('./day14-1.txt', 'utf8').split('\n');

function parseEncodedItem(str: string) {
  const [num, id] = str.split(' ');
  return [Number.parseInt(num), id];
}

const stash = {};

const recipies = inputs.reduce((acc, curr) => {
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

function adjustRecipie(minCount: number, recipie: any) {
  const multConstant = minCount <= recipie.count ? 1 : Math.ceil(minCount / recipie.count);

  const newRecipie = {
    count: recipie.count * multConstant,
    items: recipie.items.map(item => [item[0] * multConstant, item[1]]),
  }

  return newRecipie;
}

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

console.log(dfs('FUEL', 1));
