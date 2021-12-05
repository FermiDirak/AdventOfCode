// nodemon --exec "deno run --no-check ./2021/ts_boilerplate.ts" ./2021/ts_boilerplate.ts

const a: string = 'a';
console.log(a);


const test = () => {
    let date: Date;
    [1, 2, 3].map(() => {
      date = new Date();
    });
    if (date) {
      return date.getTime();
    }
  }