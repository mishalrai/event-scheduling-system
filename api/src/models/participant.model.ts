import { DataTypes } from "sequelize";
import sequelize from "../config/database";

export const Participant = sequelize.define(
  "Participant",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "events", key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    rsvp_status: {
      type: DataTypes.ENUM("accepted", "declined", "pending"),
      allowNull: false,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    timestamps: false,
    tableName: "participants",
  }
);
