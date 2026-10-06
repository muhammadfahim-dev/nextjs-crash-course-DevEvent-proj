// actions/event.actions.ts

"use server";

import connectDB from "@/lib/mongodb";
import { EventModel } from "@/models/event.model";

export async function getEvents() {
  await connectDB();

  const events = await EventModel.find().sort({ createdAt: -1 }).lean();

  return events.map((event) => ({
    ...event,
    _id: event._id.toString(),
  }));
}
