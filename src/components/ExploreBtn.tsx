"use client";

import Image from "next/image";
import posthog from "posthog-js";
import { posthogLogger } from "@/lib/posthog-logger";

function ExploreBtn() {
  const handleExplore = () => {
    if (
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      posthog.capture("event_catalogue_explored");
      posthogLogger.info("Event catalogue exploration requested", {
        surface: "hero",
      });
    }

    console.log("CLICK");
  };

  return (
    <button
      id="explore-btn"
      type="button"
      className="mt-7 mx-auto "
      onClick={handleExplore}
    >
      <a href="#events">Explore Events</a>
      <Image src={"/icons/arrow-down.svg"} alt="arrow-down" width={24} height={24} className="ml-2"/>
    </button>
  );
}

export default ExploreBtn;
