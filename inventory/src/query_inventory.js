import { throwErrorIfUndefined } from "./error_messages.js";

export const parseAddArgs = (args) => {
  const parsedArgs = {};

  parsedArgs.name = args[0];
  parsedArgs.category = args[1];
  parsedArgs.quantity = parseInt(args[2]);

  return parsedArgs;
};

export const parseUpdateArgs = (args) => {
  const parsedArgs = {};

  parsedArgs.id = parseInt(args[0]);
  parsedArgs.quantity = parseInt(args[1]);

  return parsedArgs;
};

export const parse = ([operation, ...args]) => {
  const parsers = {
    "add": parseAddArgs,
    "update": parseUpdateArgs,
    "list": () => {},
    "init": () => {},
  };

  return { operation, ...parsers[operation](args) };
};

const validateQueryInventoryArgs = (inventory, fns, inputArgs) => {
  throwErrorIfUndefined(inventory, "inventory", "queryInventory");
  throwErrorIfUndefined(fns, "fns", "queryInventory");
  throwErrorIfUndefined(inputArgs, "inputArgs", "queryInventory");
};

export const queryInventory = (inventory, fns, inputArgs) => {
  validateQueryInventoryArgs(inventory, fns, inputArgs);
  const { operation, ...args } = parse(inputArgs);

  switch (operation) {
    case "init":
      return fns.initInventory(inventory);
    case "list": {
      return fns.listInventory(inventory);
    }
    case "add": {
      return fns.addItem(inventory, args);
    }
    case "update": {
      return fns.updateItemQuantity(inventory, args);
    }
  }
};
