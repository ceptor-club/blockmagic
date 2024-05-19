import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
    campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    externalId: { type: String, required: true, unique: true, index: true },
  sessionNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: false },
});

export const Session = model('Session', sessionSchema);