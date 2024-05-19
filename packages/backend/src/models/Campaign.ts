import { Schema, model } from 'mongoose';

const campaignSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  worldId: { type: Schema.Types.ObjectId, ref: 'World', required: true },
  ccId: { type: String, required: true },
  externalId: { type: String, required: true, unique: true, index: true },
  numCharacters: { type: Number, required: true },
  numGmMadeCharacters: { type: Number, required: true },
  numPlayerMadeCharacters: { type: Number, required: true },
  sessionZero: { type: Boolean, required: true },
  frequency: { type: String, enum: ['one_shot', 'regular_cadence', 'custom_cadence'], required: true },
  scheduledSessions: [{ type: Date }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
});

export const Campaign = model('Campaign', campaignSchema);