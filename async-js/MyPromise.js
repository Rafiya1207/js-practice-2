class MyPromise {
  constructor(executor) {
    this.executor = executor;
    this.resolve = function (value) {
      this.isResolved = true;
      this.resolvedValue = value;
    };
    this.reject = function () {};
    this.executor &&
      this.executor(this.resolve.bind(this), this.reject.bind(this));
  }

  then(onResolve) {
    this.onResolve = onResolve;
    if (this.isResolved) {
      this.onResolve(this.resolvedValue);
    }
    return new MyPromise();
  }
}

const p = new MyPromise((r) => r(1))

// const p = new MyPromise((r) => r(1)).then((x) => console.log(x));
