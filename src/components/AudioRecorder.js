import React, { useState } from "react";

function AudioRecorder({ setSongName, setArtistName, setIsIdentifying }) {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  let recordedChunks = [];

  const handleRecording = async () => {
    recordedChunks = [];
    setIsCancelled(false); // Reset cancel flag when recording starts

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = function (event) {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    recorder.onstop = function () {
      if (!isCancelled) {
        const audioBlob = new Blob(recordedChunks, { type: "audio/m4a" });
        setIsIdentifying(true);
        sendAudioToShazam(audioBlob);
      }
    };

    recorder.start();
    console.log("Recording started for 5 seconds...");

    setTimeout(() => {
      if (!isCancelled) {
        recorder.stop();
        console.log("Recording stopped");
      }
    }, 5000);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsCancelled(true); // Mark as cancelled
    setIsIdentifying(false);
    setSongName("");
    setArtistName("");
  };

  const sendAudioToShazam = (audioBlob) => {
    if (isCancelled) return; // Prevent sending data if cancelled

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE && !isCancelled) {
        const jsonResponse = JSON.parse(this.responseText);
        const track = jsonResponse.track;
        if (track) {
          setSongName(track.title);
          setArtistName(track.subtitle);
        } else {
          setSongName("Unknown");
          setArtistName("Unknown");
        }
        setIsIdentifying(false);
      }
    });

    xhr.open("POST", "https://shazam-song-recognition-api.p.rapidapi.com/recognize/file");
    xhr.setRequestHeader("x-rapidapi-key", "d7bafe6af8mshe280881b9373239p15fbc5jsnc3158f35f157");
    xhr.setRequestHeader("x-rapidapi-host", "shazam-song-recognition-api.p.rapidapi.com");
    xhr.setRequestHeader("Content-Type", "application/octet-stream");

    const reader = new FileReader();
    reader.onload = function (e) {
      xhr.send(e.target.result);
    };
    reader.readAsArrayBuffer(audioBlob);
  };

  return { handleRecording, stopRecording };
}

export default AudioRecorder;
