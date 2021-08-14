import { useAppSelector } from "@hooks";
import { selectScrobbleData } from "components/upload/uploadSlice";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const scrobbleData = useAppSelector(selectScrobbleData);

  return (
    <div>
      <Head>
        <title>{router.asPath}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <pre>{JSON.stringify(router, null, 2)}</pre>
    </div>
  );
};

export default IndexPage;
