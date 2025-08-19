"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AudioTranscription({ onSubmit, isLoading, result }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Audio Transcription and Translation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="file"
                accept="audio/*"
                {...register("audioFile", {
                  required: "Please upload an audio file",
                  validate: (value) => {
                    if (value.size > 5 * 1024 * 1024) {
                      return "File size must be less than 5MB";
                    }
                    return true;
                  },
                })}
              />
              {errors.audioFile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.audioFile.message}
                </p>
              )}
            </div>
            <div className="flex space-x-4 items-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Transcribe & Translate"}
              </Button>
            </div>
          </form>
          {result && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Transcription:</h3>
                <Textarea
                  value={result.transcription}
                  readOnly
                  className="w-full h-32"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Translation:</h3>
                <Textarea
                  value={result.translation}
                  readOnly
                  className="w-full h-32"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
