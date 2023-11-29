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

  // http://localhost:3000/api/note?title=タイトル&postDate=20220809&tag=%F0%9F%90%B6

  // メッセージ
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
  const site = "gdgd note";
  const url = "note.gdgd.tokyo";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <div
          style={{
            width: "1200px",
            height: "630px",
            background: "#1e1e1e",
            border: "1px solid #696969",
            borderRadius: "5px",
            boxShadow: "0 0 20px 5px #4a4a4a",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "40px",
              background: "#363636",
              color: "#d5d5d5",
              borderBottom: "1px solid #000000",
              borderRadius: "5px 5px 0 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                margin: "0 5px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: "0 3px",
                  cursor: "pointer",
                  background: "#ff5f57",
                  border: "1px solid #e45952",
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: "0 3px",
                  cursor: "pointer",
                  background: "#ffbd2d",
                  border: "1px solid #e1a73e",
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: "0 3px",
                  cursor: "pointer",
                  background: "#27c93f",
                  border: "1px solid #2bac2d",
                }}
              ></div>
            </div>
            <p
              style={{
                width: "100%",
                marginLeft: "0px",
                fontSize: "16px",
                textAlign: "center",
                cursor: "default",
                lineHeight: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {site} | {url}
            </p>
          </div>
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "54px",
              color: "#d5d5d5",
              letterSpacing: "0.1rem",
            }}
          >
            <p
              style={{
                width: "1024px",
              }}
            >
              {title}
            </p>
          </div>
          <div
            style={{
              width: "1080px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontSize: "28px",
              color: "#d5d5d5",
              letterSpacing: "0.1rem",
            }}
          >
            <p style={{}}>🗓️ {postDate}</p>
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
