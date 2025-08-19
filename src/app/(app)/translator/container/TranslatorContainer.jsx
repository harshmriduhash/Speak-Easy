"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Translator from "../presentation/Translator";

export default function TranslatorContainer() {
  const recognitionRef = useRef();
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [voices, setVoices] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [language, setLanguage] = useState("hi-IN");

  const availableVoices = voices?.filter(({ lang }) => lang === language);

  const activeVoices =
    availableVoices?.find(({ name }) => name.includes("Google")) ||
    availableVoices?.find(({ name }) => name.includes("Luciana")) ||
    availableVoices?.[0];

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();

    if (Array.isArray(voices) && voices.length > 0) {
      setVoices(voices);
      return;
    }

    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        setVoices(voices);
      };
    }
  }, []);

  function handleOnRecord() {
    if (isActive) {
      recognitionRef?.current?.stop();
      setIsActive(false);
      return;
    }

    speak(" ");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.onstart = function () {
      setIsActive(true);
    };

    recognitionRef.current.onend = function () {
      setIsActive(false);
    };

    recognitionRef.current.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      setText(transcript);

      const response = await axios.post("/api/translate", {
        text: transcript,
        language,
      });

      setTranslation(response?.data?.text);

      speak(response?.data?.text);
    };

    recognitionRef.current.start();
  }

  function speak(text) {
    if (!activeVoices) return;

    const utterence = new SpeechSynthesisUtterance(text);

    window.speechSynthesis.getVoices();

    utterence.voice = activeVoices;

    window.speechSynthesis.speak(utterence);
  }

  return (
    <Translator
      handleOnRecord={handleOnRecord}
      text={text}
      translation={translation}
      isActive={isActive}
      language={language}
      setLanguage={setLanguage}
    />
  );
}
