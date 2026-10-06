import { getSimilarEventsBySlug } from "@/actions/event.action";
import BookEvent from "@/components/BookEvent";
import EventAudience from "@/components/EventAudience";
import EventCard from "@/components/EventCard";
import EventDetailItem from "@/components/EventDetailItem";
import EventTags from "@/components/EventTags";
import { Event } from "@/models/event.model";
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

async function EventDetails({ params }: { params: Promise<string> }) {
  "use cache";
  cacheLife("hours");

  const slug = await params;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await axios.get<ApiResponse>(
    `${BASE_URL}/api/events/${slug}`,
  );

  const event = response.data.event;

  if (!event) return notFound();

  const similarEvents: Event[] = await getSimilarEventsBySlug(event.slug);

  const bookings = 10;
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={event.img}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex flex-col gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              src="/icons/calendar.svg"
              alt="calendar"
              label={event.date}
            />

            <EventDetailItem
              src="/icons/clock.svg"
              alt="clock"
              label={event.time}
            />

            <EventDetailItem
              src="/icons/pin.svg"
              alt="pin"
              label={event.location}
            />

            <EventDetailItem
              src="/icons/mode.svg"
              alt="mode"
              label={event.mode}
            />
            <EventAudience
              src="/icons/audience.svg"
              alt="audience"
              label={JSON.parse(event.audience[0])}
            />
          </section>

          <section>
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>

          <EventTags tags={event.tags} />
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Bee the first to book your spot!</p>
            )}

            <BookEvent eventId={event._id.toString()} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex flex-col gap-4 w-full pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((e: Event) => (
              <EventCard
                key={e.slug}
                date={e.date}
                img={e.img}
                location={e.location}
                slug={e.slug}
                time={e.time}
                title={e.title}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
