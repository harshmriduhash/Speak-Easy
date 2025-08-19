"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { LANGUAGES } from "@/constants";
import { cn } from "@/lib/utils";

export default function Translator({
  handleOnRecord,
  text,
  translation,
  isActive,
  language,
  setLanguage,
}) {
  return (
    <Card className="w-full max-w-lg mx-auto mt-12">
      <CardHeader>
        <CardTitle>AI Translator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                isActive ? "bg-red-500 animate-pulse" : "bg-gray-300"
              )}
            />
            <span className="text-sm text-gray-500">
              {isActive ? "Recording" : "Not recording"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={isActive ? "destructive" : "default"}
              onClick={handleOnRecord}
              className="w-full"
            >
              {isActive ? (
                <>
                  <StopCircle className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </>
              )}
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Spoken Text:</h3>
            <p className="p-2 bg-gray-100 rounded-md min-h-[2.5rem]">
              {text || "No text recorded yet"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Translation:</h3>
            <p className="p-2 bg-gray-100 rounded-md min-h-[2.5rem]">
              {translation || "No translation yet"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          Powered by AI - Translate to{" "}
          {LANGUAGES.find(({ value }) => value === language)?.label}
        </p>
      </CardFooter>
    </Card>
  );
}
