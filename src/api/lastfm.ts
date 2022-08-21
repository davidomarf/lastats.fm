import { default as axiosOriginal } from "axios";
import rateLimit from "axios-rate-limit";
import { RecentTracks, Track } from "models/ScrobblePage";
import { User } from "models/User";

const axios = rateLimit(axiosOriginal.create(), {
  maxRPS: 10,
});

const lastFmAPI =
  process.env.REACT_APP_LAST_FM_API || "ab50ffdf56122232fa11a39059f77a42";
const lastFmCall =
  "https://ws.audioscrobbler.com/2.0/?format=json&api_key=" + lastFmAPI;

async function getData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
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
