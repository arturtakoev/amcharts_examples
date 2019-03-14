export function generateData() {
  let data = [];
  let deleted = 10;
  let added = 10;
  let updated = 10;
  for (let i = 1; i < 24; i++) {
    deleted += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    added += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    updated += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    data.push({
      time: i < 10 ? `0${i}:00` : `${i}:00`,
      added: added,
      deleted: deleted,
      updated: updated
    });
  }
  return data;
}
