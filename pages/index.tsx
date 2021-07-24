import { ResponsiveCalendar } from "@nivo/calendar";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stats.fm</title>
        <meta
          name="description"
          content="Discover and explore your scrobbling patterns"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ResponsiveCalendar
          data={data()}
          from="2016-03-01"
          to="2020-07-12"
          colors={[
            "#FFF7EC",
            "#FEE8C8",
            "#FDD49E",
            "#FDBB84",
            "#FC8D59",
            "#EF6548",
            "#D7301F",
            "#B30000",
            "#7F0000",
          ]}
          emptyColor="#eeeeee"
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          monthSpacing={10}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </main>
    </div>
  );
}

function data() {
  const ayayay = new Array(1000).fill(0).map(() => ({
    day: `${Math.floor(2016 + Math.random() * 5)}-${getMonth()}-${Math.floor(
      Math.random() * 30
    )}`,
    value: Math.floor(Math.random() * 500),
  }));
  return ayayay;
}

function getMonth() {
  const month = Math.floor(Math.random() * 13);
  return month >= 10 ? month.toString() : "0" + month;
}
