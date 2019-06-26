import React from "react";

import styles from "./Userpage.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";

import Heatmap from "../Visualizations/Heatmap";

// Include it to manage API requests without exceeding API call limit
const axios = require("axios");

// API base call. Append an API method. Know them at https://www.last.fm/api/intro
const lastFmCall =
  "https://ws.audioscrobbler.com/2.0/?format=json&api_key=" +
  process.env.REACT_APP_LAST_FM_API;

// TODO: Move this to ../API/lastfm.js
/**
 * Fetch the data from one URL and apply (if provided) a function
 * to the data before returning it.
 *
 * @param {string} url URL to make the request
 * @param {function} [f] function to apply to the data before returning
 */
const getData = async (url, f) => {
  try {
    const response = await axios.get(url);
    let data = response.data;
    if (f !== undefined) data = f(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Whole page for the user rendered when route is /user/:user
 */
class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set user to the string after /user/ in the url
      user: props.match.params.user
    };

    // Get the playcount of the user
    fetch(lastFmCall + "&method=user.getinfo&user=" + this.state.user)
      .then(res => res.json())
      .then(data => {
        this.setState({
          playCount: data.user.playcount
        });
        // After setting the playCount for the user, get all the scrobblss
        this.setScrobbles();
      })
      .catch(console.log);
  }

  /**
   *  Get all the scrobbles from the user
   */
  setScrobbles() {
    // Calculate the number of pages to fetch using playCount.
    // Last.fm getrecenttracks has a maximum limit of 200.
    // https://www.last.fm/api/show/user.getRecentTracks
    let pages = Math.ceil(this.state.playCount / 200);
    let url = `${lastFmCall}&method=user.getrecenttracks&limit=200&user=${
      this.state.user
    }&page=`;

    // Save all the promises from fetching the urls asynchronously
    let scrobblesPromises = [];
    // Array to contain the resolved promises
    let scrobbles = [];

    for (let i = 1; i <= pages; i++) {
      // Function to send to getData.
      // If the user is currently scrobbling, delete that element
      const returnRecentTracks = e => {
        // When a track is playing now, it has an .@attr property
        if (e.recenttracks.track[0]["@attr"]) {
          e.recenttracks.track.shift();
        }
        return e.recenttracks.track;
      };
      scrobblesPromises.push(getData(`${url}${i}`, returnRecentTracks));
    }

    // When all the promises are resolved, add the values from each call
    // to the scrobbles array.
    Promise.all(scrobblesPromises).then(values => {
      scrobbles = scrobbles.concat(...values);
      this.setState({
        scrobbles: scrobbles
      });
    });
  }

  render() {
    return (
      // Return a Full Page component
      <ReactFullpage
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section">
                <div className={styles["section-container"]}>
                  {/* Mount Heatmap only when the scrobbles are set */}
                  {this.state.scrobbles && (
                    <Heatmap title="Heatmap" user={this.state} />
                  )}
                </div>
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default UserPage;
