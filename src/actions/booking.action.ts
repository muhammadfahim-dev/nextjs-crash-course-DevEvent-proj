"use server";

import { BookingModel } from "@/models/booking.model";

export async function createBooking({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) {
  try {
    await BookingModel.create({ eventId, slug, email });

    
    return { success: true };
  } catch (error) {
    console.error("creaing Event Fialed", error);
    return { success: false };
  }
}
