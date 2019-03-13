import React, { useState, useEffect } from "react";
import "./index.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { generateData } from "./utils";

am4core.useTheme(am4themes_animated);

function BarChart() {
  const initData = generateData();
  const [data] = useState(initData);

  useEffect(() => {
    let chart = am4core.create("horsepchartdiv", am4charts.XYChart);
    chart.paddingRight = 50;
    console.log(data);
    chart.data = data;

    // Modify chart's colors
    chart.colors.list = [
      am4core.color("#41aad7"),
      am4core.color("#e76c63"),
      am4core.color("#73be58")
    ];

    /** Create axes */
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "activity";
    categoryAxis.cursorTooltipEnabled = false;
    categoryAxis.renderer.grid.template.disabled = true;
    //TODO: ticks for now are not displayed properly on Y axis (wrong position)
    categoryAxis.renderer.ticks.template.disabled = false;
    categoryAxis.renderer.ticks.template.strokeOpacity = 0.4;
    categoryAxis.renderer.ticks.template.length = 10;
    //categoryAxis.renderer.ticks.template.location = 1;

    /** */
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.title.text = "Amount";
    valueAxis.tooltip.disabled = true;

    /** Add columns */
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.columns.template.height = am4core.percent(41);
    series.columns.template.strokeOpacity = 0;
    series.dataFields.valueX = "amount";
    series.dataFields.categoryY = "activity";

    /** Add labels to the right of every bar */
    let valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{amount}";
    valueLabel.label.fontSize = 16;
    valueLabel.label.horizontalCenter = "left";
    valueLabel.label.dx = 10;

    /** Set fill colors  */
    series.columns.template.adapter.add("fill", (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });
  });

  return (
    <div>
      <div id="horsepchartdiv" style={{ width: "100%", height: "500px" }} />
    </div>
  );
}

export default BarChart;
