import React from "react";

import style from "./Home.module.scss"
import UserInput from "../Elements/UserInput"

function Home() {
  return (
    <div className={style.centered}>
      <h1>Last.fm Stats</h1>
      <UserInput />
    </div>
  );
}

export default Home;