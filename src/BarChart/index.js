import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { generateData } from "./utils";
import { theme } from "../theme";

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

  const {
    charts: {
      green: { primary: addedColor },
      blue: { primary: updatedColor },
      red: { primary: deletedColor }
    }
  } = theme;

  useEffect(() => {
    let chart = am4core.create("barchartdiv", am4charts.XYChart);
    chart.paddingRight = 50;
    chart.data = data;

    // Modify chart's colors
    chart.colors.list = [
      am4core.color(addedColor),
      am4core.color(deletedColor),
      am4core.color(updatedColor),
      am4core.color("#FFF")
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
    categoryAxis.renderer.ticks.template.length = 10;
    //categoryAxis.renderer.cellEndLocation = 0.8;
    categoryAxis.renderer.cellStartLocation = 0.2; //HACK to show tooltip always

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "Amount";
    valueAxis.tooltip.disabled = true;

    // Create series
    function createSeries(field, name, withTooltip) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "time";
      series.dataFields.categoryY = "timeBefore";
      series.name = name;
      series.stacked = false;
      series.columns.template.width = am4core.percent(65);

      if (withTooltip) {
        /* Add a single HTML-based tooltip to first series */
        series.columns.template.width = am4core.percent(0);
        series.tooltipHTML = `
        <div class="tooltip">
          <div class="tooltip-title" >{categoryY}{categoryX}</div>
          <table class="tooltip-content" >
            <tr>        
              <td align="left">
              <span style="color: ${addedColor};">
              &#9632
              </span>
                Added: 
              <span class="bold-value">{added}</span>
              </td>              
            </tr>
            <tr>        
              <td align="left">
              <span style="color: ${deletedColor};">
                &#9632
              </span>
                Deleted: 
              <span class="bold-value">{deleted}</span>
              </td>              
            </tr>
            <tr>        
              <td align="left">
              <span style="color: ${updatedColor};">
                &#9632
              </span>
                Updated: 
              <span class="bold-value">{updated}</span>
              </td>              
            </tr>
          </table> 
        </div>
        `;
        series.tooltip.getFillFromObject = false;
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.autoTextColor = false;

        //series.tooltip.disabled = true;
      }
    }

    createSeries("added", "Added", false);
    createSeries("deleted", "Deleted", false);
    createSeries("updated", "Updated", false);
    createSeries("added", null, true); //HACK to show tooltip always

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.useDefaultMarker = true;
    chart.legend.dx = 64; //HACK

    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(0, 0, 0, 0);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color(theme.cursor.fill);
    chart.cursor.lineX.fillOpacity = 0.25;
    chart.cursor.lineY.strokeWidth = 0;
    chart.cursor.tooltip.disabled = false;
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
