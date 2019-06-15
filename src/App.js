import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import style from "./App.module.scss";

import UserPage from "./UserPage";
import UserInput from "./UserInput";
import NoMatch from "./404";

const lastFmAPI = process.env.REACT_APP_LAST_FM_API;
const lastFmCall =
  "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + lastFmAPI;

function Child(props) {
  return (
    <div>
      <h3>user: {props.match.params.user}</h3>
      <p>{lastFmAPI}</p>
    </div>
  );
}

function RecentTracks(props) {
  return (
    <>
      Recent tracks:
      <ul>
        {props.tracks &&
          props.tracks.map(e => (
            <li key={e.date && e.date.uts}>
              {e.artist["#text"]}, {e.name} | {e.date && e.date.uts}
            </li>
          ))}
      </ul>
    </>
  );
}

class UserStats extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.match.params.user;
    this.state = {
      user: props.match.params.user,
      playCount: ""
    };
  }

  componentDidMount() {
    fetch(lastFmCall + "&method=user.getinfo&user=" + this.user)
      .then(res => res.json())
      .then(data => {
        this.setState({
          playCount: data.user.playcount
        });
      })
      .catch(console.log);

    fetch(lastFmCall + "&method=user.getrecenttracks&user=" + this.user)
      .then(res => res.json())
      .then(data => {
        this.setState({
          recentTracks: data.recenttracks.track
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <h3>user: {this.user}</h3>
        <p>playCount: {this.state.playCount}</p>
        <RecentTracks tracks={this.state.recentTracks} />
      </div>
    );
  }
}

function MainPage() {
  return (
    <div className={style.centered}>
      <h1>Last.fm Stats</h1>
      <UserInput />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/user/:user" component={UserPage} />
        <Route path="/info" component={Child} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
