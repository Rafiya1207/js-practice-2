import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";
import crypto from "node:crypto";
import base64url from "base64url";
import { connect } from "@db/redis";
import { sign, verify } from "jsonwebtoken";
import { getCookie, setCookie } from "hono/cookie";

console.log(Deno.env.get("PRIVATE_KEY"));
const app = new Hono();

app.use(logger());

const CLIENT_ID = Deno.env.get("SAMPLE_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("SAMPLE_CLIENT_SECRET");
const REDIRECT_URI = "http://localhost:8000/Oauth";
const AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";
const TOKEN_URL = "https://github.com/login/oauth/access_token";
const code_verifier = base64url(crypto.randomBytes(32));
const PRIVATE_KEY = crypto.randomBytes(32).toString("hex");

const client = await connect({
  username: "default",
  password: "gMN1sKsMd1h4fLEoGRwpbYkMFT3TT8fr",
  socket: {
    host: "redis-10030.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 10030,
  },
});

app.get("/auth", async (c) => {
  const url = new URL(AUTHORIZATION_URL);
  const state = crypto.randomBytes(32).toString("hex");
  await client.set(state, Date.now());

  const code_challenge = base64url(
    crypto.createHash("sha256").update(code_verifier).digest(),
  );

  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("scope", "read");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", code_challenge);
  url.searchParams.set("code_challenge_method", "S256");
  return c.redirect(url);
});

app.get("/Oauth", async (c) => {
  const { code, state, error } = c.req.query();
  if (!(await client.get(state))) {
    return c.json({ error: { message: "invalid state param" } }, 400);
  }

  await client.del(state);

  if (error) {
    return c.json(
      { error: { message: `Authorization failed: ${error}` } },
      400,
    );
  }

  if (!code) {
    return c.json({ error: { message: "Authorization code missing" } }, 400);
  }

  try {
    const url = new URL(TOKEN_URL);

    url.searchParams.set("client_id", CLIENT_ID);
    url.searchParams.set("grant_type", "authorization_code");
    url.searchParams.set("redirect_uri", REDIRECT_URI);
    url.searchParams.set("client_secret", CLIENT_SECRET);
    url.searchParams.set("code_verifier", code_verifier);
    url.searchParams.set("code", code);

    const tokenResponse = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
      },
    );

    const { access_token } = await tokenResponse.json();

    const userCredentialsResponse = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Accept": "application/json",
      },
    });

    const { login, id } = await userCredentialsResponse.json();
    const payload = { login, id, access_token };

    const jwtToken = sign(payload, PRIVATE_KEY);
    await client.set(`sessionId`, jwtToken, { ex: 10 });

    setCookie(c, "sessionId", jwtToken);

    return c.redirect("http://localhost:5173/");
  } catch (error: unknown) {
    if (error.response) {
      const { error: errorCode, error_description } = error.response.data;
      console.error("Token exchange failed:", errorCode, error_description);

      if (errorCode === "invalid_grant") {
        return c.json({
          error: { message: "Authorization code expired. Please try again." },
        }, 400);
      } else if (errorCode === "invalid_client") {
        return c.json(
          { error: { message: "Server configuration error" } },
          500,
        );
      }
    }

    return c.json({ error: { message: "Token exchange failed" } }, 500);
  }
});

app.get("/home", async (c) => {
  console.log("session ", (await client.get("sessionId")))
  if (!(await client.get("sessionId"))) {
    return c.redirect("/auth");
  }

  try {
    const token = getCookie(c, "sessionId");
    const { login, id } = verify(token, PRIVATE_KEY);

    return c.html("<h1>Hello</h1>");
  } catch (e: unknown) {
    console.log(error.message);
    return c.redirect("/auth");
  }
});

Deno.serve({ port: 8000 }, app.fetch);

// 47badcb75cb02d1931f0210fb8a06302384cf2f7
// Ov23lifDhhWT6RjRw139