const tty3 = await Deno.open("/dev/ttys016");
const tty1 = await Deno.open("/dev/ttys001", { write: true });

const writer = tty1.writable.getWriter()

tty3.setRaw(true);
for await (const chunk of tty3.readable) {
  writer.write(chunk);
}
