import React from "react";

import styles from "./Userpage.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";

import Heatmap from "../Visualizations/Heatmap";
import TimeSeries from "../Visualizations/TimeSeries";

import lastfm from "../API/lastfm";

/**
 * Whole page for the user rendered when route is /user/:user
 */
class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set user to the string after /user/ in the url
      user: props.match.params.user,
      playcount: 0,
      scrobbles: []
    };

    // Get the actual playcount of the user
    this.getPlaycount();
  }

  /**
   * Update the state of the component to contain the complete list of scrobbles
   */
  getScrobbles() {
    // Last.fm getrecenttracks has a limit of 200 items per page.
    // https://www.last.fm/api/show/user.getRecentTracks
    let pages = Math.ceil(this.state.playcount / 200);

    // Function to filter the value of the promise and return only what we'll be using
    const returnRecentTracks = e => {
      // If the user is currently scrobbling, delete that element
      if (e.recenttracks.track[0]["@attr"]) {
        e.recenttracks.track.shift();
      }
      return e.recenttracks.track;
    };

    for (let i = 1; i <= pages; i++) {
      // lastfm.getScrobbles() returns a Promise
      lastfm
        .getScrobbles(this.state.user, i)
        // When resolved, update the state by concatenating the value of the promise
        .then(v => {
          if (v) {
            let list = returnRecentTracks(v);
            this.setState({
              scrobbles: this.state.scrobbles.concat({
                page: i,
                list: list,
                start: Number(list[list.length - 1].date.uts),
                end: Number(list[0].date.uts)
              })
            });
          } else {
            console.log(i);
          }
        });
    }
  }

  /**
   * Update the state of the component to contain the number of scrobbles from the user
   */
  getPlaycount() {
    // lastfm.getUserPlayCount() returns a Promise
    lastfm
      .getUserPlayCount(this.state.user)
      // When resolved, set the state using the value of the promise, and send
      // a callback to get the scrobbles
      .then(v =>
        this.setState({ playcount: Number(v.user.playcount) }, () =>
          this.getScrobbles()
        )
      );
  }

  render() {
    return (
      // Return a Full Page component
      <ReactFullpage
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              {/* Heatmap Graph */}
              <div className="section">
                <div className={styles["section-container"]}>
                  {/* Mount Heatmap only when the scrobbles are set */}
                  {this.state.scrobbles && (
                    <Heatmap title="Heatmap" user={this.state} />
                  )}
                </div>
              </div>

              {/* Time SeriesGraph */}
              <div className="section">
                <div className={styles["section-container"]}>
                  {/* Mount Heatmap only when the scrobbles are set */}
                  {this.state.scrobbles && (
                    <TimeSeries title="Timeseries" user={this.state} />
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
