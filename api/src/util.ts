import { restrictedTimezone } from "./constants";
import { Participant, RSVP_STATUS } from "./types/participant.interface";

export const isRestrictedTimezone = (timezone: string) =>
  restrictedTimezone.includes(timezone);

export const filterAllowedPayload = (
  payload: Participant,
  keyMapping: Record<string, string>
) => {
  return Object.entries(payload).reduce((acc, [key, value]) => {
    if (keyMapping[key] && value !== undefined) {
      acc[keyMapping[key]] = value;
    }
    return acc;
  }, {} as { [key: string]: number | string | RSVP_STATUS });
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
