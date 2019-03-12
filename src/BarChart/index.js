import "./BarChart.css";
import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { generateData } from "./utils";

am4core.useTheme(am4themes_animated);

function BarChart() {
  const [chartType, setChartType] = useState("24");
  const initData = generateData(chartType);
  const [data, setData] = useState(initData);

  function handleButtonClick(value) {
    setChartType(value);
    const newData = generateData(value);
    setData(newData);
  }

  useEffect(() => {
    let chart = am4core.create("barchartdiv", am4charts.XYChart);
    chart.paddingRight = 50;
    chart.data = data;

    // Modify chart's colors
    chart.colors.list = [
      am4core.color("#41aad7"),
      am4core.color("#73be58"),
      am4core.color("#e76c63")
    ];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.labels.template.location =
      chartType === "7" ? 0.5 : 1;
    categoryAxis.renderer.ticks.template.location = 0;
    categoryAxis.dataFields.category = "time";
    categoryAxis.title.text = "Time";
    categoryAxis.cursorTooltipEnabled = false;
    //categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.ticks.template.disabled = false;
    categoryAxis.renderer.ticks.template.strokeOpacity = 0.4;
    categoryAxis.renderer.cellEndLocation = 0.8;
    categoryAxis.renderer.cellStartLocation = 0.2;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "Amount";
    valueAxis.tooltip.disabled = true;

    // Create series
    function createSeries(field, name, stacked) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "time";
      series.dataFields.categoryY = "timeBefore";
      series.name = name;
      series.stacked = stacked;
      series.columns.template.width = am4core.percent(75);
      /* Add a single HTML-based tooltip to first series */
      if (field === "added") {
        series.tooltipHTML = `<div class="seriesTooltip time">{categoryY}-{categoryX}</div>
        <table class="seriesTooltip">
        
        <tr>        
          <th align="left"><span class="seriesAddedBullet">&#8226;</span> Added:</th>
          <td>{added}</td>
        </tr>
        <tr>
          <th align="left"><span class="seriesDeletedBullet">&#8226;</span> Deleted:</th>
          <td>{deleted}</td>
        </tr>
        <tr>
          <th align="left"><span class="seriesUpdatedBullet">&#8226;</span> Updated:</th>
          <td>{updated}</td>
        </tr>
        </table>
  `;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.autoTextColor = false;
      }
    }

    createSeries("added", "Added", false);
    createSeries("deleted", "Deleted", false);
    createSeries("updated", "Updated", false);

    console.log(chart.series);
    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.fontWeight = "bold";
    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(0, 0, 0, 0);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#8F3985");
    chart.cursor.lineX.fillOpacity = 0.1;
    chart.cursor.lineY.strokeWidth = 0;
  });

  return (
    <div>
      <div id="barchartdiv" style={{ width: "100%", height: "500px" }} />
      <button onClick={() => handleButtonClick("7")}>7 days</button>
      <button onClick={() => handleButtonClick("24")}>24 hours</button>
      <button onClick={() => handleButtonClick("30")}>30 days</button>
    </div>
  );
}

export default BarChart;
