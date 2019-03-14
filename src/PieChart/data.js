export function generateData() {
  return [
    {
      activity: "Added",
      amount: Math.round(Math.random() * 100),
      color: "#73be58"
    },
    {
      activity: "Deleted",
      amount: Math.round(Math.random() * 100),
      color: "#e76c63"
    },
    {
      activity: "Updated",
      amount: Math.round(Math.random() * 100),
      color: "#41aad7"
    }
  ];
}
