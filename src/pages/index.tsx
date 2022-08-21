import classNames from "classnames/bind";
import Upload from "components/upload/Upload";
import UsernameInput from "components/username/Username";
import type { NextPage } from "next";
import Head from "next/head";
import styles from '../styles/Home.module.scss';


const cx = classNames.bind(styles);

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | lastats.fm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={cx('introduction-container')}>
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
            And that may mean that, at least once, you&apos;ve wondered...
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
            If you have, you&apos;ll find lastats.fm interesting.
          </p>

          <h3>
            Wanna try? Let&apos;s start!
          </h3>

          <UsernameInput></UsernameInput>
          <Upload />

        </div>
      </section>

      {/*scrobbleData?.length ? (
        <>
          <Link href="/">
            <a>Clean filters</a>
          </Link>
          <CalendarHeatmap artistToSearch={artist as string} />
        </>
      ) : null*/}

    </>
  );
};

export default IndexPage;
