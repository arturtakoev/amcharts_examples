import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { theme } from "../theme";
import { generateData } from "./data";
import { generateTooltipContent } from "../utils";

am4core.useTheme(am4themes_animated);

/** Define main colors */
const {
  charts: {
    green: { primary: addedColor },
    blue: { primary: updatedColor },
    red: { primary: deletedColor }
  }
} = theme;

/** Tooltip contents */
const tooltipHTML = `
  <div class="tooltip">
    <div class="tooltip-title" >{categoryY}{categoryX}</div>
    <table class="tooltip-content" >
      <tr>        
        <td align="left">
        <span style="color: ${addedColor};">
        &#9679
        </span>
          Added: 
        <span class="bold-value">{added}</span>
        </td>              
      </tr>
      <tr>        
        <td align="left">
        <span style="color: ${deletedColor};">
          &#9679
        </span>
          Deleted: 
        <span class="bold-value">{deleted}</span>
        </td>              
      </tr>
      <tr>        
        <td align="left">
        <span style="color: ${updatedColor};">
          &#9679
        </span>
          Updated: 
        <span class="bold-value">{updated}</span>
        </td>              
      </tr>
    </table> 
  </div>
`;

class LineChart extends Component {
  componentDidMount() {
    let chart = am4core.create("linechartdiv", am4charts.XYChart);
    chart.paddingRight = 50;
    chart.data = generateData();

    /** Modify chart's colors */
    chart.colors.list = [
      am4core.color(addedColor),
      am4core.color(deletedColor),
      am4core.color(updatedColor),
      am4core.color("#FFF")
    ];

    /**
     * Category axis oprions
     */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "time";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.title.text = "Time";
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.ticks.template.length = 5;
    categoryAxis.renderer.ticks.template.disabled = false;
    categoryAxis.renderer.ticks.template.strokeOpacity = 0.4;

    /**
     * Value axis
     */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = "Amount";

    /**
     * Create series
     */
    let seriesAdded = chart.series.push(new am4charts.LineSeries());
    seriesAdded.dataFields.categoryX = "time";
    seriesAdded.dataFields.valueY = "added";
    seriesAdded.name = "Added";
    seriesAdded.strokeWidth = 2;
    seriesAdded.legendSettings.labelText = "Added";

    let seriesDeleted = chart.series.push(new am4charts.LineSeries());
    seriesDeleted.dataFields.categoryX = "time";
    seriesDeleted.dataFields.valueY = "deleted";
    seriesDeleted.name = "Deleted";
    seriesDeleted.strokeWidth = 2;
    seriesDeleted.legendSettings.labelText = "Deleted";

    let seriesUpdated = chart.series.push(new am4charts.LineSeries());
    seriesUpdated.dataFields.categoryX = "time";
    seriesUpdated.dataFields.valueY = "updated";
    seriesUpdated.name = "Updated";
    seriesUpdated.strokeWidth = 2;
    seriesUpdated.legendSettings.labelText = "Updated";

    let seriesTooltip = chart.series.push(new am4charts.LineSeries());
    seriesTooltip.dataFields.categoryX = "time";
    seriesTooltip.dataFields.valueY = "updated";
    seriesTooltip.strokeWidth = 0;

    /**
     * Add bullets (dots on chart lines)
     */
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

    /**
     * Create hover state
     * On hover bullets will resize
     */
    var hoverStateAdded = bulletAdded.states.create("hover");
    hoverStateAdded.properties.scale = 1;
    var hoverStateDeleted = bulletDeleted.states.create("hover");
    hoverStateDeleted.properties.scale = 1;
    var hoverStateUpdated = bulletUpdated.states.create("hover");
    hoverStateUpdated.properties.scale = 1;

    /*
     * Add a single HTML-based tooltip to specially created series
     */

    const tooltipConfig = {
      bullet: "&#9632",
      Added: { color: addedColor, description: "Added" },
      Updated: { color: updatedColor, description: "Updated" },
      Deleted: { color: deletedColor, description: "Deleted" }
    };
    seriesTooltip.adapter.add("tooltipHTML", function() {
      return `
      <div class="tooltip">
        <div class="tooltip-title" >{categoryY}{categoryX}</div>
        <table class="tooltip-content" >
          ${generateTooltipContent(chart.series, tooltipConfig)}
        </table> 
      </div>
      `;
    });
    //seriesTooltip.tooltipHTML = tooltipHTML;
    seriesTooltip.tooltip.pointerOrientation = "horizontal";
    seriesTooltip.tooltip.getFillFromObject = false;
    seriesTooltip.tooltip.background.fill = am4core.color("#FFF");
    seriesTooltip.tooltip.autoTextColor = false;

    /**
     * Cursor options
     */
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;

    /**
     * Legend
     */
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    this.chart = chart;
    chart.legend.dx = 64; //HACK

    window.chart = chart;
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
