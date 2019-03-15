export function generateData(type) {
  let data = [
    {
      added: null,
      deleted: null,
      updated: null
    }
  ];
  let deleted = 10;
  let added = 10;
  let updated = 10;
  switch (type) {
    case "24":
      data[0].time = "00:00";
      for (let i = 1; i < 7; i++) {
        deleted = Math.round(Math.random() * 10);
        added = Math.round(Math.random() * 10);
        updated = Math.round(Math.random() * 10);
        data.push({
          timeBefore:
            i * 4 - 4 < 10 ? `0${i * 4 - 4}:00 - ` : `${i * 4 - 4}:00 - `,
          time: i * 4 < 10 ? `0${i * 4}:00` : `${i * 4}:00`,
          added: added,
          deleted: deleted,
          updated: updated
        });
      }
      data.push({
        time: "00:01",
        added: null,
        deleted: null,
        updated: null
      });
      return data;
    case "7":
      data = [];
      for (let i = 1; i < 7; i++) {
        deleted = Math.round(Math.random() * 10);
        added = Math.round(Math.random() * 10);
        updated = Math.round(Math.random() * 10);
        data.push({
          time: i < 10 ? `0${i}.03` : `${i}.03`,
          added: added,
          deleted: deleted,
          updated: updated
        });
      }
      return data;
    case "30":
      data[0].time = "01.03";
      for (let i = 2; i < 7; i++) {
        deleted = Math.round(Math.random() * 10);
        added = Math.round(Math.random() * 10);
        updated = Math.round(Math.random() * 10);
        data.push({
          timeBefore:
            i * 5 - 5 < 10 ? `0${i * 5 - 5}.03 - ` : `${i * 5 - 5}.03 - `,
          time: i * 5 < 10 ? `0${i * 5}.03` : `${i * 5}.03`,
          added: added,
          deleted: deleted,
          updated: updated
        });
      }
      data.push({
        time: "00:01",
        added: null,
        deleted: null,
        updated: null
      });
      return data;
    default:
      break;
  }
}
