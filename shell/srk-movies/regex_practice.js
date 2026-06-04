const functionDefinitions = Deno.readTextFileSync("./file.txt");
const arrowFunctions = Deno.readTextFileSync("./file2.txt");

const functionExp = /function (\w+)((.*)) {/g;
const arrowExp = /const (\w+) = ((.*)) => {/g;

const functionDef = "function $1$2 {";
const arrowDef = "const $1 = $2 => {";

const convertToArrow = functionDefinitions.replace(functionExp, arrowDef);
const convertToDefinition = arrowFunctions.replace(arrowExp, functionDef);

Deno.writeTextFileSync("./file2.txt", convertToArrow);
Deno.writeTextFileSync("./file3.txt", convertToDefinition);

const questionExp = /[\w+]+ ?/g;

const srkData = Deno.readTextFileSync("./finalSrk.csv");

const csvFieldExp = /\b[\w !]+,?|\"[\w ,]+\"/g;

const csvFields = srkData.match(csvFieldExp);
Deno.writeTextFileSync("file4.txt", csvFields.map(x => [x]));
// console.log(csvFields);
