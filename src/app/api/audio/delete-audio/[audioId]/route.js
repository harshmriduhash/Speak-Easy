import { NextResponse } from "next/server";
import connectToDB from "@/lib/connectToDB";
import AudioFile from "@/models/AudioFile";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  const { userId } = await auth();

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized request" },
      { status: 401 }
    );
  }

  // Check if Cloudinary credentials are provided
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Cloudinary credentials not found" },
      { status: 500 }
    );
  }

  // Connect to the database
  await connectToDB();

  try {
    // Extract the audio ID from the params
    const audioId = (await params).audioId;

    // Check if audio ID is provided
    if (!audioId) {
      return NextResponse.json(
        { success: false, message: "Audio ID is required" },
        { status: 400 }
      );
    }

    // Decode the audio ID
    const decodedAudioId = decodeURIComponent(audioId);

    // Find the audio in the database using audioId
    const audio = await AudioFile.findById(decodedAudioId);

    // Check if audio is found
    if (!audio) {
      return NextResponse.json(
        { success: false, message: "Audio not found" },
        { status: 404 }
      );
    }

    // Delete the audio file from Cloudinary
    const deletedDubbedAudio = await cloudinary.uploader.destroy(
      audio?.dubbedAudioUrl?.public_id,
      {
        resource_type: "video",
      }
    );

    // Check if the audio file was successfully deleted from Cloudinary
    if (!deletedDubbedAudio || deletedDubbedAudio.result === "not found") {
      return NextResponse.json(
        { success: false, message: "Failed to delete audio file" },
        { status: 500 }
      );
    }

    // Delete the audio from the database
    const deletedAudio = await audio.deleteOne();

    // Check if the audio was successfully deleted
    if (!deletedAudio.deletedCount) {
      return NextResponse.json(
        { success: false, message: "Failed to delete audio" },
        { status: 500 }
      );
    }

    // Return a success response
    return NextResponse.json(
      { success: true, message: "Audio deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while deleting audio", error); // Log the error

    // Return an error response
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
