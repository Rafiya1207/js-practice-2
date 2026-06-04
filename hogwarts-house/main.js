import { requestHandler } from "./src/request_handler.js";

const main = () => {
  Deno.serve({ port: 8001, hostname: "10.132.126.232" }, requestHandler);
};

main();
