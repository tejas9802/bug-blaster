export const sortTicket = (tickets, preference) => {
  switch (preference) {
    case "High to low":
      return [...tickets].sort((a, b) => b.priority - a.priority); // numeric descending
    case "Low to high":
      return [...tickets].sort((a, b) => a.priority - b.priority); // numeric ascending
    default:
      return tickets;
  }
};
