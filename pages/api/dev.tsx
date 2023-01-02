import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../assets/tsukushi_sub.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function ogp(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fontData = await font;

  // http://localhost:3000/api/dev?title=title&postDate=20220809&tag=%F0%9F%90%B6

  // 記事タイトル
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 48)
    : "タイトルなし";

  // 投稿日
  const hasPostDate = searchParams.has("postDate");
  let postDate = hasPostDate
    ? searchParams.get("postDate")?.replace(/-/g, "/")
    : "2023-01-01";

  // タグ
  const hasTag = searchParams.has("tag");
  const tag = hasTag ? searchParams.get("tag") : "🥹";

  // ユーザー名、Twitter
  const hasUserName = searchParams.has("userName");
  const userName = hasUserName ? searchParams.get("userName") : "";

  // サイト名
  const site = "Lang:Lang:Lang";
  const url = "dev.gdgd.tokyo";

  return new ImageResponse(
    (
      <div
        style={{
          // backgroundImage: "url(https://ogp.gdgd.tokyo/og-bg-default.png)",
          backgroundImage:
            "linear-gradient(90deg, rgba(105, 234, 203, 1), rgba(215, 98, 252, 1) 67%, rgba(102, 84, 241, 1))",
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
            padding: "64px",
            display: "flex",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            width: "85%",
            height: "75%",
            margin: "0 auto",
            borderRadius: "24px",
            flexWrap: "wrap",
            boxShadow: "0 10px 25px 0 rgba(60, 60, 80, 0.2)",
          }}
        >
          <div
            style={{
              width: "100%",
              fontSize: 56,
              fontStyle: "normal",
              fontWeight: "bold",
              color: "#111",
              // padding: "0 60px",
              lineHeight: 1.6,
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: "30px",
              wordWrap: "break-word",
              height: "85%",
              textShadow: "6px 6px 0 rgba(0,0,0,0.1)",
            }}
          >
            {tag + " " + title}
          </div>
          <div
            style={{
              flexBasis: "30%",
              fontSize: 24,
              justifyContent: "flex-start",
              letterSpacing: "1px",
            }}
          >
            {"🗓️ " + postDate}
          </div>
          <div
            style={{
              flexBasis: "70%",
              fontSize: 24,
              justifyContent: "flex-end",
            }}
          >
            {site + " | " + url}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [
        {
          name: "tsukushi_sub",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
