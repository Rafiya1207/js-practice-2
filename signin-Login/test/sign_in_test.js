import { assertEquals } from "jsr:@std/assert";

Deno.test("store sign in data", () => {
  assertEquals(storeUserCredentials())
});
