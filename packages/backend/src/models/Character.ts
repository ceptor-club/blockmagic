import { Schema, model } from 'mongoose';

const characterSchema = new Schema({
    campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    ccId: { type: String, required: true },
    externalId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  isGmMade: { type: Boolean, required: true },
  isCampaignLocked: { type: Boolean, required: true },
});

export const Character = model('Character', characterSchema);