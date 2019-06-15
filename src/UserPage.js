import React from "react";

import styles from "./UserPage.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";

import * as d3 from "d3";
const axios = require("axios");

const lastFmAPI = process.env.REACT_APP_LAST_FM_API;
const lastFmCall =
  "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + lastFmAPI;

class Heatmap extends React.Component {
  componentDidMount() {
    const svg = d3
      .select(`#d3-section-${this.props.title}`)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500");
    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "blue");
  }

  render() {
    return (
      <>
        <UserPageSection>
          <div
            id={`d3-section-${this.props.title}`}
            className={styles["graph-container"]}
          />
        </UserPageSection>
      </>
    );
  }
}

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

const getData = async (url, f, arr)=> {
  try {
    const response = await axios.get(url);
    const data = response.data;
    f(data, arr);
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
    let url = `${lastFmCall}&method=user.getrecenttracks&limit=200&user=${this.state.user}&page=`
    let scrobbles = [];
    for (let i = 1; i <= pages; i++) {
      const addToArray = (e, arr) => {
        if (e.recenttracks.track[0]["@attr"].nowplaying){
          e.recenttracks.track.shift();
        }
        console.log(e.recenttracks.track)
      }
      getData(`${url}${i}`, addToArray, scrobbles);
    }
  }

  render() {
    return (
      <ReactFullpage
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section">
                <div className={styles["section-container"]}>
                  <Heatmap title="Heatmap" user={this.state.user} />
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
