import { data } from "./data.js";

export const parseData = () => {
  const csvData = Deno.readTextFileSync("./db/data.txt");
  csvData
    .split("\n")
    .map((row) => row.split(","))
    .forEach((row) => data.push({ userName: row[0], password: row[1] }));
};
