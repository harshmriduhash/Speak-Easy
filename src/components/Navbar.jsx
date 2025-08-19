"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Headphones, AudioLines, Mic, ListMusic, Captions } from "lucide-react";
import { ROUTES } from "@/constants";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (route) => pathname === route;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="flex items-center">
              <Headphones className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Speak Easy</span>
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="ml-10 flex justify-between items-center space-x-4">
              <Link
                href={ROUTES.AUDIO_FORM}
                title="Audio Form"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(ROUTES.AUDIO_FORM)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500"
                }`}
              >
                <Mic className="inline-block mb-1 h-6 w-6" />
              </Link>
              <Link
                href={ROUTES.MY_AUDIOS}
                title="My Audios"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(ROUTES.MY_AUDIOS)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500"
                }`}
              >
                <ListMusic className="inline-block mb-1 h-6 w-6" />
              </Link>
              <Link
                href={ROUTES.AUDIO_TRANSCRIPTION}
                title="Audio Transcription"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(ROUTES.AUDIO_TRANSCRIPTION)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500"
                }`}
              >
                <Captions className="inline-block mb-1 h-6 w-6" />
              </Link>
              <Link
                href={ROUTES.TRANSLATOR}
                title="Translator"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(ROUTES.TRANSLATOR)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500"
                }`}
              >
                <AudioLines className="inline-block mb-1 h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <SignInButton>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
