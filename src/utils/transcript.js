export function extractTranscriptDetails(transcriptRaw) {
  // Match for transcription, allowing for various formats
  const transcriptionMatch = transcriptRaw.match(
    /(?:^|\n)?(?:-\s*)?(?:\*\*\s*)?transcription(?:\s*\*\*)?:\s*["']?(.*?)["']?\s*(?=\n\s*(?:-\s*)?(?:\*\*\s*)?translation(?:\s*\*\*)?:|\s*$)/is
  );

  // Match for translation, ensuring it does not capture audio content
  const translationMatch = transcriptRaw.match(
    /(?:^|\n)?(?:-\s*)?(?:\*\*\s*)?translation(?:\s*\*\*)?:\s*["']?(.*?)["']?\s*(?=\n\s*(?:-\s*)?audio:|\s*$)/is
  );

  const transcription = (transcriptionMatch?.[1] || "").trim();
  const translation = (translationMatch?.[1] || "").trim();

  return {
    transcription,
    translation,
  };
}
