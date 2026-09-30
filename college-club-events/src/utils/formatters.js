export function formatEventDate(dateString) {
  if (!dateString) return "";
  try {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
}

export function getCategoryBadgeClass(category) {
  switch (category?.toLowerCase()) {
    case "technical":
      return "badge-technical";
    case "workshop":
      return "badge-workshop";
    case "competition":
      return "badge-competition";
    case "cultural":
      return "badge-cultural";
    case "seminar":
      return "badge-seminar";
    default:
      return "badge-other";
  }
}

export const getTodayDateString = () => {
  return new Date().toISOString().split("T")[0];
};
