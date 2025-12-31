const fakePromise = class {
  status = "<pending>";

  constructor(callBack) {
    callBack(
      (...args) => this.resolve.apply(this, args),
      (...args) => this.reject.apply(this, args),
    );
  }

  resolve(args) {
    this.status = args;
    return args;
  }

  reject(args) {
    this.status = `<rejected> ${args}`;
    throw args;
  }

  then(callBack) {
    return new fakePromise((res, rej) => {
      setTimeout(() => {
        return res(callBack(this.status));
      }, 0);
    });
  }
};

const fp = new fakePromise((res, rej) => {
  return res([1, 6, 7]);
});

const a = fp
  .then((x) => {
    console.log(x);
    return x;
  })
  .then((y) => console.log(y));

console.log(a);
