"use server";

import connectDB from "@/lib/mongodb";
import { EventModel } from "@/models/event.model";

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();
    const event = await EventModel.findOne({ slug }).lean();

    if (!event) return [];

    const similarEvents = await EventModel.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    return similarEvents;
  } catch (error) {
    return [];
  }
}
