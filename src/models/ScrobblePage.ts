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

export class SimplifiedTrack {
  artist: string;
  name: string;
  date: number;
  album: string;

  constructor(track: Track) {
    this.artist = track.artist["#text"];
    this.name = track.name;
    this.date = +track.date.uts;
    this.album = track.album["#text"];
    return this;
  }
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
