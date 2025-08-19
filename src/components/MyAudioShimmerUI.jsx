import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Music } from "lucide-react";

function ShimmerCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center">
          <Music className="mr-2" />
          <div className="h-6 bg-white bg-opacity-20 rounded w-1/2 animate-pulse"></div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyAudioShimmerUI() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5 mx-5">
      {[...Array(6)].map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
}
