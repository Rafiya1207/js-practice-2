const message  = Deno.readTextFileSync('./message.txt');

console.log(message.split('\n').join(''));