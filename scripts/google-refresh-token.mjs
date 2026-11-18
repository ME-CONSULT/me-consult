// One-time helper: connects ME Consult's Google account and prints the
// GOOGLE_REFRESH_TOKEN used to create Meet links for paid bookings.
//
// Usage:
//   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/google-refresh-token.mjs
//
// The OAuth client must be a "Web application" with this redirect URI added:
//   http://localhost:53682/callback

import http from "node:http";
import { exec } from "node:child_process";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error("Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET first.");
  process.exit(1);
}

const redirectUri = "http://localhost:53682/callback";
const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/calendar.events",
    access_type: "offline",
    prompt: "consent",
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri);
  if (url.pathname !== "/callback") return res.end();

  const code = url.searchParams.get("code");
  if (!code) {
    res.end("No code returned: " + (url.searchParams.get("error") ?? "unknown error"));
    return server.close();
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  const data = await tokenRes.json();

  if (data.refresh_token) {
    res.end("Connected. You can close this tab and go back to the terminal.");
    console.log("\nAdd this to .env.local and Vercel:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${data.refresh_token}\n`);
  } else {
    res.end("No refresh token returned. Check the terminal.");
    console.error(data);
  }
  server.close();
});

server.listen(53682, () => {
  console.log("Opening Google sign-in. Sign in with the ME Consult Google account.");
  console.log("If the browser doesn't open, visit:\n" + authUrl);
  exec(`open "${authUrl}"`);
});
