import mongoose, { Document, Schema } from "mongoose";

export interface Event extends Document {
  title: string;
  slug: string;
  description: string;
  img: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string[];
  organizer: string;
  tags: string[];
}

export const eventSchema = new Schema<Event>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    audience: {
      type: [String],
      default: [],
    },
    organizer: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const EventModel =
  mongoose.models.EventModel ||
  mongoose.model<Event>("EventModel", eventSchema);
