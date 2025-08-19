"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Music, Calendar, Trash2 } from "lucide-react";
import MyAudioShimmerUI from "@/components/MyAudioShimmerUI";
import { LANGUAGES } from "@/constants";

export default function MyAudios({
  audioFiles,
  isLoading,
  isDeleting,
  showDialog,
  setShowDialog,
  deleteAudio,
  setAudioToDeleteId,
  audioToDeleteId,
}) {
  if (isLoading) {
    return <MyAudioShimmerUI />;
  }
  return (
    <div className="my-5 mx-5">
      {audioFiles?.length === 0 ? (
        <div className="flex justify-center w-full">
          <p className="text-2xl font-bold">No audios found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audioFiles.map((audio) => (
            <Card key={audio._id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center">
                    <Music className="mr-2" />
                    <p className="text-lg">Audio</p>
                  </div>
                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-red-200"
                        onClick={() => {
                          setAudioToDeleteId(audio._id);
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Delete audio</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to delete this audio?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete the audio file and all associated data.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button">Close</Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={() => deleteAudio(audioToDeleteId)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <audio
                    src={audio?.dubbedAudioUrl?.url}
                    controls
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      {
                        LANGUAGES.find((lang) => lang.value === audio?.language)
                          ?.label
                      }
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(audio?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Transcription</h3>
                  <p className="text-sm text-gray-700 line-clamp-5">
                    {audio?.transcription}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Translation</h3>
                  <p className="text-sm text-gray-700 line-clamp-5">
                    {audio?.translation}
                  </p>
                </div>
                {Boolean(audio?.benchmark?.bleu) && (
                  <div className="flex space-x-2">
                    <Badge variant="secondary">
                      BLEU: {audio?.benchmark?.bleu}
                    </Badge>
                    <Badge variant="secondary">
                      ROUGE: {audio?.benchmark?.rouge}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
