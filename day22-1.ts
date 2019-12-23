import {readFileSync} from 'fs';


function deal(cards: number[]) {
  return cards.reverse();
}

function cut(cards: number[], n: number) {
  const sliceA = cards.slice(0, n);
  const sliceB = cards.slice(n);

  return [...sliceB, ...sliceA];
}

function dealIncrementN(cards: number[], n: number) {
  const tempCards = cards.slice().reverse();
  const res = [];
  let index = 0;


  while (tempCards.length !== 0) {
    res[index] = tempCards.pop();

    index = (index + n) % cards.length;
  }

  return res;
}

function applyInstruction(cards: number[], instruction: string) {
  if (instruction === 'deal into new stack') {
    return deal(cards);
  }

  if (instruction.includes('cut')) {
    const n = Number.parseInt(/cut (.*?)$/.exec(instruction)[1]);
    return cut(cards, n);
  }

  if (instruction.includes('deal with increment')) {
    const n = Number.parseInt(/deal with increment (.*?)$/.exec(instruction)[1]);
    return dealIncrementN(cards, n);
  }
}

const instructions = readFileSync('./day22-1.txt', 'utf8').split('\n');
let cards = Array.from({length: 10007}).map((_, i) => i);

instructions.forEach(instruction => {
  cards = applyInstruction(cards, instruction);
});

console.log(cards.findIndex(card => card === 2019));