"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import posthog from "posthog-js";
import { posthogLogger } from "@/lib/posthog-logger";

interface Props {
  title: string;
  img: string;
  slug: string;
  location: string;
  time: string;
  date: string;
}

function EventCard({ title, img, date, location, slug, time }: Props) {
  const handleEventSelection = () => {
    if (
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      posthog.capture("event_card_selected", { event_slug: slug });
      posthogLogger.info("Featured event selected", { event_slug: slug });
    }
  };

  return (
    <Link href={`/event/${slug}`} id="event-card" onClick={handleEventSelection}>
      <Image
        src={img}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />

      <div className="flex flex-row gap-2">
        <Image src={"/icons/pin.svg"} alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>

      <p className="title">{title}</p>

      <div className="datetime">
        <div className="">
          <Image
            src={"/icons/calendar.svg"}
            alt="date"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>

        <div className="">
          <Image
            src={"/icons/clock.svg"}
            alt="time"
            width={14}
            height={14}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
