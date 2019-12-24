import {readFileSync} from 'fs';

class CardDeck {
  t: number;
  tPrime: number;

  constructor(length: number, index: number) {
    this.t = index;
    this.tPrime = length - 1 - index;
  }

  deal() {
    const temp = this.t;
    this.t = this.tPrime;
    this.tPrime = temp;
  }

  cut() {

  }

}



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

function isCycleEnded(cards: number[]) {
  return cards.every((card, i) => card === i);
}

const instructions = readFileSync('./day22-1.txt', 'utf8').split('\n');
let cards = Array.from({length: 119315717514047}).map((_, i) => i);

let counter = 0;

while (true) {
  instructions.forEach(instruction => {
    cards = applyInstruction(cards, instruction);
  });

  counter += 1;
  console.log(counter);

  if (isCycleEnded(cards)) {
    console.log('success! ', counter);
    process.exit(0);
  }
}
