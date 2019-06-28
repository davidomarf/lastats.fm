import React from "react";

import styles from "./Heatmap.module.scss";
import * as d3 from "d3";

var tooltip;
var tooltip_text;

function formatDate(date) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  tooltip.style("opacity", 0.9);
  tooltip_text.style("opacity", 1);
};

var mousemove = function(d) {
  let day = d3.select(this);
  tooltip_text
    .style("fill", "white")
    .text(`${day.attr("scrobbles")} scrobbles on ${day.attr("date")}`)
    .attr("class", styles["meta-text"])
    .attr("x", d3.mouse(this)[0] + ((d3.mouse(this)[0] > 491) ? - (tooltip_text.node().getBBox().width  + 15): 15))
    .attr("y", d3.mouse(this)[1]);
    tooltip
    .attr("width", tooltip_text.node().getBBox().width + 10)
    .attr("height", 15)
    .attr("x", d3.mouse(this)[0] + ((d3.mouse(this)[0] > 491) ? - (tooltip_text.node().getBBox().width  + 20): 10))
    .attr("y", d3.mouse(this)[1] - 10);
};

var mouseleave = function(d) {
  tooltip.style("opacity", 0);
  tooltip_text.text("");
};

// Using it to render the months name without calling
// Date.toLocaleDateString() if only the month is needed
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

/**
 * Generate an array of dates containing every day between
 * start and end.
 *
 * If start is a later date than end, it will generate the dates
 * backwards.
 * @param {Date} start  First value of the array
 * @param {Date} end    Last value of the array
 * @return {Date[]}     All the days between start and end
 */
function getDateArray(start, end) {
  let step = 1;
  if (start > end) step = -1;
  let arr = [];
  let dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + step);
  }

  return arr;
}

function getIDFromDay(day) {
  return `hm-${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
}

/**
 * Function to interpolate colors using a given
 * d3 color palette.
 *
 * The domain is the range of the expected values to be
 * received in the interpolator.
 */
const myColor = d3
  .scaleSequential()
  .interpolator(d3.interpolateYlOrRd)
  .domain([0, 8]);
class Heatmap extends React.Component {
  constructor(props) {
    super(props);
    this.frequencyList = {};
    this.state = {};
    this.dayArray = [];
    this.maxValue = 0;
    this.numberOfCategories = 8;
    this.endDate = { date: new Date() };
    this.endDate.utc = Math.ceil(this.endDate.date.getTime() / 1000);
    this.startDate = {
      date: new Date(
        new Date().setFullYear(this.endDate.date.getFullYear() - 1)
      )
    };
    this.startDate.utc = Math.floor(this.startDate.date.getTime() / 1000);
  }

  /**
   * Write "Mon", "Wed", and "Fri" at the leftmost part of
   * the visualization for the corresponding rows
   * @param {Object} svg  SVG element where the graph is drawn
   */
  drawWeekDays(svg) {
    let days = ["Mon", "Wed", "Fri"];
    for (let i = 0; i < days.length; i++)
      svg
        .append("text")
        .attr("x", 10)
        .attr("y", (i + 1) * 20 - 4.25)
        .attr("class", styles["meta-text"] + " " + styles["day-flag"])
        .text(days[i]);
  }

  /**
   * Draw the legend of the graph that indicates the value range
   * for each color available in the heatmap
   *
   * @param {Object} svg  SVG element where the graph is drawn
   */
  drawLegend(svg) {
    let text = [
      [20, 90, "Less"],
      [45 + (this.numberOfCategories + 1) * 10, 90, "More"]
    ];

    svg
      .selectAll("text")
      .data(text)
      .enter()
      .append("text")
      .attr("x", d => d[0])
      .attr("y", d => d[1])
      .attr("class", styles["meta-text"])
      .text(d => d[2]);

    for (let i = 0; i <= this.numberOfCategories; i++) {
      svg
        .append("rect")
        .attr("x", 42 + i * 10)
        .attr("y", 82)
        .attr("width", 10)
        .attr("height", 10)
        .attr("style", "fill:" + myColor(i));
    }
  }

  draw() {
    let freqArray = d3.entries(this.frequencyList);
    this.maxValue = d3.max(freqArray, d => d.value);
    for (let i = 0; i < freqArray.length; i++) {
      let color = myColor(
        Math.ceil(
          this.numberOfCategories * (freqArray[i].value / this.maxValue)
        )
      );
      d3.select("#" + freqArray[i].key)
        .style("fill", color)
        .attr("scrobbles", freqArray[i].value);
    }
  }

  drawYearBase(svg) {
    let dates = getDateArray(this.startDate.date, this.endDate.date);
    let monthShift = 0;
    let weekShift = 0;
    let drawMonthNextSunday = false;
    for (let i = 0; i < dates.length; i++) {
      let style = styles["day"];
      let weekDay = dates[i].getDay();
      let monthDay = dates[i].getDate();
      if (monthDay === 1) {
        drawMonthNextSunday = true;
        monthShift += 5;
      }
      if (weekDay === 0) {
        weekShift++;
        if (drawMonthNextSunday) {
          svg
            .append("text")
            .attr("x", 20 + monthShift + weekShift * 10)
            .attr("y", -5)
            .text(months[dates[i].getMonth()])
            .attr("class", styles["meta-text"] + " " + styles["month-flag"]);

          drawMonthNextSunday = false;
        }
      }

      let id = getIDFromDay(dates[i]);
      svg
        .append("rect")
        .attr("x", 20 + monthShift + weekShift * 10)
        .attr("y", weekDay * 10)
        .attr("width", 8)
        .attr("height", 8)
        .attr("id", id)
        .attr("class", style)
        .attr("date", formatDate(dates[i]))
        .attr("scrobbles", 0)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    }
  }

  componentDidUpdate() {
    let lastList = this.props.user.scrobbles;
    if (lastList.length === 0) return;

    lastList = lastList[lastList.length - 1];
    if (
      (lastList.start >= this.startDate.utc &&
        lastList.start <= this.endDate.utc) ||
      (lastList.end <= this.endDate.utc && lastList.end >= this.startDate.utc)
    ) {
      let idList = lastList.list.map(e =>
        getIDFromDay(new Date(1000 * Number(e.date.uts)))
      );

      for (let i = 0; i < idList.length; i++) {
        let id = idList[i];
        if (this.frequencyList[id]) {
          this.frequencyList[id]++;
        } else {
          this.frequencyList[id] = 1;
        }
      }

      this.draw();
    }
  }

  componentDidMount() {
    const svg = d3
      .select(`#d3-section-${this.props.title}`)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "-20 -20 640 120");

    this.drawLegend(svg);
    this.drawYearBase(svg);
    this.drawWeekDays(svg);
    tooltip = svg.append("rect");
    tooltip_text = svg.append("text");
  }

  render() {
    return (
      <>
        <h2>
          Hey, {this.props.user.user}, this is how you listen to your music!
        </h2>
        <div
          id={`d3-section-${this.props.title}`}
          className={styles["graph-container"]}
        />
      </>
    );
  }
}

export default Heatmap;
