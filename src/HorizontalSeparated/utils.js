export function generateData() {
  return [
    {
      activity: "Updated",
      amount: Math.round(Math.random() * 100)
    },
    {
      activity: "Deleted",
      amount: Math.round(Math.random() * 100)
    },
    {
      activity: "Added",
      amount: Math.round(Math.random() * 100)
    }
  ];
}
