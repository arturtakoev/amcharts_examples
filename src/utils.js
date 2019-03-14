/**
 * Generates the content of tooltip, used in adapter function
 * @param {Object} series Should contain values array
 * @param {Object} config Used for styling (should contain properties with series name)
 */
export function generateTooltipContent(series, config) {
  let content = ``;
  series.values.forEach(seriesItem => {
    if (!seriesItem.isHidden && seriesItem.name) {
      content += `<tr>        
          <td align="left">
          ${config.bullet &&
            `<span style="color: ${config[seriesItem.name].color};">
            ${config.bullet}
            </span>`}
            ${config[seriesItem.name].description}: 
          ${
            seriesItem.dataFields.valueY
              ? `<span class="bold-value">{${
                  seriesItem.dataFields.valueY
                }}</span>`
              : `<span class="bold-value">{${
                  seriesItem.dataFields.valueX
                }}</span>`
          }  
          </td>              
        </tr>`;
    }
  });
  return content;
}
