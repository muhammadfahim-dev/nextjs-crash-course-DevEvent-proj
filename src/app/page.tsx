import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { Event } from "@/models/event.model";
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { cacheLife } from "next/cache";

const page = async () => {
  "use cache"
  cacheLife("hours")
  
  const response = await axios.get<ApiResponse>(
    "http://localhost:3000/api/events",
  );
  const events = response.data.events;
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups and conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events list-none">
          {events &&
            events.length > 0 &&
            events.map((event: Event, i) => (
              <li key={i}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
