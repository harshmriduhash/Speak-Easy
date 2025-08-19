import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

export default function AudioFormResponseShimmer() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 animate-pulse">
          Processing Your Request
        </h1>
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <Music className="mr-2 animate-bounce" />
              <div className="h-8 bg-white bg-opacity-20 rounded w-1/2 animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6 space-y-6">
            <div className="text-center text-lg font-medium text-gray-600 mb-4">
              Please wait, we are processing your request...
            </div>
            <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mt-2 animate-pulse"></div>
              </div>
            ))}
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
              <div className="flex space-x-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded w-24 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
