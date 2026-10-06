import connectDB from "@/lib/mongodb";
import { EventModel } from "@/models/event.model";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        { message: "Invaild JSON format data" },
        { status: 400 },
      );
    }

    const tags = JSON.parse(formData.get("tags") as string)

    const file = formData.get("img") as File;
    if (!file)
      return NextResponse.json(
        { message: "image is missing" },
        { status: 400 },
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadFile = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "Events",
            },
            (err, result) => {
              if (err) return reject(err);

              resolve(result!);
            },
          )
          .end(buffer);
      },
    );

    event.img = uploadFile.secure_url;

    const createdEvent = await EventModel.create({...event, tags: tags});

    return NextResponse.json(
      {
        message: "Event Created successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await EventModel.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "events fetched succesfully", events },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error with fetching Events", error },
      { status: 500 },
    );
  }
}
