import { assertEquals, assertThrows } from "@std/assert";
import {
  addItem,
  createInventory,
  getItemId,
  initInventory,
  listInventory,
  updateItemQuantity,
} from "../../src/memory/memory_inventory.js";

import { beforeEach, describe, it } from "@std/testing/bdd";

describe("memory based inventory", () => {
  let inventory;
  beforeEach(() => {
    inventory = createInventory();
  });

  describe("createInventory", () => {
    it("create an inventory", () => {
      assertEquals(createInventory(), { tables: {} });
    });
  });

  describe("initInventory", () => {
    it("inventory is undefined", () => {
      assertThrows(() => initInventory(undefined));
    });
    it("inventory is present", () => {
      assertEquals(initInventory(inventory), { tables: { items: [] } });
    });
    it("items table is present", () => {
      initInventory(inventory);
      inventory.tables.items.push(
        { id: 1, name: "Mouse", category: "electronics", quantity: 5 },
      );

      assertEquals(initInventory(inventory), {
        tables: {
          items: [{
            id: 1,
            name: "Mouse",
            category: "electronics",
            quantity: 5,
          }],
        },
      });
    });
  });

  describe("listInventory", () => {
    it("list all the rows from the items table", () => {
      initInventory(inventory);
      inventory.tables.items.push(
        { id: 1, name: "Mouse", category: "electronics", quantity: 5 },
      );

      assertEquals(listInventory(inventory), [
        { id: 1, name: "Mouse", category: "electronics", quantity: 5 },
      ]);
    });
    it("inventory is undefined", () => {
      assertThrows(() => listInventory(undefined));
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
      assertThrows(() => addItem(inventory));
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
    it("missing item id", () => {
      initInventory(inventory);
      assertThrows(() => getItemId(inventory, "pen"));
    });
    it("item is present", () => {
      initInventory(inventory);
      addItem(inventory, {
        name: "Keyboard",
        category: "electronics",
        quantity: 15,
      });
      addItem(inventory, {
        name: "Mouse",
        category: "electronics",
        quantity: 5,
      });
      assertEquals(getItemId(inventory, "Mouse"), 2);
    });
  });

  describe("updateItemQuantity", () => {
    it("inventory is undefined", () => {
      assertThrows(() => updateItemQuantity(undefined));
    });
    it("items table is undefined", () => {
      assertThrows(() => updateItemQuantity(inventory));
    });
    it("update an item's quantity", () => {
      initInventory(inventory);
      const id = addItem(inventory, {
        id: 1,
        name: "Mouse",
        category: "electronics",
        quantity: 5,
      });
      const updatedTable = updateItemQuantity(inventory, { id, quantity: 12 });
      assertEquals(updatedTable, {
        id: 1,
        name: "Mouse",
        category: "electronics",
        quantity: 12,
      });
    });
    it("id is undefined", () => {
      assertThrows(() => updateItemQuantity(inventory, { quantity: 67 }));
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
  });
});
