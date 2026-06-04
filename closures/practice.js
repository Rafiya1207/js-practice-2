const fn2 = function (...args) {
  console.log(this);
  const arr = [...args, ...args, ...args];
  return arr.map((x) => Math.pow(x, this));
};

const newFn = fn2.bind(2);
newFn(1, 2, 3, 4, 5);

const fakeBind = (funcToBind, argument) => {
  return (x) => funcToBind.apply(argument, [x]);
};

const addThree = function (x) {
  console.log("this" + this);
  console.log("x" + x);

  return this + x;
};

const newFB = fakeBind(addThree, 3);

newFB(4);

const inBetween = function (s, e) {

  return this.filter((z) => z > s && z < e);
};

const arr = [1, 2, 3, 4, 5, 6, 7, 89, 90];
const numbersBetween = inBetween.bind(arr);

numbersBetween(2, 9);


const isVowel = function (item) {
  return this.includes(item);
}
