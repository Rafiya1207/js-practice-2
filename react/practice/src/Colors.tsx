export class Colors {
  #colors;
  #i;
  constructor() {
    this.#colors = ["red", "blue", "green", "black", "yellow"];
    this.#i = 0;
  }

  get() {
    return this.#colors[this.#i++ % this.#colors.length];
  }
}
