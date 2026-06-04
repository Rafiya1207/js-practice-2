console.log('1: Start');

setTimeout(() => console.log('2: setTimeout 1'), 0);

Promise.resolve()
  .then(() => console.log('3: Promise 1'))
  .then(() => console.log('4: Promise 2'));

async function asyncFunc() {
  console.log('5: Async start');

  try {
    await Promise.resolve();
    console.log('6: After await');

    throw new Error('Oops');
    console.log('7: After throw');
  } catch (e) {
    console.log('8: Caught error');
    return 'caught';
  } finally {
    console.log('9: Finally block');
  }

  console.log('10: After finally');
}

const result = asyncFunc();

result.then(val => console.log('11: Result:', val));

Promise.resolve().then(() => {
  console.log('12: Promise 3');
  setTimeout(() => console.log('13: setTimeout 2'), 0);
});

console.log('14: End');
