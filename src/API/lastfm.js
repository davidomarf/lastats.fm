const axios = require("axios");

const lastFmAPI = process.env.REACT_APP_LAST_FM_API;
const lastFmCall =
  "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + lastFmAPI;

async function getData(url, f) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    let value;
    f === undefined ? (value = data) : (value = f(data));
    return value;
  } catch (error) {
    console.log(error);
  }
}

async function getUserInfo(user) {
  
}

function getScrobbles(user) {
  let pages = Math.ceil(user.playCount / 200);
  let url = `${lastFmCall}&method=user.getrecenttracks&limit=200&user=${
    this.state.user
  }&page=`;
  let scrobblesPromises = [];
  let scrobbles = [];
  for (let i = 1; i <= pages; i++) {
    const returnRecentTracks = e => {
      if (e.recenttracks.track[0]["@attr"]) {
        e.recenttracks.track.shift();
      }
      return e.recenttracks.track;
    };
    scrobblesPromises.push(getData(`${url}${i}`, returnRecentTracks));
  }
  Promise.all(scrobblesPromises).then(values => {
    scrobbles = scrobbles.concat(...values);
    this.setState({
      scrobbles: scrobbles
    });
  });
}

export default getData;
