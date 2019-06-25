<h1 align="center">Last.fm Stats</h1>

<div align="center">
  <strong>Visualize all your Last.fm activity in a beautiful and interactive way.</strong>
  <br/>
  <a href="https://lastfmstats.herokuapp.com/">
  <i>Try Yours </i>
  </a>
</div>

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [License](#license)

## Features

**bold features** are implemented, `em features` are a work in progress,
_italic features_ are planned, but not yet in development.

### Data Visualization

- **yearly heatmap:** that shows the most and least active days, over a yearly period.
  Measured by the number of scrobbles.
  It defaults to the period of _[1 year ago, today]_.

- `yearly time series:` that shows the number of scrobbles per week, over a yearly period.
  For every week, it shows the song, artist, and album most listened to.
  It defaults to the period of _[1 year ago, today]_.

- _yearly artist time series:_ that shows the number of scrobbles from a single artist
  per week, over a yearly period.
  For every week, it shows the most listened to song.
  _Allow to switch the measurement method between scrobbles and listening time._

- _overall decades histogram:_ that shows the number of `[scrobbles, unique tracks]` for
  songs **originally** released by decade.

- _language distribution (pie?):_ that shows the languages proportion for the `[scrobbles, unique tracks]`
  in the library.

- _explicit vs. non-explicit:_ that shows the percentage of `[scrobbles, unique tracks]` with
  explicit content.

### Playlist creation

- _The `n` most listened to `[songs, artists, albums]` for every `[day, week, month, year]`,
  over `[week, month, year, overal, custom]`._

## Installation

```sh
$ npm install choo
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
