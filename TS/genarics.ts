type Juxt = <A>(...args: A[]) => [A, A];

const juxt = (f: Compose, g: Compose): Juxt => <A>(...args: A[]): [A, A] => [
  f(...args),
  g(...args),
];

type Identity = <A>(a: A) => A;

const applyTwice = <A>(f: Identity, x: A): A => f(f(x));

type Flip = <A, B>(a: A, b: B) => A | B;

const flip = (f: Flip): Flip => <A, B>(a: A, b: B): A | B => f(b, a);

const constantly = <T>(x: T): () => T => (): T => x;

const on = (f: Flip, g: Identity): Flip => <X, Y>(x: X, y: Y): X | Y =>
  f(g(x), g(y));

const pairWith = (f: Identity): Juxt => <A>(x: A): [A, A] => [x, f(x)];

const tap = (f: Identity): Identity => <X>(x: X): X => {
  f(x);
  return x;
};

const zipWith = <A1, A2>(f: Flip, a1: A1[], a2: A2[]): (A1 | A2)[] =>
  a1.map((x, i) => f(x, a2[i]));

const prop = (key: string) => (obj) => obj[key];

const wrap = (f: Identity): Identity => (x) => {
  console.log(x);
  const result = f(x);
  console.log(result);
  return result;
};

const fork = (combine: Flip, f: Identity, g: Identity): Identity => (x) =>
  combine(f(x), g(x));
