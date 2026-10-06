import connectDB from "@/lib/mongodb";
import { EventModel } from "@/models/event.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  await connectDB();

  try {
    const event = await EventModel.findOne({ slug: slug });

    if (!event) {
      return NextResponse.json({ message: "Event Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event Fetched Successfully", event },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong while fetching event", error },
      { status: 500 },
    );
  }
}
