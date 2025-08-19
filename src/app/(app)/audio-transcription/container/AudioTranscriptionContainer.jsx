"use client";

import { useState } from "react";
import axios from "axios";
import AudioTranscription from "../presentation/AudioTranscription";

export default function AudioTranscriptionContainer() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setResult(null);

    const file = data.audioFile[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/transcribe-audio", formData);

      if (response?.data?.success) {
        setResult({
          transcription: response?.data?.transcription?.text,
          translation: response?.data?.translation?.text,
        });
      }
    } catch (error) {
      setResult({
        transcription: "Error processing audio. Please try again.",
        translation: "Error processing audio. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AudioTranscription
      onSubmit={onSubmit}
      isLoading={isLoading}
      result={result}
    />
  );
}
