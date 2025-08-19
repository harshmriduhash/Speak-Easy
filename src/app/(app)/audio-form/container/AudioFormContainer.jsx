"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "@uploadcare/upload-client";
import axios from "axios";
import AudioForm from "../presentation/AudioForm";
import { useToast } from "@/hooks/use-toast";

export default function AudioFormContainer() {
  const [isUploadingAudioFile, setIsUploadingAudioFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const audioFile = watch("audioFile");

  useEffect(() => {
    if (audioFile) {
      uploadFiletoUploadcare(audioFile);
    }
  }, [audioFile]);

  const onSubmit = async (data) => {
    // Handle form submission here
    setIsSubmitting(true);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", data.audioFile[0]);
      formData.append("language", data.targetLanguage);

      const response = await axios.post("/api/audio/send-audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        setResponseData(response?.data?.audioFile);
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const uploadFiletoUploadcare = async (fileData) => {
    if (!fileData.length) {
      return;
    }
    const acceptedFormats = ["audio/mp3", "audio/wav", "audio/mpeg"];

    if (!acceptedFormats.includes(fileData[0]?.type)) {
      toast({
        title: "Only .mp3 and .wav files are allowed",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingAudioFile(true);
    try {
      await uploadFile(fileData[0], {
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY, // public key
        store: "auto", // store the file in the uploadcare storage
      });
    } catch (error) {
      toast({
        title: "This File is not supported",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAudioFile(false);
    }

    setIsUploadingAudioFile(false);
  };

  return (
    <AudioForm
      loading={loading}
      responseData={responseData}
      isUploadingAudioFile={isUploadingAudioFile}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      setResponseData={setResponseData}
      register={register}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
}
