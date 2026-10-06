import mongoose, { Document, Schema } from "mongoose";

export interface Booking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  slug: string;
}

export const bookingSchema = new Schema<Booking>(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventModel",
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const BookingModel =
  mongoose.models.BookingModel ||
  mongoose.model<Booking>("BookingModel", bookingSchema);
