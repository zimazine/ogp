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
    : "dev.gdgd.tokyo";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: "url(https://ogp.gdgd.tokyo/og-bg-default.png)",
          backgroundColor: "#fff",
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
            color: "#fff",
            padding: "0 120px",
            lineHeight: 1.8,
            justifyContent: "center",
            marginBottom: "30px",
            wordWrap: "break-word",
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
