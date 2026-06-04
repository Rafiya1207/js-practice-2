import { throwErrorIfUndefined } from "../error_messages.js";

export const createInventory = () => ({
  tables: {},
});

export const initInventory = (inventory) => {
  throwErrorIfUndefined(inventory, "inventory", "initInventory");

  if (inventory.tables.items) return inventory;

  inventory.tables.items = [];
  return inventory;
};

export const listInventory = (inventory) => {
  throwErrorIfUndefined(inventory, "inventory", "listInventory");
  throwErrorIfUndefined(inventory.tables.items, "items", "listInventory");

  return inventory.tables.items;
};

const validateArgs = (inventory, { name, category, quantity }) => {
  if (quantity <= 0 || isNaN(quantity)) {
    throw new Error("validateArgs: invalid quantity");
  }

  throwErrorIfUndefined(name, "name", "validateArgs");
  throwErrorIfUndefined(category, "category", "validateArgs");
  throwErrorIfUndefined(quantity, "quantity", "validateArgs");

  const itemByName = inventory.tables.items.find(({ name: n }) => n === name);

  if (itemByName) {
    throw new Error(`validateArgs: ${name} already exists`);
  }
};

export const getItemId = (inventory, item_name) => {
  throwErrorIfUndefined(inventory, "inventory", "getItemId");
  throwErrorIfUndefined(inventory.tables.items, "items", "getItemId");

  const itemByName = inventory.tables.items.find(({ name }) =>
    name === item_name
  );
  
  if (itemByName) {
    return itemByName.id;
  }
  throw new Error("getItemId: item not found");
};

export const addItem = (inventory, args) => {
  throwErrorIfUndefined(inventory, "inventory", "addItem");
  throwErrorIfUndefined(inventory.tables.items, "items", "addItem");

  validateArgs(inventory, args);

  const id = inventory.tables.items.length + 1;
  const item = { id, ...args };

  inventory.tables.items.push(item);
  return getItemId(inventory, args.name);
};

export const getItemById = (inventory, searchId) =>
  inventory.tables.items.find(({ id }) => id === searchId);

export const updateItemQuantity = (inventory, args) => {
  throwErrorIfUndefined(inventory, "inventory", "updateItemQuantity");
  throwErrorIfUndefined(inventory.tables.items, "items", "updateItemQuantity");
  throwErrorIfUndefined(args.id, "id", "updateItemQuantity");

  const searchedItem = getItemById(inventory, args.id);

  if (!searchedItem) {
    throw new Error(`updateItemQuantity: missing id ${args.id}`);
  }

  searchedItem.quantity = args.quantity;
  return getItemById(inventory, args.id);
};
