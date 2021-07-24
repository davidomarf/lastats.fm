import Head from "next/head";
import { useRouter } from "next/router";
import { auth } from "./api/lastfm";

const Post = () => {
  const router = useRouter();
  const { token } = router.query;

  auth(token as string).then(console.log);

  return (
    <>
      <Head>
        <title>{token}</title>
      </Head>

      <pre>{token}</pre>
    </>
  );
};

export default Post;
