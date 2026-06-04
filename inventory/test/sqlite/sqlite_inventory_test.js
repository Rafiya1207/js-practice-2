import { assertEquals, assertThrows } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import {
  addItem,
  createInventory,
  getItemId,
  initInventory,
  listInventory,
  updateItemQuantity,
} from "../../src/sqlite/sqlite_inventory.js";
import { tableExists } from "../../src/table_exists.js";

describe("sqlite - db based inventory", () => {
  let inventory;
  beforeEach(() => {
    inventory = createInventory();
  });

  describe("initInventory", () => {
    it("inventory is undefined", () => {
      assertThrows(() => initInventory(undefined));
    });

    it("inventory is present", () => {
      initInventory(inventory);
      assertEquals(true, tableExists(inventory, "items"));
    });

    it("items table is present", () => {
      initInventory(inventory);
      initInventory(inventory);
      assertEquals(true, tableExists(inventory, "items"));
    });
  });

  describe("listInventory", () => {
    it("inventory is undefined", () => {
      assertThrows(() => listInventory(undefined));
    });
    it("list all the rows from the items table", () => {
      initInventory(inventory);

      inventory.prepare(
        `INSERT INTO items (item_name, category, quantity) VALUES (?, ?, ?)`,
      ).run("Mouse", "electronics", 5);

      assertEquals(listInventory(inventory), [{
        item_id: 1,
        item_name: "Mouse",
        category: "electronics",
        quantity: 5,
        last_updated_date: "2026-02-05",
      }]);
    });
    it("items table has no rows", () => {
      initInventory(inventory);
      assertEquals(listInventory(inventory), []);
    });
    it("items table is undefined", () => {
      assertThrows(() => listInventory(inventory));
    });
  });

  describe("addItem", () => {
    it("inventory is undefined", () => {
      assertThrows(() => addItem(undefined));
    });
    it("items table is undefined", () => {
      assertThrows(() =>
        addItem(inventory, {
          name: "Mouse",
          category: "electronics",
          quantity: 5,
        })
      );
    });
    it("add an item to the table", () => {
      initInventory(inventory);
      const args = { name: "Mouse", category: "electronics", quantity: 5 };
      assertEquals(addItem(inventory, args), 1);
    });
    it("add an item to the table containing items", () => {
      initInventory(inventory);
      const item1 = { name: "Mouse", category: "electronics", quantity: 5 };
      addItem(inventory, item1);
      const item2 = { name: "Keyboard", category: "electronics", quantity: 15 };
      assertEquals(addItem(inventory, item2), 2);
    });
    it("quantity is not number", () => {
      initInventory(inventory);

      const item = { name: "Keyboard", category: "electronics", quantity: NaN };
      assertThrows(() => addItem(inventory, item));
    });
    it("quantity is undefined", () => {
      initInventory(inventory);

      const item = {
        name: "Keyboard",
        category: "electronics",
        quantity: undefined,
      };
      assertThrows(() => addItem(inventory, item));
    });
    it("category is undefined", () => {
      initInventory(inventory);

      const item = { name: "Keyboard", category: undefined, quantity: 15 };
      assertThrows(() => addItem(inventory, item));
    });
    it("name is undefined", () => {
      initInventory(inventory);

      const item = { name: undefined, category: "electronics", quantity: 15 };
      assertThrows(() => addItem(inventory, item));
    });
    it("adding an item which already exists", () => {
      initInventory(inventory);
      const item = { name: "Mouse", category: "electronics", quantity: 5 };
      addItem(inventory, item);

      assertThrows(() => addItem(inventory, item));
    });
  });

  describe("getItemId", () => {
    it("inventory is undefined", () => {
      assertThrows(() => getItemId(undefined));
    });
    it("items table is undefined", () => {
      assertThrows(() => getItemId(inventory));
    });
    it("get an id of an item", () => {
      initInventory(inventory);
      inventory.prepare(
        `INSERT INTO items (item_name, category, quantity) VALUES (?, ?, ?)`,
      ).run("Mouse", "electronics", 5);
      assertEquals(getItemId(inventory, "Mouse"), 1);
    });
    it("missing item", () => {
      initInventory(inventory);
      assertThrows(() => getItemId(inventory, "pen"));
    });
  });

  describe("updateItemQuantity", () => {
    it("inventory is undefined", () => {
      assertThrows(() => updateItemQuantity(undefined));
    });
    it("items table is undefined", () => {
      assertThrows(() =>
        updateItemQuantity(inventory, {
          id: 2,
          quantity: 12,
        })
      );
    });
    it("quantity is undefined", () => {
      initInventory(inventory);
      assertThrows(() => updateItemQuantity(inventory, { id: 14 }));
    });
    it("id is undefined", () => {
      initInventory(inventory);
      assertThrows(() => updateItemQuantity(inventory, { quantity: 14 }));
    });
    it("id is missing", () => {
      initInventory(inventory);
      assertThrows(() =>
        updateItemQuantity(inventory, {
          id: 2,
          quantity: 12,
        })
      );
    });
    it("update an item's quantity", () => {
      initInventory(inventory);
      const id = addItem(inventory, {
        id: 1,
        name: "Mouse",
        category: "electronics",
        quantity: 5,
      });
      const updatedTable = updateItemQuantity(inventory, {
        id,
        quantity: 12,
      });
      assertEquals(updatedTable, {
        item_id: 1,
        item_name: "Mouse",
        category: "electronics",
        quantity: 12,
        last_updated_date: "2026-02-05",
      });
    });
    it("id is NaN", () => {
      initInventory(inventory);
      assertThrows(() =>
        updateItemQuantity(inventory, { id: NaN, quantity: 34 })
      );
    });
    it("quantity is NaN", () => {
      initInventory(inventory);
      assertThrows(() =>
        updateItemQuantity(inventory, { id: 4, quantity: NaN })
      );
    });
  });
});
