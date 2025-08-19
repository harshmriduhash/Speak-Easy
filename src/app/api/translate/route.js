import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { userId } = await auth();

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized request" },
      { status: 401 }
    );
  }

  try {
    // Extract the text and language from the request
    const { text, language } = await request.json();

    // Check if text and language are provided
    if (!text || !language) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Translate the text using the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
            You will be provided with a sentence. Your tasks are to:
            - Detect what language the sentence is in
            - Translate the sentence into ${language}
            Do not return anything other than the translated sentence.
          `,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    // Check if translation was successful
    if (!response.choices[0].message.content) {
      return NextResponse.json(
        { success: false, message: "Error in translation" },
        { status: 500 }
      );
    }

    // Return the translated text
    return NextResponse.json({
      text: response.choices[0].message.content,
      response,
    });
  } catch (error) {
    console.error("Error translating text:", error); // Log the error
    return NextResponse.json(
      { success: false, message: "Error translating text" },
      { status: 500 }
    );
  }
}
