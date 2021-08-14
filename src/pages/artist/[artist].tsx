import { useAppSelector } from "@hooks";
import { PointTooltip, PointTooltipProps, ResponsiveLine } from "@nivo/line";
import { selectScrobbleData } from "components/upload/uploadSlice";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const scrobbleData = useAppSelector(selectScrobbleData);

  const { artist } = router.query;

  const artistHistoricalData = scrobbleData
    .filter((e) => e.artist === (artist as any))
    .reduce((acc, cur) => {
      const dateTime = DateTime.fromSeconds(Number((cur as any).uts));
      const key = dateTime.toLocaleString();

      return { ...acc, [key]: acc[key] ? [...acc[key], cur] : [cur] };
    }, {} as any);

  const fullDays = Object.entries(artistHistoricalData)
    .map(([day, { length }]: any) => ({ x: new Date(day), y: length }))
    .sort(
      (a, b) =>
        DateTime.fromJSDate(a.x).toMillis() -
        DateTime.fromJSDate(b.x).toMillis()
    );

  const correctedDays = [];
  for (let i = 1; i < fullDays.length; i++) {
    const prevDay = DateTime.fromJSDate(fullDays[i - 1].x);
    const thisDay = DateTime.fromJSDate(fullDays[i].x);

    correctedDays.push(fullDays[i - 1]);

    const diffInDays = thisDay.diff(prevDay, ["days"]).days;

    if (diffInDays === 2) {
      correctedDays.push({ x: prevDay.plus({ days: 1 }).toJSDate(), y: 0 });
    } else if (diffInDays > 2) {
      correctedDays.push({ x: prevDay.plus({ days: 1 }).toJSDate(), y: 0 });
      correctedDays.push({ x: thisDay.minus({ days: 1 }).toJSDate(), y: 0 });
    }
  }

  return (
    <div>
      <Head>
        <title>{router.asPath}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {artist && (
        <div style={{ height: "500px", width: "100vw" }}>
          <h1>{artist}</h1>

          <ResponsiveLine
            data={[
              {
                id: artist as string,
                data: correctedDays,
              },
            ]}
            curve={"step"}
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            animate={true}
            pointSize={0}
            pointBorderWidth={2}
            lineWidth={1}
            enableArea={true}
            areaOpacity={1}
            useMesh={true}
            xScale={{
              type: "time",
              format: "native",
            }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
            }}
            axisBottom={{
              format: "%b %Y",
              legendOffset: 40,
              legendPosition: "middle",
              legend: "Date",
            }}
            axisLeft={{
              tickSize: 1,
              legend: "Scrobbles",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            xFormat={(e) => e.toLocaleString()}
            enableCrosshair={true}
            crosshairType={"cross"}
            tooltip={tooltip}
          ></ResponsiveLine>
        </div>
      )}
    </div>
  );
};

export default IndexPage;

const tooltip: PointTooltip = ({ point }: PointTooltipProps) => {
  console.log(point);

  return (
    <div
      style={{
        background: "white",
        padding: "9px 12px",
        border: "1px solid #ccc",
      }}
    >
      {DateTime.fromJSDate(point.data.x as any).toFormat("yyyy LLL dd")}:{" "}
      {point.data.y} scrobbles
    </div>
  );
};
