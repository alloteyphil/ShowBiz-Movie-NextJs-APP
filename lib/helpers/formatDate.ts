import { format } from "date-fns";

export const formatDate = (dateInput: string): string => {
  const date = new Date(dateInput);
  const formattedDate = format(date, "MMMM dd, yyyy");
  return formattedDate;
};
