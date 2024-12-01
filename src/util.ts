import { restrictTimezone } from "./constants";

export const isRestrictedTimezone = (timezone: string) =>
  restrictTimezone.includes(timezone);
