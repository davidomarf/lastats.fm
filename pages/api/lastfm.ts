import { RecentTracks, Track, User } from "../../types";

const lastFmAPI = "77415c2f30b51c970586d08f10c9f885";
const lastFmCall =
  "https://ws.audioscrobbler.com/2.0/?format=json&api_key=" + lastFmAPI;

async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
}

/**
 * Returns the information of a Last.fm user
 *
 * @param  user Last.fm user
 * @returns Response to the method https://www.last.fm/api/show/user.getInfo
 */
export async function getUserInfo(user: string): Promise<User> {
  return (
    (await getData<User>(
      lastFmCall + "&method=user.getinfo&user=" + user
    )) as any
  ).user;
}

/**
 * Returns the specified page from the user's scrobble list. Each page has 200 entries.
 * @param {string} user
 * @param {number} page Page of the
 * @returns {Promise} Response to the method https://www.last.fm/api/show/user.getRecentTracks
 */
export async function getScrobbles(
  user: string,
  page: number,
  limit: number = 200
): Promise<Track[]> {
  return (
    (await getData<RecentTracks>(
      `${lastFmCall}&method=user.getrecenttracks&limit=${limit}&user=${user}&page=${page}`
    )) as RecentTracks
  ).recenttracks.track;
}

export async function auth(token: string) {
  return fetch(
    `${lastFmCall}&method=auth.getSession&token=${token}&api_sig=d41f097aa26dd0f0308c1d1668c20a13`
  );
}
