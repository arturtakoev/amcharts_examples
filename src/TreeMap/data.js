import sortBy from "lodash.sortby";

/** Get the needed colors from theme */
const colors = ["#f4fafd", "#ddf0f9", "#c8e7f4", "#b2def0", "#9ed5ec"]; //

export function generateData() {
  const data = [
    {
      name: "One",
      value: Math.round(Math.log(Math.random() * 10000000)),
      content: Math.round(Math.random() * 10000000)
    },
    {
      name: "Two",
      value: Math.round(Math.log(Math.random() * 1000)),
      content: Math.round(Math.random() * 1000)
    },
    {
      name: "Three",
      value: Math.round(Math.log(Math.random() * 10000)),
      content: Math.round(Math.random() * 10000)
    },
    {
      name: "Four",
      value: Math.round(Math.log(Math.random() * 100000)),
      content: Math.round(Math.random() * 100000)
    },
    {
      name: "Five",
      value: Math.round(Math.log(Math.random() * 100)),
      content: Math.round(Math.random() * 100)
    }
  ];
  const sortedData = sortBy(data, ["value"]);
  const withColors = sortedData.map((dataItem, index) => {
    dataItem.color = colors[index];
    return dataItem;
  });
  return withColors;
}
