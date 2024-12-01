import sequelize from "../config/database";
import { Participant } from "./participant.model";
import { Event } from "./event.model";

// Associations
Event.hasMany(Participant, { foreignKey: "event_id", onDelete: "CASCADE" });
Participant.belongsTo(Event, { foreignKey: "event_id" });

(async () => {
  // Create all model table if doesn't exist in db
  await sequelize.sync();
  console.log("All the modals were synchronized successfully");
})();

export { sequelize, Event, Participant };
