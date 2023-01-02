// This function verifies the token to prevent generating images with random parameters (`id`).

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const key = crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode("my_secret"),
  { name: "HMAC", hash: { name: "SHA-256" } },
  false,
  ["sign"]
);

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, "0"))
    .join("");
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const verifyToken = toHex(
    await crypto.subtle.sign(
      "HMAC",
      await key,
      new TextEncoder().encode(JSON.stringify({ id }))
    )
  );

  if (token !== verifyToken) {
    return new Response("Invalid token.", { status: 401 });
  }

  const hasTitle = searchParams.has("title");
  const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
