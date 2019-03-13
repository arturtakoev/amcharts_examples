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
    let chart = am4core.create("donutchartdiv", am4charts.PieChart);
    chart.paddingRight = 50;
    chart.data = data;

    const total = data.reduce((a, b) => a + b["amount"], 0);

    // Set inner radius
    chart.innerRadius = am4core.percent(50);
    // Modify chart's colors

    const colorSet = new am4core.ColorSet();

    colorSet.list = ["#73be58", "#e76c63", "#41aad7"].map(function(color) {
      return new am4core.color(color);
    });

    /** Create Pie */
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = "activity";
    pieSeries.dataFields.value = "amount";
    pieSeries.colors = colorSet;
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.labels.template.text = "{amount}";
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    //pieSeries.slices.template.tooltipText = "{category}: {value.value}";
    pieSeries.slices.template.tooltipHTML = `
    <div class="tooltip">
      <table class="tooltip-content" >
        <tr>        
          <td align="left"><span>{activity}</span>: <span class="hbar-value">{amount}</span> ({value.percent.formatNumber('##.')}%)</td>
        </tr>
      </table> 
    </div>
    `;
    pieSeries.tooltip.getFillFromObject = false;
    pieSeries.tooltip.background.fill = am4core.color("#FFF");
    pieSeries.tooltip.autoTextColor = false;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.text = "{category}";
    chart.legend.valueLabels.template.text = "";

    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(0, 0, 0, 0);
    console.log(chart.legend);

    var label = chart.seriesContainer.createChild(am4core.Label);
    label.text = `${total}`;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 50;
    label.dy = -25;

    var label2 = chart.seriesContainer.createChild(am4core.Label);
    label2.text = "activity\n by indicator";
    label2.textAlign = "middle";
    label2.horizontalCenter = "middle";
    label2.verticalCenter = "middle";
    label2.dy = 25;
    label2.fontSize = 16;
  });

  return (
    <div>
      <div id="donutchartdiv" style={{ width: "100%", height: "500px" }} />
    </div>
  );
}

export default BarChart;
