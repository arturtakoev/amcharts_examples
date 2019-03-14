import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { generateData } from "./data";
import { theme } from "../theme";
import { generateTooltipContent } from "../utils";

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

  const {
    charts: {
      blue: { primary: lastColor, secondary: beforeColor }
    }
  } = theme;

  useEffect(() => {
    let chart = am4core.create("horizbarchartdiv", am4charts.XYChart);
    chart.paddingRight = 50;
    chart.data = data;

    /** Modify chart's colors */
    chart.colors.list = [
      am4core.color(lastColor),
      am4core.color(beforeColor),
      am4core.color("#FFF")
    ];

    /** Create axes */
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "tag";
    categoryAxis.cursorTooltipEnabled = false;
    categoryAxis.renderer.grid.template.disabled = true;
    //TODO: ticks for now are not displayed properly on Y axis (wrong position)
    categoryAxis.renderer.ticks.template.disabled = false;
    categoryAxis.renderer.ticks.template.strokeOpacity = 0.4;
    categoryAxis.renderer.ticks.template.length = 10;
    //categoryAxis.renderer.ticks.template.location = 1;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "Amount";
    valueAxis.tooltip.disabled = true;

    /** Create series */
    function createSeries(field, name, legendLabel, withTooltip, columnHeight) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "tag";
      series.name = name;
      series.clustered = false;
      series.legendSettings.labelText = legendLabel;
      series.columns.template.height = am4core.percent(columnHeight);
      /* Add a single HTML-based tooltip to first series */
      if (withTooltip) {
        const tooltipConfig = {
          bullet: "&#9632",
          last: {
            color: lastColor,
            description: `Last ${chartType}`
          },
          before: {
            color: beforeColor,
            description: `${chartType} before`
          }
        };
        series.adapter.add("tooltipHTML", function() {
          return `
          <div class="tooltip">
            <div class="tooltip-title" >{categoryY}{categoryX}</div>
            <table class="tooltip-content" >
              ${generateTooltipContent(chart.series, tooltipConfig)}
            </table> 
          </div>
          `;
        });
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#FFF");
      }
    }

    createSeries("now", `last`, `Last ${chartType}`, false, 50);
    createSeries("before", `before`, `${chartType} before`, false, 25);
    createSeries("now", null, null, true, 0); //HACK invisible column will show the tooltip
    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.useDefaultMarker = true;
    chart.legend.adapter.add("label");
    chart.legend.dx = 64; //HACK
    let marker = chart.legend.markers.template.children.getIndex(0);

    marker.cornerRadius(0, 0, 0, 0);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#ccd6eb");
    chart.cursor.lineX.fillOpacity = 0.25;
    chart.cursor.lineY.strokeWidth = 0;

    /**
     * Uncomment for debug in browser window
     */
    //window.chart = chart;
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
