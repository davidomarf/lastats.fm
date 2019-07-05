/**
 * Heatmap that plots the daily scrobbles in a year.
 *
 * The data is received as a prop from the state of UserPage, it calculates the
 * number of scrobbles on each day, and assigns each day a color based on the
 * number of scrobbles and the maximum number of daily scrobbles, so days close
 * to that number are brighter, and days close to 0, are darker.
 *
 * @file    This file defines the Heatmap Component.
 * @author  davidomarf
 * @author  JAKESNAKE523
 * @since   v0.1.0
 */

import React from "react";
import styles from "./Heatmap.module.scss";
import * as d3 from "d3";

/* -------------------------- Component Definition -------------------------- */

/**
 * Heatmap that plots the daily scrobbles in a year.
 */
class Heatmap extends React.Component {
  constructor(props) {
    super(props);

    // List containing {id:count} elements, where id is the ID generated using
    // getIDFromDay(), and count is the number of scrobbles in that date
    this.frequencyList = {};

    // Maximum number of scrobbles in a single day
    this.mostScrobblesInADay = 0;

    // Doesn't include the color assigned to days with 0 scrobbles.
    // If needs update, also update myColor...domain([0, {newValue}])
    this.numberOfColorTags = 4;

    // The last date for the period to be displayed in the Heatmap
    this.endDate = { date: new Date() };
    this.endDate.utc = Math.ceil(this.endDate.date.getTime() / 1000);

    // Same day as endDate, but one year ago
    this.startDate = {
      date: new Date(
        new Date().setFullYear(this.endDate.date.getFullYear() - 1)
      )
    };
    this.startDate.utc = Math.floor(this.startDate.date.getTime() / 1000);
  }

