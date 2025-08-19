"use client";

import { useCallback, useEffect, useState } from "react";
import MyAudioShimmerUI from "@/components/MyAudioShimmerUI";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import MyAudios from "../presentation/MyAudios";

export default function MyAudiosContainer() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [audioToDeleteId, setAudioToDeleteId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/audio/get-audios");

      if (response?.data?.success) {
        toast({
          title: response?.data?.message || "Audios fetched successfully",
        });
        setAudioFiles(response?.data?.audios);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAudio = async (audioId) => {
    setIsDeleting(true);

    try {
      const response = await axios.delete(`/api/audio/delete-audio/${audioId}`);

      if (response?.data?.success) {
        toast({
          title: response?.data?.message || "Audio deleted successfully",
        });
        setShowDialog(false);
        setAudioFiles((prevAudio) =>
          prevAudio.filter((audio) => audio._id !== audioId)
        );
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Failed to delete audio",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <MyAudioShimmerUI />;
  }
  return (
    <MyAudios
      audioFiles={audioFiles}
      isLoading={isLoading}
      isDeleting={isDeleting}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      deleteAudio={deleteAudio}
      setAudioToDeleteId={setAudioToDeleteId}
      audioToDeleteId={audioToDeleteId}
    />
  );
}
