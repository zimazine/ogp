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

  // http://localhost:3000/api/mac?title=美味しいパスタお前と大貧民したあとパチンコ屋に行って化粧品もらったから謝りに行こう&postDate=2022-08-09&tag=%F0%9F%90%B6

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
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  margin: "0 3px",
                  cursor: "pointer",
                  background: "#ff5f57",
                  border: "1px solid #e45952",
                }}
              ></div>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  margin: "0 3px",
                  cursor: "pointer",
                  background: "#ffbd2d",
                  border: "1px solid #e1a73e",
                }}
              ></div>
              <div
                style={{
                  width: "16px",
                  height: "16px",
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
              fontSize: "64px",
              color: "#d5d5d5",
              letterSpacing: "0.1rem",
            }}
          >
            <p
              style={{
                width: "1024px",
              }}
            >
              {tag} {title}
            </p>
          </div>
          <div
            style={{
              width: "100%",
              height: "20%",
              display: "flex",
              fontSize: "28px",
              color: "#d5d5d5",
              letterSpacing: "0.1rem",
            }}
          >
            <div
              style={{
                flexBasis: "40%",
                background: "#333",
                marginLeft: "5.5rem",
                display: "flex",
                paddingBottom: "4px",
                alignItems: "center",
                paddingLeft: "1.2rem",
              }}
            >
              {/* <img
                src={`data:image/svg+xml,${encodeURIComponent(x)}`}
                width={28}
                height={26}
                alt="logo"
                style={{ transform: "translateY(4px)" }}
              /> */}
              <img
                src="https://ogp.gdgd.tokyo/gdgd.png"
                width={64}
                height={64}
                alt=""
              />
              {user + twitter}
            </div>
            {/* <div
              style={{
                flexBasis: "60%",
                marginRight: "5.5rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              🗓️ {postDate}
            </div> */}
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
