export class Debugger {
  /**
   * error logs
   * dbg function
   */

  #logs;

  constructor() {
    this.#logs = [];
    this.dbg = (x) => this.dbg.apply(this, [x]);
    console.log(this.dbg(9));
    
  }

  dbg(x) {
    console.log(x);
    return x;
  }
}
