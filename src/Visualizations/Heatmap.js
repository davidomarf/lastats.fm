import React from "react";

import styles from "./Heatmap.module.scss";
import * as d3 from "d3";

function getDateArray(start, end) {
  let arr = [];
  let dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
}

class Heatmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dayArray = [];
  }

  draw(svg) {
    let activity = this.props.user.scrobbles.map(e =>
      Math.floor(e.date.uts / 86400)
    );

    let dev_today = new Date();
    let end = dev_today;
    let endUTC = Math.floor(
      Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) / 86400000
    );
    // activity = activity.map(d => endUTC - d);
    let endActivityIndex = undefined;
    for (let i = 0; i < activity.length; i++) {
      if (end >= activity[i]) {
        endActivityIndex = i;
        break;
      }
    }

    let start = new Date(new Date().setFullYear(dev_today.getFullYear() - 1));
    let startUTC = Math.floor(
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) /
        86400000
    );
    let startActivityIndex = activity.length - 1;
    for (let i = endActivityIndex; i < activity.length; i++) {
      if (startUTC > activity[i]) {
        startActivityIndex = i - 1;
        break;
      }
    }

    activity = activity
      .slice(endActivityIndex, startActivityIndex + 1)
      .map(d => d - startUTC)
      .reverse();

    var counts = {};

    for (var i = 0; i < activity.length; i++) {
      var num = activity[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    console.log(counts);
    let dates = getDateArray(start, end);

    let monthShift = 0;
    let weekShift = 0;
    for (let i = 0, j = 0; i < dates.length; i++) {
      let style = styles["day"];
      console.log(i, activity[j]);
      if (counts[i] !== undefined) {
        let color = Math.ceil(5 * (counts[i] / 30))
        style += " " + styles["color-" + color];
      }
      let weekDay = dates[i].getDay();
      let monthDay = dates[i].getDate();
      if (weekDay === 0) {
        weekShift++;
      }
      if (monthDay === 1) {
        monthShift += 5;
      }
      svg
        .append("rect")
        .attr("x", 20 + monthShift + weekShift * 10)
        .attr("y", weekDay * 10)
        .attr("width", 8.5)
        .attr("height", 8.5)
        .attr("class", style);
    }

    for (let i = 0; i < 7; i += 2) {
      svg
        .append("text")
        .attr("x", 20)
        .attr("y", i * 10 - 4.25)
        .attr("class", styles["meta-text"] + " " + styles["day-flag"])
        .text("hola");
    }

    svg
      .append("text")
      .attr("x", 20)
      .attr("y", 90)
      .attr("class", styles["meta-text"])
      .text("Less");

    svg
      .append("text")
      .attr("x", 100)
      .attr("y", 90)
      .attr("class", styles["meta-text"])
      .text("More");
    for (let i = 0; i < 5; i++) {
      svg
        .append("rect")
        .attr("x", 42 + i * 11)
        .attr("y", 81.5)
        .attr("width", 8.5)
        .attr("height", 8.5)
        .attr("class", styles["day"] + " " + styles["color-" + i]);
    }
  }

  componentDidMount() {
    const svg = d3
      .select(`#d3-section-${this.props.title}`)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 600 300");
    this.draw(svg);
  }

  render() {
    return (
      <>
        <div
          id={`d3-section-${this.props.title}`}
          className={styles["graph-container"]}
        />
      </>
    );
  }
}

export default Heatmap;
