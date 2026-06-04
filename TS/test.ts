type Compose = <F, G>(
  f: (arg: G) => F,
  g: (...args: any[]) => G,
) => (...args: any[]) => F;

const compose: Compose = (f, g) => (...args) => f(g(...args));

type Juxt = <T1, T2, A extends unknown[]>(
  f: (...args: A) => T1,
  g: (...args: A) => T2,
) => (...args: A) => [T1, T2];

const juxt: Juxt = (f, g) => (...args) => [f(...args), g(...args)];

type AT = <X>(f: (arg: X) => X, x: X) => X;
const applyTwice: AT = (f, x) => f(f(x));

type Flip = <F, A, B>(f: (b: B, a: A) => F) => (a: A, b: B) => F;
const flip: Flip = (f) => (a, b) => f(b, a);

type Constantly = <X>(x: X) => () => X;
const constantly: Constantly = (x) => () => x;

type On = <F, G, Z>(
  f: (p1: G, p2: G) => F,
  g: (z: Z) => G,
) => (x: Z, y: Z) => F;
const on: On = (f, g) => (x, y) => f(g(x), g(y));

type PW = <X, F>(f: (arg: X) => F) => (x: X) => [X, F];
const pairWith: PW = (f) => (x) => [x, f(x)];

type Tap = <X, F>(f: (arg: X) => F) => (x: X) => X;

const tap: Tap = (f) => (x) => {
  f(x);
  return x;
};

type ZW = <X, V, F>(f: (x: X, v: V) => F, a1: X[], a2: V[]) => F[];
const zipWith: ZW = (f, a1, a2) => a1.map((x, i) => f(x, a2[i]));

type Prop = <V>(key: string) => (obj: { [key: string]: V }) => V;
const prop: Prop = (key) => (obj) => obj[key];

type Wrap = <X, F>(f: (x: X) => F) => (x: X) => F;
const wrap: Wrap = (f) => (x) => {
  console.log(x);
  const result = f(x);
  console.log(result);
  return result;
};

type Fork = <Y, Z, C, X>(
  c: (f: Y, g: Z) => C,
  f: (a: X) => Y,
  g: (a: X) => Z,
) => (x: X) => C;
const fork: Fork = (combine, f, g) => (x) => combine(f(x), g(x));

const increment = (x: number) => x + 1;
const isEven = (x: number): boolean => x % 2 === 0;
const repeat = (x: number, y: string) => y.repeat(x);
const len = (x: string) => x.length;
const not = (x: boolean) => !x;
const toUpper = (x: string) => x.toUpperCase();
const firstChar = (x: string) => x[0];
const toStr = (x: number) => x.toString();

// compose tests
const addTwo = compose(increment, increment);
const isOneAboveEven = compose(isEven, increment);
const isMaxEven = compose(isEven, Math.max);
const isMaxOdd = compose(not, isMaxEven);
const isRepeatedEven = compose(isEven, compose(len, repeat));
const shoutLength = compose(len, toUpper);
const firstCharIsEvenLength = compose(isEven, compose(len, firstChar));
const stringifiedIncrement = compose(toStr, increment);

// juxt tests
const bothMath = juxt(increment, increment);
const mathPair = juxt(increment, (x: number) => x * 2);
const evenAndOdd = juxt(isEven, compose(not, isEven));
const maxAndMin = juxt(Math.max, Math.min);
const lengthAndFirst = juxt(len, firstChar);

// applyTwice tests
const twiceInc = applyTwice(increment, 5);
const twiceNot = applyTwice(not, true);

// flip tests
const flippedRepeat = flip(repeat);
const flippedMax = flip(Math.max);

// on tests
const sumLengths = on((a, b) => a + b, len);
const compareLengths = on((a, b) => a > b, len);

// pairWith tests
const pairInc = pairWith(increment);
const pairLen = pairWith(len);

// tap tests
const tappedInc = tap(increment);
const tappedLog = tap(console.log);

// zipWith tests
const summed = zipWith((a, b) => a + b, [1, 2], [3, 4]);
const zippedStrings = zipWith((a, b) => a + b, ["a"], ["b"]);

// prop tests
const getName = prop("name");
const getAge = prop("age");

// wrap tests
const wrappedInc = wrap(increment);
const wrappedLen = wrap(len);

// fork tests
const sumAndMultiply = fork(
  (a, b) => a + b,
  (x: number) => x + 1,
  (x: number) => x * 2,
);

const fn = <T extends unknown[]>(arr: T): number => 1;

fn(["ab", "cd", 5])
