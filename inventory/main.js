import { DatabaseSync } from "sqlite";
import { queryInventory } from "./src/query_inventory.js";
import * as fns from "./src/sqlite/sqlite_inventory.js";
import { createRequestHandler } from "./src/request_handler.js";

const main = (fns, args) => {
  try {
    const db = new DatabaseSync("./db/inventory.db");

    // const result = queryInventory(db, fns, args);

    const requestHandler = createRequestHandler(null, fns, db);

    Deno.serve(requestHandler);

    // if (!result) {
    //   return;
    // }
    // console.table(result);
  } catch (error) {
    console.log(error); 
  }
};

main(fns, Deno.args);
