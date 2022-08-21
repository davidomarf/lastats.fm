import { Image } from "./User";

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

export type SimplifiedTrack = {
  artist: string;
  name: string;
  date: number;
  album: string;
};

function simplifyTrack(track: Track): SimplifiedTrack {
  return {
    artist: track.artist["#text"],
    name: track.name,
    date: +track.date.uts,
    album: track.album["#text"],
  };
}

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
