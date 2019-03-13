import React, { Component } from "react";
import "./App.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import HorizontalSeparated from "./HorizontalSeparated";
import Donut from "./PieChart";

class App extends Component {
  render() {
    return (
      <>
        <LineChart />
        <HorizontalSeparated />
        <BarChart />
        <HorizontalBarChart />
        <Donut />
      </>
    );
  }
}

export default App;
