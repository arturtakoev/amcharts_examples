import React, { Component } from "react";
import "./App.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import HorizontalSeparated from "./HorizontalSeparated";

class App extends Component {
  render() {
    return (
      <>
        <LineChart />
        <HorizontalSeparated />
        <BarChart />
        <HorizontalBarChart />
      </>
    );
  }
}

export default App;
