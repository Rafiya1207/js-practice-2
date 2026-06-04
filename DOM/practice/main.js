import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.post("/add", (c) => {
  return c.text(c);
});
