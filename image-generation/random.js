const imageData = await Deno.readFile("./diitto.png");

console.log(imageData); 
// console.log(String.fromCharCode(...imageData));

//base64
const base64 = btoa(String.fromCharCode(...imageData))
// console.log(base64);

// console.log('----------');

// const obj = new TextEncoder();

// console.log(base64.length);

// console.log(obj.encode(base64));

console.log(`\x1b_Gf=100,a=T;${base64}\x1b\\`);


// console.log(`\x1b[48;2;156;90;180m  \x1b0`);

// console.log(`\\x`.charCodeAt(1))

// const binary = (195).toString(2).padStart(8, "0");
// const left = binary.slice(0, 4);
// const right = binary.slice(4);

// console.log(binary);
// console.log(left);
// console.log(right);

// const address1 = parseInt(left, 2);
// const address2 = parseInt(right, 2);

// console.log(address1, address2);


// const r1 = imageData[address1];
// const g1 = imageData[address1 + 1];
// const b1 = imageData[address1 + 2];

// console.log(`\x1b[48;2;${r1};${g1};${b1}m  \x1b0`);

// console.log();

// // const base64 = String.fromCharCode(65);

// // console.log(base64);

// // const esc = `\x1b_Gf=100,a=T;${base64}\x1b\\`;
// // Deno.stdout.writeSync(new TextEncoder().encode(esc + "\n"));

// // import fs from "node:fs";
// // import process from "node:process";

// // const imageData = fs.readFileSync("./diitto.png");
// // const base64 = imageData.toString("base64");
// // const esc = `\x1b_Gf=100,a=T;${base64}\x1b\\`;
// // process.stdout.write(esc);
