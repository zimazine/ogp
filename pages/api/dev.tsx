import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../assets/notojp_sub.otf", import.meta.url)
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

  // カテゴリー
  const hasCat = searchParams.has("cat");
  const cat = hasCat ? searchParams.get("cat") : "🥹";

  // ユーザー名、Twitter
  const hasUserName = searchParams.has("userName");
  const userName = hasUserName ? searchParams.get("userName") : "";

  // サイト名(固定)
  const site = "Lang:Lang:Lang";
  const url = "dev.gdgd.tokyo";

  return new ImageResponse(
    (
      <div
        style={{
          // backgroundImage: "url(https://ogp.gdgd.tokyo/og-bg-default.png)",
          backgroundImage:
            "linear-gradient(298deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
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
              fontSize: 52,
              fontStyle: "normal",
              fontWeight: "bold",
              color: "#111",
              // padding: "0 60px",
              lineHeight: 1.4,
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: "30px",
              wordWrap: "break-word",
              height: "85%",
              // textShadow: "6px 6px 0 rgba(0,0,0,0.1)",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 20,
              justifyContent: "flex-start",
              background: "rgba(255,255,255,0.4)",
              padding: "4px 8px",
              marginRight: "12px",
              height: "36px",
              lineHeight: "18px",
              borderRadius: "4px",
            }}
          >
            {cat}
          </div>
          <div
            style={{
              fontSize: 20,
              justifyContent: "flex-start",
              background: "rgba(255,255,255,0.4)",
              padding: "4px 8px",
              marginRight: "12px",
              height: "36px",
              lineHeight: "18px",
              letterSpacing: "2px",
              borderRadius: "4px",
            }}
          >
            {postDate}
          </div>
          <div
            style={{
              fontSize: 20,
              flexBasis: "60%",
              justifyContent: "flex-end",
              padding: "4px 8px",
              height: "36px",
              lineHeight: "18px",
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
          name: "notojp_sub",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
