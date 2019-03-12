import React, { useState, useEffect } from "react";
import "./index.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { generateData } from "./utils";

am4core.useTheme(am4themes_animated);

function BarChart() {
  const [chartType, setChartType] = useState("24 hours");
  const initData = generateData(chartType);
  const [data, setData] = useState(initData);

  function handleButtonClick(value) {
    setChartType(value);
    const newData = generateData(value);
    setData(newData);
  }

  useEffect(() => {
    let chart = am4core.create("horizbarchartdiv", am4charts.XYChart);
    chart.paddingRight = 50;
    chart.data = data;

    /** Modify chart's colors */
    chart.colors.list = [am4core.color("#41aad7"), am4core.color("#9ed5ec")];

    /** Create axes */
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "tag";
    categoryAxis.cursorTooltipEnabled = false;
    categoryAxis.renderer.grid.template.disabled = true;
    //TODO: ticks for now are not displayed properly on Y axis (wrong position)
    //categoryAxis.renderer.ticks.template.disabled = false;
    //categoryAxis.renderer.ticks.template.strokeOpacity = 0.4;
    //categoryAxis.renderer.ticks.template.length = 10;
    //categoryAxis.renderer.ticks.template.location = 1;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "Amount";
    valueAxis.tooltip.disabled = true;

    /** Create series */
    function createSeries(field, name) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "tag";
      series.name = name;
      series.clustered = false;

      /* Add a single HTML-based tooltip to first series */
      if (field === "now") {
        series.columns.template.height = am4core.percent(50);
        series.tooltipHTML = `
        <div class="tooltip">
          <div class="hbar-tooltip-title" >{categoryY}{categoryX}</div>
          <table class="tooltip-content" >
            <tr>        
              <td align="left">
              <span class="hbar-bullet-now">&#8226</span>
              Last ${chartType}: 
              <span class="hbar-value">{now}</span>
              </td>              
            </tr>
            <tr>        
            <td align="left">
            <span class="hbar-bullet-before">&#8226</span>
            ${chartType} before: 
            <span class="hbar-value">{before}</span>
            </td>              
          </tr>
          </table> 
        </div>
        `;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.autoTextColor = false;
      } else {
        series.columns.template.height = am4core.percent(25);
      }
    }

    createSeries("now", `Last ${chartType}`);
    createSeries("before", `${chartType} before`);
    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.useDefaultMarker = true;
    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(0, 0, 0, 0);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#ccd6eb");
    chart.cursor.lineX.fillOpacity = 0.25;
    chart.cursor.lineY.strokeWidth = 0;
  });

  return (
    <div>
      <div id="horizbarchartdiv" style={{ width: "100%", height: "500px" }} />
      <button onClick={() => handleButtonClick("7 days")}>7 days</button>
      <button onClick={() => handleButtonClick("24 hours")}>24 hours</button>
      <button onClick={() => handleButtonClick("30 days")}>30 days</button>
    </div>
  );
}

export default BarChart;
