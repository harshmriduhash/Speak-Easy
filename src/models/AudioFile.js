import mongoose from "mongoose";

const audioFileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    dubbedAudioUrl: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    transcription: {
      type: String,
      required: [true, "Transcription is required"],
      trim: true,
    },
    translation: {
      type: String,
      required: [true, "Transcription is required"],
      trim: true,
    },
    benchmark: {
      rouge1: {
        type: Number,
        default: 0,
      },
      rougeL: {
        type: Number,
        default: 0,
      },
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const AudioFile =
  mongoose.models.AudioFile || mongoose.model("AudioFile", audioFileSchema);

export default AudioFile;
