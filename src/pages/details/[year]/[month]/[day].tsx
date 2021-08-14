import { useAppSelector } from "@hooks";
import { selectScrobbleByDay } from "components/upload/uploadSlice";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
const IndexPage: NextPage = () => {
  const { year, month, day } = useRouter().query;

  const scrobbleData = useAppSelector(selectScrobbleByDay);

  console.log(scrobbleData);
  console.log(scrobbleData?.[`${year}-${month}-${day}`]);
  const [dayData, setDayData] = useState<{
    value: number;
    artists: {
      artist: string;
      scrobbles: number;
    }[];
  }>({ value: 0, artists: [] });

  useEffect(() => {
    if (!scrobbleData) {
      return;
    }

    const data = scrobbleData[`${year}-${month}-${day}`];
    setDayData({
      ...data,
      artists: Object.entries(data.artists)
        .sort(([]) => 0)
        .map(([artist, scrobbles]) => ({ artist, scrobbles })),
    });
  }, [scrobbleData, setDayData, year, month, day]);

  const sortedArtists = dayData.artists.sort(
    (a, b) => b.scrobbles - a.scrobbles
  );

  const topFive = sortedArtists.slice(0, 5);

  return (
    <div>
      <Head>
        <title>
          {year}-{month}-{day}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        {year}-{month}-{day}
      </h1>
      {dayData && topFive && (
        <div>
          <div>Total Scrobbles: {dayData.value}</div>

          <h2>Your Top 5</h2>
          <ol>
            {sortedArtists.map((artist) => (
              <li key={artist.artist}>
                <Link href={`/artist/${artist.artist}`}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <abbr
                      title={artist.artist}
                      style={{ textDecoration: "none" }}
                    >
                      {artist.artist}
                    </abbr>
                  </span>
                </Link>
                <div
                  style={{
                    display: "inline-block",
                    width: artist.scrobbles * 10 + "px",
                    height: "1rem",
                    background: "red",
                  }}
                ></div>
                <span style={{ marginLeft: "1rem" }}>{artist.scrobbles}</span>
              </li>
            ))}
          </ol>

          {/* <ul>
            {dayData.artists
              .sort((a, b) => b.scrobbles - a.scrobbles)
              .map((artist) => (
                <li>
                  <Link
                    key={artist.artist}
                    href={{ pathname: "/", query: { artist: artist.artist } }}
                    passHref
                  >
                    <a>
                      {artist.artist} ({artist.scrobbles})
                    </a>
                  </Link>
                </li>
              ))}
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default IndexPage;
