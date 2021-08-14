import { useAppDispatch, useAppSelector } from "@hooks";
import { CalendarDayData, ResponsiveCalendar } from "@nivo/calendar";
import { separateInDays, separateInWeeks } from "app/utils";
import { CalendarTooltip } from "components/calendar/DayTooltip";
import { selectScrobbleData, setByDay } from "components/upload/uploadSlice";
import { interpolateBlues } from "d3-scale-chromatic";
import { DateTime } from "luxon";
import { LogEntry, TooltipData } from "models/Calendar";
import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import styles from "./Calendar.module.scss";

/* --------------------------------- Palette -------------------------------- */

const n_c = 10;
const colors = Array(n_c)
  .fill(0)
  .map((_, i) => interpolateBlues((i + 1) / n_c));

export type CalendarHeatmapProps = {
  artistToSearch?: string;
};

export default function CalendarHeatmap({
  artistToSearch,
}: CalendarHeatmapProps) {
  const router = useRouter();

  const scrobbleData = useAppSelector(selectScrobbleData) as unknown as {
    uts: number;
    artist: string;
  }[];

  const byDayContainer: LogEntry = {};
  const byWeekContainer: { [key: number]: LogEntry } = {};

  scrobbleData.forEach(({ uts, artist }) => {
    if (!uts) {
      return;
    }

    if (artistToSearch && artist !== artistToSearch) {
      return;
    }

    let day: string;
    try {
      const date = new Date(Math.floor(uts / 86400) * 86400000);
      day = date.toISOString().substr(0, 10);

      const dateTime = DateTime.fromISO(day);

      const { weekNumber, monthLong, year } = dateTime;

      separateInDays(byDayContainer, day, artist);

      separateInWeeks(byWeekContainer, year, weekNumber, artist);
    } catch (e) {}
  });

  const dispatch = useAppDispatch();

  if (!artistToSearch) {
    dispatch(setByDay(byDayContainer));
  }

  const favoriteByWeek = Object.entries(byWeekContainer).reduce(
    (acc, [year, weeks]) => {
      return {
        ...acc,
        [year]: Object.entries(weeks).reduce(
          (acc, [week, { value: total, artists }]) => {
            const [artist, scrobbles] = Object.entries(artists).sort(
              ([, a], [, b]) => b - a
            )[0];
            return {
              ...acc,
              [week]: { artist, scrobbles, total },
            };
          },
          {}
        ),
      };
    },
    {}
  );

  const data: TooltipData[] = Object.entries(byDayContainer).map(
    ([day, { value, artists }]) => {
      const sortedArtists = Object.entries(artists).sort(
        ([, scrobblesA], [, scrobblesB]) => scrobblesB - scrobblesA
      );

      const favoriteArtists = sortedArtists
        .slice(0, 3)
        .map(([artist, scrobbles]) => ({ artist, scrobbles }));

      const dateTime = DateTime.fromISO(day);

      const { weekNumber, year } = dateTime;

      return {
        day,
        value,
        favoriteArtists,
        week: (
          (favoriteByWeek as unknown as any)[year as any] as unknown as any
        )[weekNumber],
      } as TooltipData;
    }
  );

  const openDayDetails = useCallback(
    ({ day }: CalendarDayData) => {
      const dayRoute = day.replace(/-/gi, "/");
      router.push("details/" + dayRoute);
    },
    [router]
  );

  return (
    <div className={styles.main}>
      <ResponsiveCalendar
        data={data}
        from="2019"
        to="2022"
        colors={colors}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#fff"
        //@ts-ignore
        tooltip={CalendarTooltip}
        monthBorderWidth={0}
        dayBorderColor="rgba(0,0,0,0)"
        emptyColor="#f8f8f8"
        daySpacing={2}
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
        onClick={openDayDetails}
      />
    </div>
  );
}
