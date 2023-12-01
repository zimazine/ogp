import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const x =
  '<svg width="300" height="271" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/></svg>';

const font = fetch(
  new URL("../../assets/notojp_sub.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function ogp(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fontData = await font;

  // http://localhost:3000/api/waku?title=美味しいパスタお前と大貧民したあとパチンコ屋に行って化粧品もらったから謝りに行こう&postDate=2022-08-09&tag=%F0%9F%90%B6

  // タイトル
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 48)
    : "メッセージなし";

  // 投稿日
  const hasPostDate = searchParams.has("postDate");
  let postDate = hasPostDate
    ? searchParams.get("postDate")?.replace(/-/g, "/")
    : "";

  // サイト名
  const site = "ぐだノート";
  const url = "note.gdgd.tokyo";

  // ユーザー
  const user = "ぐだぐだマン";
  const twitter = "@gdgd_devs";

  // アイコン
  const hasTag = searchParams.has("tag");
  let tag = hasTag ? searchParams.get("tag")?.replace(/-/g, "/") : "🗒️";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <div
          style={{
            width: "1200px",
            height: "630px",
            backgroundColor: "#52ACFF",
            backgroundImage:
              "linear-gradient(225deg, #52ACFF 34%, #FFE32C 100%)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "1140px",
              height: "567px",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "960px",
                height: "80%",
                fontSize: "64px",
                color: "#222",
                textShadow: "2px 2px 3px #d5d5d5",
                alignItems: "center",
                display: "flex",
              }}
            >
              <p style={{ width: "100%" }}>🐶 {title}</p>
            </div>
            <div
              style={{
                width: "960px",
                height: "20%",
                fontSize: "32px",
                color: "#333",
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex",
                textAlign: "right",
              }}
            >
              <p
                style={{
                  width: "480px",
                  background: "#fff",
                  paddingBottom: "6px",
                  paddingLeft: ".5rem",
                  borderBottom: "2px solid #333",
                }}
              >
                {site + " | " + url}
              </p>
            </div>
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
