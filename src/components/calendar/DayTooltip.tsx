import { CalendarTooltipProps } from "@nivo/calendar";
import classNames from "classnames/bind";
import { DateTime } from "luxon";
import { TooltipData } from "models/Calendar";
import styles from "./DayTooltip.module.scss";

const cx = classNames.bind(styles);

export const CalendarTooltip = ({
  day,
  value,
  data,
}: CalendarTooltipProps & { data: TooltipData }) => {
  const date = DateTime.fromISO(day);

  return (
    <div className={cx("heatmapTooltip")}>
      <div className={cx("header")}>
        <span className={cx("date")}>
          {date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </span>
        <span className={cx("scrobbles")}>{value} scrobbles</span>
      </div>

      <div className={cx("highlights")}>
        <span className={cx("title")}>Day Highlights</span>
        <ul>
          {data.favoriteArtists.map(({ artist, scrobbles }) => (
            <li key={artist}>
              {artist} ·{" "}
              <span className={cx("scrobble-count")}>
                {scrobbles} scrobbles
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Week artist: </strong>
        {data.week.artist} ({data.week.scrobbles} of {data.week.total}{" "}
        scrobbles)
      </div>
    </div>
  );
};
