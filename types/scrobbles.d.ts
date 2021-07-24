import { Image } from "./user";

export type Track = {
  "@attr"?: { nowplaying: boolean };
  artist: Artist;
  album: Album;
  image: Image[];
  streamable: number;
  date: { uts: number; "#text": string };
  url: string;
  name: string;
  mbid: string;
};

export type Artist = {
  mbid: string;
  "#text": string;
};

export type Album = {
  mbid: string;
  "#text": string;
};

export type RecentTracks = {
  recenttracks: {
    "@attr": {
      page: number;
      total: number;
      user: string;
      perPage: number;
      totalPages: number;
    };

    track: Track[];
  };
};
