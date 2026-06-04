import { DatabaseSync } from "node:sqlite";
import { throwErrorIfUndefined } from "../error_messages.js";
import { tableExists } from "../table_exists.js";

export const createInventory = () => new DatabaseSync(":memory:");

export const initInventory = (inventory) => {
  throwErrorIfUndefined(inventory, "inventory", "initInventory");

  inventory.exec(`CREATE TABLE IF NOT EXISTS items(
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER CHECK (quantity > 0),
    last_updated_date TEXT DEFAULT CURRENT_DATE
)STRICT`);
};

export const listInventory = (inventory) => {
  throwErrorIfUndefined(inventory, "inventory", "listInventory");
  if (!tableExists(inventory, "items")) {
    throw new Error(`listInventory: items didn't exist`);
  }

  const rows = inventory
    .prepare(`SELECT * FROM items`)
    .all();

  return rows.map(
    ({ item_id, item_name, category, quantity, last_updated_date }) => ({
      item_id,
      item_name,
      category,
      quantity,
      last_updated_date,
    }),
  );
};

export const getItemId = (inventory, item_name) => {
  throwErrorIfUndefined(inventory, "inventory", "getItemId");

  if (!tableExists(inventory, "items")) {
    throw new Error(`getItemId: items didn't exist`);
  }
  const id = inventory.prepare(
    `SELECT item_id FROM items WHERE item_name = ?`,
  ).get(item_name);

  if (id) {
    return id.item_id;
  }
  throw new Error("getItemId: item not found");
};

export const addItem = (inventory, { name, category, quantity }) => {
  throwErrorIfUndefined(inventory, "inventory", "addItem");
  if (isNaN(quantity)) {
    throw new Error("addItem: invalid quantity");
  }

  if (!tableExists(inventory, "items")) {
    throw new Error(`addItem: items didn't exist`);
  }

  inventory.prepare(
    `INSERT INTO items (item_name, category, quantity) VALUES (?, ?, ?)`,
  ).run(name, category, quantity);
  return getItemId(inventory, name);
};

export const getItemById = (inventory, searchId) =>
  inventory.prepare(`SELECT * FROM items WHERE item_id = ?`).get(searchId);

const validateUpdateArgs = ({ id, quantity }) => {
  if (isNaN(quantity) || isNaN(id)) {
    throw new Error("addItem: invalid quantity/id");
  }
  throwErrorIfUndefined(id, "id", "updateItemQuantity");
  throwErrorIfUndefined(quantity, "quantity", "updateItemQuantity");
};

export const updateItemQuantity = (inventory, args) => {
  throwErrorIfUndefined(inventory, "inventory", "updateItemQuantity");
  validateUpdateArgs(args);

  if (!tableExists(inventory, "items")) {
    throw new Error(`updateItemQuantity: items didn't exist`);
  }

  inventory.prepare(
    `UPDATE items SET quantity = ?, last_updated_date = CURRENT_DATE WHERE item_id = ?`,
  ).run(args.quantity, args.id);

  const updatedItem = getItemById(inventory, args.id);

  if (!updatedItem) {
    throw new Error("id not found");
  }

  return updatedItem;
};
