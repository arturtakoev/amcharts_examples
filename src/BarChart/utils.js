export function generateData(type) {
  let data = [];
  let deleted = 10;
  let added = 10;
  let updated = 10;
  switch (type) {
    case '24':
      for (let i = 1; i < 7; i++) {
        deleted = Math.round(Math.random() * 10);
        added = Math.round(Math.random() * 10);
        updated = Math.round(Math.random() * 10);
        data.push({
          timeBefore: i * 4 - 4 < 10 ? `0${i * 4 - 4}:00` : `${i * 4 - 4}:00`,
          time: i * 4 < 10 ? `0${i * 4}:00` : `${i * 4}:00`,
          added: added,
          deleted: deleted,
          updated: updated,
        });
      }
      // data.push({
      //   time: `04:01`,
      // });
      return data;
    case '7':
      for (let i = 1; i < 7; i++) {
        deleted = Math.round(Math.random() * 10);
        added = Math.round(Math.random() * 10);
        updated = Math.round(Math.random() * 10);
        data.push({
          time: i < 10 ? `0${i}.03` : `${i}.03`,
          added: added,
          deleted: deleted,
          updated: updated,
        });
      }
      return data;
    case '30':
      for (let i = 1; i < 7; i++) {
        deleted = Math.round(Math.random() * 10);
        added = Math.round(Math.random() * 10);
        updated = Math.round(Math.random() * 10);
        data.push({
          time: i * 5 < 10 ? `0${i * 5}.03` : `${i * 5}.03`,
          added: added,
          deleted: deleted,
          updated: updated,
        });
      }

      return data;
    default:
      break;
  }
}
