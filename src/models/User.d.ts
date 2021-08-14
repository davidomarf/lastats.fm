export type User = {
  playcount: number;
  playlists: number;
  gender: string;
  name: string;
  subscriber: number;
  url: string;
  country: string;
  image: Image[];
  registered: { unixtime: number; "#text": number };
  type: string;
  age: number;
  bootstrap: number;
  realname: string;
};

export type Image = {
  size: ImageSize;
  "#text": string;
};

export enum ImageSize {
  small = "small",
  medium = "medium",
  large = "large",
  extralarge = "extralarge",
}
