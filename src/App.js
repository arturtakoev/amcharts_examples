import React, { Component } from "react";
import "./App.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import HorizontalBarChart from "./HorizontalBarChart";

class App extends Component {
  render() {
    return (
      <>
        <LineChart />
        <BarChart />
        <HorizontalBarChart />
      </>
    );
  }
}

export default App;
