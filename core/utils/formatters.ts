import { format, parseISO } from "date-fns";

export const dateFormatter = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "LLLL	d, yyyy");
};
