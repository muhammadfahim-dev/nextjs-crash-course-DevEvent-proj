import { getSimilarEventsBySlug } from "@/actions/event.action";
import BookEvent from "@/components/BookEvent";
import EventAudience from "@/components/EventAudience";
import EventCard from "@/components/EventCard";
import EventDetailItem from "@/components/EventDetailItem";
import EventDetails from "@/components/EventDetails";
import EventTags from "@/components/EventTags";
import { Event } from "@/models/event.model";
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const slug = params.then(p => p.slug)

  return(
    <main>
      <Suspense fallback={<div>Loading ...</div>}>
        <EventDetails params={slug}/>
      </Suspense>
    </main>
  )
  
}

export default EventDetailsPage;
