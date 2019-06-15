import React from "react";

import styles from "./Heatmap.module.scss";
import * as d3 from "d3";

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
          <h1>{this.props.title || "Titulazo"}</h1>
          <p>{this.props.user || "username"}</p>
          <div
            id={`d3-section-${this.props.title}`}
            className={styles["graph-container"]}
          />
      </>
    );
  }
}

export default Heatmap;
