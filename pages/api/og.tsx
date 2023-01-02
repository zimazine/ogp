import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(new URL("../../public/panda.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export default async function ogp(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const fontData = await font;
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "Notion Memo";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: "url(http://localhost:3000/enb.jpg)",
          backgroundColor: "#000",
          backgroundSize: "100% 100%",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            width: "100%",
            fontSize: 60,
            fontStyle: "normal",
            fontWeight: "bold",
            color: "#000",
            padding: "0 240px",
            lineHeight: 1.8,
            justifyContent: "center",
            marginBottom: "60px",
            wordWrap: "break-word",
            textShadow: "6px 6px 0 rgba(0,0,0,0.1)",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [
        {
          name: "panda",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
