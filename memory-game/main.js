const main = () => {
  Deno.serve((_req) => new Response("Hello, world"));
}
main();