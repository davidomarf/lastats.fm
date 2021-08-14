import { LogEntry } from "models/Calendar";

export function separateInDays(
  byDayContainer: LogEntry,
  day: string,
  artist: string
) {
  if (byDayContainer.hasOwnProperty(day)) {
    byDayContainer[day].value++;
    byDayContainer[day].artists.hasOwnProperty(artist)
      ? byDayContainer[day].artists[artist]++
      : (byDayContainer[day].artists[artist] = 1);
  } else {
    byDayContainer[day] = { value: 1, artists: { [artist]: 1 } };
  }
}

export function separateInWeeks(
  byWeekContainer: { [key: number]: LogEntry },
  year: number,
  week: number,
  artist: string
) {
  if (byWeekContainer.hasOwnProperty(year)) {
    if (byWeekContainer[year].hasOwnProperty(week)) {
      byWeekContainer[year][week].value++;
      byWeekContainer[year][week].artists.hasOwnProperty(artist)
        ? byWeekContainer[year][week].artists[artist]++
        : (byWeekContainer[year][week].artists[artist] = 1);
    } else {
      byWeekContainer[year][week] = { value: 1, artists: { [artist]: 1 } };
    }
  } else {
    byWeekContainer[year] = { [week]: { value: 1, artists: { [artist]: 1 } } };
  }
}
