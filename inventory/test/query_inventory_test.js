import { beforeEach, describe, it } from "@std/testing/bdd";
import { parse, queryInventory } from "../src/query_inventory.js";
import { assertEquals, assertThrows } from "@std/assert";
import * as fns from "../src/sqlite/sqlite_inventory.js";
import { tableExists } from "../src/table_exists.js";

describe("terminal-based inventory management system", () => {
  describe("parser", () => {
    it("parseAddArgs", () => {
      assertEquals(parse(["add", "keyboard", "electronics", "18"]), {
        operation: "add",
        name: "keyboard",
        category: "electronics",
        quantity: 18,
      });
    });
    it("parseAddArgs - quantity is not a number", () => {
      assertEquals(parse(["add", "keyboard", "electronics", "abc"]), {
        operation: "add",
        name: "keyboard",
        category: "electronics",
        quantity: NaN,
      });
    });
    it("parseAddArgs - quantity is not provided", () => {
      assertEquals(parse(["add", "keyboard", "electronics"]), {
        operation: "add",
        name: "keyboard",
        category: "electronics",
        quantity: NaN,
      });
    });
    it("parseAddArgs - category, quantity are not provided", () => {
      assertEquals(parse(["add", "keyboard"]), {
        operation: "add",
        name: "keyboard",
        category: undefined,
        quantity: NaN,
      });
    });
    it("parseAddArgs - no args provided", () => {
      assertEquals(parse(["add"]), {
        operation: "add",
        name: undefined,
        category: undefined,
        quantity: NaN,
      });
    });
    it("parseAddArgs - misplaced category", () => {
      assertEquals(parse(["add", "electronics"]), {
        operation: "add",
        name: "electronics",
        category: undefined,
        quantity: NaN,
      });
    });
    it("parseAddArgs - misplaced args", () => {
      assertEquals(parse(["add", "electronics", "keyboard", "12"]), {
        operation: "add",
        name: "electronics",
        category: "keyboard",
        quantity: 12,
      });
    });
    it("parseUpdateArgs", () => {
      assertEquals(parse(["update", "1", "18"]), {
        operation: "update",
        id: 1,
        quantity: 18,
      });
    });
    it("parseUpdateArgs - quantity is not a number", () => {
      assertEquals(parse(["update", "1", "abc"]), {
        operation: "update",
        id: 1,
        quantity: NaN,
      });
    });
    it("parseUpdateArgs - id is not a number", () => {
      assertEquals(parse(["update", "a", "7"]), {
        operation: "update",
        id: NaN,
        quantity: 7,
      });
    });
    it("parseUpdateArgs - quantity is not provided", () => {
      assertEquals(parse(["update", "2"]), {
        operation: "update",
        id: 2,
        quantity: NaN,
      });
    });
    it("parseUpdateArgs - no args provided", () => {
      assertEquals(parse(["update"]), {
        operation: "update",
        id: NaN,
        quantity: NaN,
      });
    });
    it("arg is list", () => {
      assertEquals(parse(["list"]), {
        operation: "list",
      });
    });
    it("arg is init", () => {
      assertEquals(parse(["init"]), {
        operation: "init",
      });
    });
  });
  describe("queryInventory", () => {
    let inventory;
    beforeEach(() => {
      inventory = fns.createInventory();
    });
    describe("initInventory", () => {
      it("successfully initialize items table", () => {
        queryInventory(inventory, fns, ["init"]);
        assertEquals(true, tableExists(inventory, "items"));
      });
      it("inventory is undefined", () => {
        assertThrows(() => queryInventory(undefined, fns, ["init"]));
      });
    });
    describe("listInventory", () => {
      it("inventory is undefined", () => {
        assertThrows(() => queryInventory(undefined, fns, ["list"]));
      });
      it("list all the rows from the items table", () => {
        queryInventory(inventory, fns, ["init"]);

        queryInventory(inventory, fns, ["add", "Mouse", "electronics", "5"]);

        assertEquals(queryInventory(inventory, fns, ["list"]), [{
          item_id: 1,
          item_name: "Mouse",
          category: "electronics",
          quantity: 5,
          last_updated_date: "2026-02-05",
        }]);
      });
      it("items table has no rows", () => {
        queryInventory(inventory, fns, ["init"]);
        assertEquals(queryInventory(inventory, fns, ["list"]), []);
      });
      it("items table is undefined", () => {
        assertThrows(() => queryInventory(inventory, fns, ["list"]));
      });
    });
    describe("addItem", () => {
      it("inventory is undefined", () => {
        assertThrows(() => queryInventory(undefined, fns, ["add"]));
      });
      it("items table is undefined", () => {
        assertThrows(() =>
          queryInventory(inventory, fns, ["add", "Mouse", "electronics", "5"])
        );
      });
      it("add an item to the table", () => {
        queryInventory(inventory, fns, ["init"]);
        assertEquals(
          queryInventory(inventory, fns, ["add", "Mouse", "electronics", "5"]),
          1,
        );
      });
      it("quantity is not number", () => {
        queryInventory(inventory, fns, ["init"]);
        assertThrows(() =>
          queryInventory(inventory, fns, ["add", "Mouse", "electronics", "abc"])
        );
      });
      it("quantity is undefined", () => {
        queryInventory(inventory, fns, ["init"]);
        assertThrows(() =>
          queryInventory(inventory, fns, [
            "add",
            "Mouse",
            "electronics",
            undefined,
          ])
        );
      });
      it("category is undefined", () => {
        queryInventory(inventory, fns, ["init"]);
        assertThrows(() =>
          queryInventory(inventory, fns, ["add", "Mouse", undefined])
        );
      });
      it("name is undefined", () => {
        queryInventory(inventory, fns, ["init"]);
        assertThrows(() => queryInventory(inventory, fns, ["add", undefined]));
      });
      it("adding an item which already exists", () => {
        queryInventory(inventory, fns, ["init"]);
        queryInventory(inventory, fns, ["add", "Mouse", "electronics", "16"]);
        assertThrows(() =>
          queryInventory(inventory, fns, ["add", "Mouse", "electronics", "16"])
        );
      });
    });
    describe("updateItemQuantity", () => {
      it("inventory is undefined", () => {
        assertThrows(() => queryInventory(undefined, fns, ["update"]));
      });
      it("items table is undefined", () => {
        assertThrows(() =>
          queryInventory(inventory, fns, ["update", "1", "18"])
        );
      });
      it("quantity is undefined", () => {
        queryInventory(inventory, fns, ["init"]);
        assertThrows(() => queryInventory(inventory, fns, ["update", "1"]));
      });
      it("id is missing", () => {
        queryInventory(inventory, fns, ["init"]);
        assertThrows(() => queryInventory(inventory, fns, ["3", "12"]));
      });
      it("update an item's quantity", () => {
        queryInventory(inventory, fns, ["init"]);
        queryInventory(inventory, fns, ["add", "Mouse", "electronics", "2"]);
        assertEquals(queryInventory(inventory, fns, ["update", "1", "12"]), {
          item_id: 1,
          item_name: "Mouse",
          category: "electronics",
          quantity: 12,
          last_updated_date: "2026-02-05",
        });
      });
    });
    describe("input validation", () => {
      it("inventory is undefined", () => {
        assertThrows(() => queryInventory(undefined, fns, ["init"]));
      });
      it("fns is undefined", () => {
        assertThrows(() => queryInventory(inventory, undefined, ["init"]));
      });
      it("input args are undefined", () => {
        assertThrows(() => queryInventory(inventory, fns, undefined));
      });
    });
  });
});
