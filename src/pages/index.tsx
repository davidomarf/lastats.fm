import { useAppSelector } from "@hooks";
import classNames from "classnames/bind";
import CalendarHeatmap from "components/calendar/Calendar";
import Upload from "components/upload/Upload";
import { selectScrobbleData } from "components/upload/uploadSlice";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const cx = classNames.bind(styles);

const IndexPage: NextPage = () => {
  const router = useRouter();

  const scrobbleData = useAppSelector(selectScrobbleData);

  const { artist } = router.query;

  return (
    <>
      <Head>
        <title>Stats.fm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={cx("content", "content--centered")}>
        {!scrobbleData?.length ? <Upload /> : null}
        {scrobbleData?.length ? (
          <>
            <Link href="/">
              <a>Clean filters</a>
            </Link>
            <CalendarHeatmap artistToSearch={artist as string} />
          </>
        ) : null}
      </section>
    </>
  );
};

export default IndexPage;
