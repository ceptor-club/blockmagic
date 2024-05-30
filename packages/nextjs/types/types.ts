import { User as NextAuthUser } from "next-auth";

export interface User extends NextAuthUser {
  ccId?: string; // Add the ccId property as optional
}

export interface World {
  _id: string;
  externalId: string;
  name: string;
  description: string;
  vibe: string;
  ccId: string;
  permissions?: string[];
}

export interface Campaign {
  _id: string;
  externalId: string;
  name: string;
  description: string;
  worldId: string;
  ccId: string;
  numCharacters: number;
  numGmMadeCharacters: number;
  numPlayerMadeCharacters: number;
  sessionZero: boolean;
  frequency: "one_shot" | "regular_cadence" | "custom_cadence";
  scheduledSessions: Date[];
  permissions?: string[];
  notifications?: string[];
}

export interface Character {
  _id: string;
  externalId: string;
  name: string;
  campaignId: string;
  class: string;
  race: string;
  description: string;
  createdBy: string;
  isGmMade: boolean;
  isCampaignLocked: boolean;
  permissions?: string[];
}

export interface Session {
  _id: string;
  externalId: string;
  sessionNumber: number;
  date: Date;
  description?: string;
  characters: Character[];
  permissions?: string[];
}
