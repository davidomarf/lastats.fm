import React from "react";

import styles from "./Userpage.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";

import * as d3 from "d3";

import Heatmap from "../Visualizations/Heatmap"

const axios = require("axios");

const lastFmAPI = process.env.REACT_APP_LAST_FM_API;
const lastFmCall =
  "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + lastFmAPI;

class UserPageSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className={styles["section-container"]}>{this.props.children}</div>
      </>
    );
  }
}

const getData = async (url, f) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return f(data);
  } catch (error) {
    console.log(error);
  }
};

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.match.params.user
    };

    fetch(lastFmCall + "&method=user.getinfo&user=" + this.state.user)
      .then(res => res.json())
      .then(data => {
        this.setState({
          playCount: data.user.playcount
        });
        this.setScrobbles();
      })
      .catch(console.log);
  }

  setScrobbles() {
    let pages = Math.ceil(this.state.playCount / 200);
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
      })
    });
  }

  render() {
    return (
      <ReactFullpage
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section">
                <div className={styles["section-container"]}>
                  {this.state.scrobbles && <Heatmap title="Heatmap" user={this.state} />}
                </div>
              </div>
              <div className="section">
                <UserPageSection title="dos" user={this.state.user} />
              </div>
              <div className="section">
                <UserPageSection title="tres" user={this.state.user} />
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default UserPage;
