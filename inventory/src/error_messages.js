export const throwErrorIfUndefined = (arg, value, fnName) => {
  if (arg === undefined) {
    throw new Error(`${fnName} : ${value} is undefined`);
  }
};
