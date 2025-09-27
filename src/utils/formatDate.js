// export const formatDate = (dateStr) => {
//   if (!dateStr) return "";
//   const date = new Date(dateStr);
//   return date.toLocaleString(); // User's local time and format
// };

export const formatDate = (dbDateStr) => {
  if (!dbDateStr) return "";
  const date = new Date(dbDateStr + "Z"); // treat as UTC
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).replace(",", "");
};
