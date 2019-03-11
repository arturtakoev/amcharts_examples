import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import LineChart from './LineChart';
import BarChart from './BarChart';

am4core.useTheme(am4themes_animated);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <LineChart />
        </div>

        <div>
          <BarChart />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
