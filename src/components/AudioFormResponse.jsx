import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";
import { LANGUAGES } from "@/constants";

export default function AudioFormResponse({ data }) {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Audio Processing Result
        </h1>
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <Music className="mr-2" />
              Audio Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Processed Audio</h3>
              <audio
                src={data?.dubbedAudioUrl?.url}
                controls
                className="w-full mb-4"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">
                Original Transcription
              </h3>
              <p className="text-sm text-gray-700">{data?.transcription}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">
                Translation (
                {LANGUAGES.find(({ value }) => value === data?.language)?.label}
                )
              </h3>
              <p className="text-sm text-gray-700">{data?.translation}</p>
            </div>
            {Boolean(data?.benchmark?.blue) && (
              <div>
                <h3 className="text-lg font-medium mb-2">Benchmark Scores</h3>
                <div className="flex space-x-4">
                  <Badge variant="secondary" className="text-lg py-1 px-3">
                    BLEU: {data.benchmark.bleu}
                  </Badge>
                  <Badge variant="secondary" className="text-lg py-1 px-3">
                    ROUGE: {data.benchmark.rouge}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
