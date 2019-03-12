import sortBy from "lodash.sortby";

export function generateData(type) {
  let data = [];
  let before = 10;
  let now = 10;
  let updated = 10;
  switch (type) {
    case "24 hours":
      for (let i = 1; i < 7; i++) {
        before = Math.round(Math.random() * 1000);
        now = Math.round(Math.random() * 1000);
        data.push({
          tag: `Tag name ${i}`,
          now: now,
          before: before
        });
      }
      return sortBy(data, ["now"]);
    case "7 days":
      for (let i = 1; i < 7; i++) {
        before = Math.round(Math.random() * 1000);
        now = Math.round(Math.random() * 1000);
        data.push({
          tag: `Tag name ${i}`,
          now: now,
          before: before
        });
      }
      return sortBy(data, ["now"]);
    case "30 days":
      for (let i = 2; i < 7; i++) {
        before = Math.round(Math.random() * 1000);
        now = Math.round(Math.random() * 1000);
        data.push({
          tag: `Tag name ${i}`,
          now: now,
          before: before
        });
      }

      return sortBy(data, ["now"]);
    default:
      break;
  }
}
