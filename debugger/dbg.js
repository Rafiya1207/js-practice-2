export class Debugger {
  /**
   * error logs
   * dbg function
   */

  logs = [];

  constructor() {
  }

  dbg(x) {
    console.log(x);
    prompt();
    return x;
  }
}
