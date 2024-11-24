import { parseISO, format } from "date-fns";

export const formatDate = (isoDateString: string): string => {
  return format(parseISO(isoDateString), "yyyy-MM-dd");
};
