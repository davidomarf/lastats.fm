import classNames from "classnames/bind";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import styles from '../styles/Home.module.scss';


const cx = classNames.bind(styles);

const IndexPage: NextPage = () => {
  // const router = useRouter();

  // const scrobbleData = useAppSelector(selectScrobbleData);

  // const { artist } = router.query;

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const uploadFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head>
        <title>lastats.fm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section style={{ "maxWidth": "90%" }}>
        <div className="color-white50">

          <h1 className="color-white75">lastats.fm</h1>
          <h2>
            Beautiful data visualizations to explore <br /> your <span className="color-red600"> music listening patterns</span>
          </h2>
          <br />
          <p></p>
          <h3>
            If you have a last.fm account, that probably means you love music.
          </h3>
          <h3>
            And that may mean that, at least once, you`&apos;`ve wondered...
          </h3>
          <ul>
            <li>
              what was the last time you became so obsessed with a song, that you played it for a whole week,
            </li>
            <li>
              when did you start listening to your now favorite artist,
            </li>
            <li>
              what decades, artist, and songs have marked each of your life stages,
            </li>
            <li>
              how many of the artist you listen to are bands or solo artists,
            </li>
            <li>
              where do all the artists you listen to come from,
            </li>
            <li>
              or why do you have to wait for a whole year for your Spotify Wrapped.
            </li>
          </ul>

          <p>
            I have. So I decided to build this website.
          </p>

          <h3>
            Wanna try? Let`&apos;`s start!
          </h3>

          <div className={cx("start-action-container")} onClick={() => usernameInputRef.current?.focus()}>
            <div className={cx('start-action__title')}>
              Enter your username,
            </div>
            <div className={cx('start-action__description')}>
              and the website will start to update every few seconds with
              all the new data it gets from your scrobbling history
            </div>
            <label htmlFor="username" style={{ "display": "none" }}>Username</label>
            <input ref={usernameInputRef} type="text" name="username" id="input-username" placeholder="Username" />
          </div>

          <div className={cx("start-action-container")} onClick={() => uploadFileRef.current?.click()}>
            <div className={cx('start-action__title')}>
              Upload an existing laststs.fm CSV,
            </div>
            <div className={cx('start-action__description')}>
              and it`&apos;`ll immediately load all the saved data, while updating the
              uploaded file with your last scrobbles
            </div>
            <p>
            </p>
            <input ref={uploadFileRef} type="file" name="lastats-file" id="input-file" accept=".csv, text/csv" />
          </div>

        </div>
      </section>

      {/* This is the content that handles upload/viz */}
      {/* <section className={cx("content", "content--centered")}>
        {!scrobbleData?.length ? <Upload /> : null}
        {scrobbleData?.length ? (
          <>
            <Link href="/">
              <a>Clean filters</a>
            </Link>
            <CalendarHeatmap artistToSearch={artist as string} />
          </>
        ) : null}
      </section> */}
    </>
  );
};

export default IndexPage;
