"use client";

import { createBooking } from "@/actions/booking.action";
import { posthog } from "posthog-js";
import React, { useState } from "react";

function BookEvent({ eventId, slug }: { eventId: string; slug: string }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setIsSubmitted(true);

      posthog.capture("event_booked", {eventId, slug, email})
    } else {
      console.error("Booking creation failed");

      posthog.captureException("Booking creation failed")
    }
  };

  return (
    <div className="book-event">
      {isSubmitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email Address"
              className="text-sm border border-gray-700 outline-none bg-transparent p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="button-submit text-sm bg-blue-700 px-5 py-1.5 rounded border-none cursor-pointer mt-4 hover:bg-blue-600 duration-200"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default BookEvent;
