import React, { useEffect, useState } from "react";

const SpeechRecognitionComponent: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    let recognition: SpeechRecognition | undefined;

    const startRecognition = () => {
      recognition = new window.SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onresult = (event) => {
        const interimTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        setTranscript(interimTranscript);
      };

      recognition.start();
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    if (isRecording) {
      startRecognition();
      console.log(transcript);
    } else {
      stopRecognition();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isRecording]);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        width: "100%",
        height: "400px",
      }}
    >
      <p>{transcript}</p>
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default SpeechRecognitionComponent;
