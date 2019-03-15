import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { generateData } from "./data";

am4core.useTheme(am4themes_animated);

function TreeMap() {
  const [chartType] = useState("24");
  const initData = generateData(chartType);
  const [data] = useState(initData);

  useEffect(() => {
    let chart = am4core.create("treemaptdiv", am4charts.TreeMap);
    chart.paddingRight = 50;

    chart.data = data;

    /* Define data fields */
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.color = "color";

    var level1 = chart.seriesTemplates.create("0");
    let level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
    level1_bullet.locationY = 0.5;
    level1_bullet.locationX = 0.5;
    level1_bullet.label.text = "[bold]{name}[/]\n{content.formatNumber(##.0)}";
    level1_bullet.label.fontSize = 16;
    level1_bullet.label.textAlign = "middle";
    level1_bullet.label.fill = am4core.color("#000");
    //window.chart = chart;
  });

  return (
    <div>
      <div id="treemaptdiv" style={{ width: "100%", height: "500px" }} />
    </div>
  );
}

export default TreeMap;
