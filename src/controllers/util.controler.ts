import { Participant, Event } from "../models";
export const isEventIdExist = async (id: number): Promise<boolean> => {
  if (!id) {
    return false;
  }
  const event = await Event.findOne({ where: { id } });
  return !!event;
};

export const isUserIdExist = async (id: number): Promise<boolean> => {
  if (!id) {
    return false;
  }
  const event = await Participant.findOne({ where: { id } });
  return !!event;
};

export const isEmailInUse = async (email: string): Promise<boolean> => {
  if (!email) {
    return false;
  }
  const event = await Participant.findOne({ where: { email } });
  return !!event;
};
