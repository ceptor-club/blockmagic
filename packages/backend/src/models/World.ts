import { Schema, model } from 'mongoose';

const worldSchema = new Schema({
  name: { type: String, required: true },
    description: { type: String, required: true },
  vibe: { type: String, required: true },
    ccId: { type: String, required: true },
  externalId: { type: String, required: true, unique: true, index: true },
});

export const World = model('World', worldSchema);