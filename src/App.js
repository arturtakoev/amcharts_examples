import React, { Component } from 'react';
import './App.css';
import LineChart from './LineChart';
import BarChart from './BarChart';

class App extends Component {
  render() {
    return (
      <>
        <LineChart />
        <BarChart />
      </>
    );
  }
}

export default App;
