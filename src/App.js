import React, { Component } from "react";
import "./App.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import HorizontalSeparated from "./HorizontalSeparated";
import Donut from "./PieChart";
import TreeMap from "./TreeMap";

class App extends Component {
  render() {
    return (
      <>
        <LineChart />
        <HorizontalSeparated />
        <BarChart />
        <HorizontalBarChart />
        <Donut />
        <TreeMap />
      </>
    );
  }
}

export default App;