  /**
   * Writes the name of the days for the rows.
   *
   * Write "Mon", "Wed", and "Fri" at the leftmost part of the visualization
   * for the corresponding rows.
   *
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
   * Draws the legend of the graph.
   *
   * The legend will display all the available color tags, and the range of
   * values each one indicates.
   *
   * @param {Object} svg  SVG element where the graph is drawn
   */
  drawLegend(svg) {
    let text = [
<<<<<<< HEAD
      [20, 90, "Less"],
      [45 + (this.numberOfColorTags + 1) * 10, 90, "More"]
=======
      [20, 100, "Less"],
      [45 + (this.numberOfCategories + 1) * 10, 100, "More"]
>>>>>>> Update the style
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

    for (let i = 0; i <= this.numberOfColorTags; i++) {
      svg
        .append("rect")
        .attr("x", 42 + i * 10)
<<<<<<< HEAD
        .attr("y", 82)
=======
        .attr("y", 92)
>>>>>>> Update the style
        .attr("width", 9)
        .attr("height", 9)
        .attr("style", `fill:${myColor(i)}; stroke:#4E5467`);
    }
  }

  /**
   * Update the Heatmap to indicate the number of scrobbles in each day.
   *
   * Go through an "array-ized" version of frequencyList, and use the {id} to
   * select the SVG items, and the {value} to calculate the fill color.
   */
  updateHeatmapValues() {
    // Convert the dictionary into an array of {key, value} objects
    // @see https://github.com/d3/d3-collection#entries
    let freqArray = d3.entries(this.frequencyList);

    // Update using the maximum value in freqArray
    this.mostScrobblesInADay = d3.max(freqArray, d => d.value);

    for (let i = 0; i < freqArray.length; i++) {
      // The number sent to myColor is an integer between 0 and
      // this.numberOfColorTags. It is calculated by multiplying the ratio of
      // dayValue / maxValue by the number of available color tags.
      let color = myColor(
        Math.ceil(
          this.numberOfColorTags *
            (freqArray[i].value / this.mostScrobblesInADay)
        )
      );

      d3.select("#" + freqArray[i].key)
      .transition()
      .duration(2000)
        .attr("r", 1.5 + this.numberOfCategories * .5 *  (freqArray[i].value / this.maxValue))
        .style("fill", color)
        .style("stroke", color)
        .attr("scrobbles", freqArray[i].value);
    }
  }

  drawHeatmapCells(svg) {
    // Create an array of dates for the year
    let dates = getDateArray(this.startDate.date, this.endDate.date);

    // The shifting values are the ones that displace the cells in the x
    // coordinate every new week or month
    let monthShift = 0;
    let weekShift = 0;

    // When true, will write the name of the month over the first sunday
    // it encounters
    let writeMonthNameNextSunday = false;

    for (let i = 0; i < dates.length; i++) {
      let style = styles["day"];

      // .getDay() returns the day of the week (between 0, 6)
      // .getDate() returns the day of the month
      let weekDay = dates[i].getDay();
      let monthDay = dates[i].getDate();

      // This makes the script write the name of the month on the second week
      // of the month
      if (monthDay === 1) {
        writeMonthNameNextSunday = true;
        // Also increment the shift for the cells of the next month. This
        // creates a space between months.
        monthShift += 5;
      }

      // When it's sunday
      if (weekDay === 0) {
        // When starting a new week, increment the shift for the new cells
        weekShift++;

        // If we have to write the name of the month on top
        if (writeMonthNameNextSunday) {
          svg
            .append("text")
            .attr("x", 20 + monthShift + weekShift * 10)
            .attr("y", 80)
            .text(months[dates[i].getMonth()])
            .attr("class", styles["meta-text"] + " " + styles["month-flag"]);

          // Avoid drawing the month more than once
          writeMonthNameNextSunday = false;
        }
        weekShift++;

      }

      /* ---------------------- Append a heatmap cell --------------------- */

      // Get the ID for the cell using the date
      let id = getIDFromDay(dates[i]);

      svg
        .append("circle")
        .attr("cx", 22 + monthShift + weekShift * 10)
        .attr("cy", 2 + weekDay * 10)
        .attr("r", 1)
        // .attr("height", 8)
        .attr("id", id)
        .attr("class", style)
        // The attributes 'date' and 'scrobbles' are used to get the content
        // of the tooltip when hovering on a cell
        .attr("date", formatDate(dates[i]))
        .attr("scrobbles", 0)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    }
  }

  /**
   * React function to run when the component updates
   *
   * It's expected that the component will be updated every time UserPage
   * fetches one more page of the scrobbles list.
   */
  componentDidUpdate() {
    // Assign the props value to a variable to avoid writing a lot
    let lastList = this.props.user.scrobbles;

    // If the list is empty, don't proceed
    if (lastList.length === 0) return;

    // Since this function runs every time it updates, and the only reason for
    // it to update is because UserPage added an item to the scrobbles list,
    // we can safely just work with the last item on that list (which) is a list
    lastList = lastList[lastList.length - 1];

    // This ensures that there are items on lastList that fit inside the period
    // that the Heatmap is displaying.
    if (
      (lastList.start >= this.startDate.utc &&
        lastList.start <= this.endDate.utc) ||
      (lastList.end <= this.endDate.utc && lastList.end >= this.startDate.utc)
    ) {
      // Convert the list of scrobble objects into a list of strings using the
      // date to determine an ID
      let idList = lastList.list.map(e =>
        getIDFromDay(new Date(1000 * Number(e.date.uts)))
      );

      // This counts the number of times that a given id appears in the
      // current list of ids
      for (let i = 0; i < idList.length; i++) {
        let id = idList[i];
        // If this.frequencyList.id is defined, increment its value
        if (this.frequencyList[id]) {
          this.frequencyList[id]++;
        }
        // If not, it means it's the first time that id appears, so initialize it
        else {
          this.frequencyList[id] = 1;
        }
      }

      // Update the values considering the new added scrobbles
      this.updateHeatmapValues();
    }
  }

  /**
   * React function to run when the component has been mounted
   *
   * This runs only once, and uses that fact to initialize the canvas, and append
   * the items that won't be redrawn.
   */
  componentDidMount() {
    // This creates the svg for the graph
    const svg = d3
      .select(`#d3-section-${this.props.title}`)
      .append("svg")
      // This makes the svg element responsive
      // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
      // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "-20 -5 640 120");

    // Draw the Heatmap structure: Legend, texts, and cells
    this.drawLegend(svg);
    this.drawWeekDays(svg);
    this.drawHeatmapCells(svg);

    // Initialize the tooltip. Draw it after all other items so it stays at top
    tooltip = svg.append("rect");
    tooltip_text = svg.append("text");
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

/* ---------------------------- Helping Functions --------------------------- */

/**
 * Formats a Date in a readable String.
 *
 * The format is Month dd, YYYY.
 *
 * @param {Object} date  Date to be formatted
 * @returns {string}     Date to string in format Month dd, YYYY
 */
function formatDate(date) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Used to render the month's name without calling Date.toLocaleDateString()
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
 * Generate an array of dates containing every day between start and end.
 *
 * If start is a later date than end, it will generate the dates backwards.
 *
 * @param {Object} start  First value of the array
 * @param {Object} end    Last value of the array
 * @return {Object[]}     All the dates between start and end
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

/**
 * Creates an ID for a date using its Year, Month, Date.
 *
 * @param {Object} date Date to be used
 * @returns {string}    "hm-" + Date in format YYYY-MM-D
 */
function getIDFromDay(date) {
  return `hm-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * Function to interpolate colors using a given d3 color palette.
 *
 * The domain is the range of the expected values to be received in the
 * interpolator. For this use case, domain[1] must match
 * Heatmap.numberofCategories.
 */
const myColor = d3
  .scaleLinear()
  .range(["#383C4A", "#e4fd3f"])
  .domain([0, 4]);

/* --------------------------- D3 Tooltip Elements -------------------------- */

// Tooltip and Tooltip text are global variables that are used to display the
// number of scrobbles and date of each day in the Heatmap.
let tooltip;
let tooltip_text;

// Rules to modify the tooltip the mouse is over
let mouseover = function(d) {
  tooltip.style("opacity", 0.9);
  tooltip_text.style("opacity", 1);
};

// Rules to modify the tooltip when the mouse moves within it
let mousemove = function(d) {
  let day = d3.select(this);
  tooltip_text
    .style("fill", "white")
    .text(`${day.attr("scrobbles")} scrobbles on ${day.attr("date")}`)
    .attr("class", styles["meta-text"])
    .attr(
      "x",
      d3.mouse(this)[0] +
        (d3.mouse(this)[0] > 491
          ? -(tooltip_text.node().getBBox().width + 15)
          : 15)
    )
    .attr("y", d3.mouse(this)[1]);
  tooltip
    .attr("width", tooltip_text.node().getBBox().width + 10)
    .attr("height", 15)
    .attr(
      "x",
      d3.mouse(this)[0] +
        (d3.mouse(this)[0] > 491
          ? -(tooltip_text.node().getBBox().width + 20)
          : 10)
    )
    .attr("y", d3.mouse(this)[1] - 10);
};

// Rules to modify the tooltip when the mouse leaves it
let mouseleave = function(d) {
  tooltip.style("opacity", 0);
  tooltip_text.text("");
};

/* ---------------------------- Export Component ---------------------------- */

export default Heatmap;
