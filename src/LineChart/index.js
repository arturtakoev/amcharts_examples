import React, { Component } from "react";
//import logo from './logo.svg';
import "./LineChart.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class LineChart extends Component {
  componentDidMount() {
    let chart = am4core.create("linechartdiv", am4charts.XYChart);

    chart.paddingRight = 50;
    let data = [];
    let deleted = 10;
    let added = 10;
    let updated = 10;
    for (let i = 1; i < 24; i++) {
      deleted += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
      );
      added += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      updated += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
      );
      data.push({
        time: i < 10 ? `0${i}:00` : `${i}:00`,
        added: added,
        deleted: deleted,
        updated: updated
      });
    }
    chart.data = data;

    // Modify chart's colors
    chart.colors.list = [
      am4core.color("#41aad7"),
      am4core.color("#73be58"),
      am4core.color("#e76c63")
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "time";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.title.text = "Time";
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.ticks.template.length = 5;
    categoryAxis.renderer.ticks.template.disabled = false;
    categoryAxis.renderer.ticks.template.strokeOpacity = 0.4;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = "Amount";

    let seriesAdded = chart.series.push(new am4charts.LineSeries());
    seriesAdded.dataFields.categoryX = "time";
    seriesAdded.dataFields.valueY = "added";
    seriesAdded.strokeWidth = 2;
    // static
    seriesAdded.legendSettings.labelText = "Added";

    let seriesDeleted = chart.series.push(new am4charts.LineSeries());
    seriesDeleted.dataFields.categoryX = "time";
    seriesDeleted.dataFields.valueY = "deleted";
    seriesDeleted.strokeWidth = 2;
    // static
    seriesDeleted.legendSettings.labelText = "Deleted";

    let seriesUpdated = chart.series.push(new am4charts.LineSeries());
    seriesUpdated.dataFields.categoryX = "time";
    seriesUpdated.dataFields.valueY = "updated";
    seriesUpdated.strokeWidth = 2;
    // static
    seriesUpdated.legendSettings.labelText = "Updated";

    // Add bullets
    var bulletAdded = seriesAdded.bullets.push(new am4charts.CircleBullet());
    bulletAdded.circle.strokeWidth = 2;
    bulletAdded.properties.scale = 0;
    var bulletDeleted = seriesDeleted.bullets.push(
      new am4charts.CircleBullet()
    );
    bulletDeleted.circle.strokeWidth = 2;
    bulletDeleted.properties.scale = 0;
    var bulletUpdated = seriesUpdated.bullets.push(
      new am4charts.CircleBullet()
    );
    bulletUpdated.circle.strokeWidth = 2;
    bulletUpdated.properties.scale = 0;

    // Create hover state
    var hoverStateAdded = bulletAdded.states.create("hover");
    hoverStateAdded.properties.scale = 1;
    var hoverStateDeleted = bulletDeleted.states.create("hover");
    hoverStateDeleted.properties.scale = 1;
    var hoverStateUpdated = bulletUpdated.states.create("hover");
    hoverStateUpdated.properties.scale = 1;

    /* Add a single HTML-based tooltip to first series */
    seriesAdded.tooltipHTML = `
    <div class="tooltip">
      <div class="tooltip-title">{categoryY}{categoryX}</div>
      <table class="tooltip-content" >
        <tr>        
          <td align="left"><span class="seriesAddedBullet" >Added</span>: {added}</td>              
        </tr>
        <tr>        
          <td align="left"><span class="seriesUpdatedBullet">Updated</span>: {updated}</td>              
        </tr>
        <tr>        
        <td align="left"><span class="seriesDeletedBullet">Added</span>: {deleted}</td>              
      </tr>
      </table> 
    </div>
    `;
    seriesAdded.tooltip.pointerOrientation = "horizontal";
    seriesAdded.tooltip.getFillFromObject = false;
    seriesAdded.tooltip.background.fill = am4core.color("#FFF");
    seriesAdded.tooltip.autoTextColor = false;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;

    // add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="linechartdiv" style={{ width: "100%", height: "500px" }} />;
  }
}

export default LineChart;
