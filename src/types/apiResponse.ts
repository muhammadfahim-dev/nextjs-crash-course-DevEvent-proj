import { Event } from "@/models/event.model";

export type ApiResponse = {
  message: string;
  error?: string;
  events?: Event[];
  event?: Event;
};
