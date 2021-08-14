export type LogEntry = Record<
  string,
  {
    value: number;
    artists: {
      [key: string]: number;
    };
  }
>;

type ArtistLog = {
  artist: string;
  scrobbles: number;
};

export type TooltipData = {
  day: string;
  value: number;
  favoriteArtists: ArtistLog[];
  week: ArtistLog & { total: number };
};
