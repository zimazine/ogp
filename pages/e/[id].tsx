// This SSG page generates the token to prevent generating OG images with random parameters (`id`).
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { createHmac } from "node:crypto";

interface IParams extends ParsedUrlQuery {
  id: string;
}

type PageProps = {
  id: string;
  token: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const hmac = createHmac("sha256", "my_secret");
  hmac.update(JSON.stringify({ id: id }));
  const token = hmac.digest("hex");

  return {
    props: {
      id: id,
      token,
    },
  };
};

export function getStaticPaths() {
  return {
    paths: [
      { params: { id: "a" } },
      { params: { id: "b" } },
      { params: { id: "c" } },
    ],
    fallback: false,
  };
}

export default function Page({ id, token }: PageProps) {
  return (
    <div>
      <h1>Encrypted Open Graph Image.</h1>
      <p>Only /a, /b, /c with correct tokens are accessible:</p>
      <a
        href={`/api/e?id=${id}&token=${token}`}
        target="_blank"
        rel="noreferrer"
      >
        <code>
          /api/e?id={id}&token={token}
        </code>
      </a>
    </div>
  );
}
