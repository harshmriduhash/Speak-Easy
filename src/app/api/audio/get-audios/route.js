import { NextResponse } from "next/server";
import connectToDB from "@/lib/connectToDB";
import AudioFile from "@/models/AudioFile";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized request" },
      { status: 401 }
    );
  }

  // Connect to the database
  await connectToDB();

  try {
    // Fetch audios for the authenticated user
    const audios = await AudioFile.find({ userId });

    // If no audios are found, return an empty array
    if (!audios.length) {
      return NextResponse.json(
        { success: true, message: "No audio found", audios: [] },
        { status: 200 }
      );
    }

    // Return the audios
    return NextResponse.json(
      { success: true, message: "Audios fetched successfully", audios },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while fetching audios", error); // Log the error

    // Handle any errors that occur during the process
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
