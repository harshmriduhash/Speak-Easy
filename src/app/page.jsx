"use client";

import { useState } from "react";
import { Music } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl min-h-screen flex flex-col justify-start w-full space-y-12 text-center mt-12">
        <div className="space-y-6">
          <Music className="w-16 h-16" />
          <h1 className="text-5xl font-bold">Welcome to Speak Easy</h1>
          <p className="text-2xl">
            Transform your speech into eloquent responses with AI-powered
            conversion.
          </p>
        </div>

        <div className="pt-8">
          <button
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
              router.push("/audio-form");
            }}
            className={`
              px-8 py-4 rounded-full transition-all duration-300 text-xl font-semibold
              ${
                isHovering
                  ? "bg-white text-purple-600 shadow-lg transform scale-105"
                  : "bg-purple-600 text-white border-2 border-white"
              }
            `}
          >
            {isHovering ? "Let's Get Started!" : "Try Speak Easy Now"}
          </button>
        </div>
      </main>
    </div>
  );
}
