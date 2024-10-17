"use client";

import AudioRecorder from "@/components/AudioRecorder";
import RecordingButton from "@/components/RecordingButton";
import SongInfo from "@/components/SongDiv";
import React, { useState } from "react";

function Lysa() {
  const [icon, setIcon] = useState("lucide:ear");
  const [isPulsating, setIsPulsating] = useState(false);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");

  const { handleRecording, stopRecording } = AudioRecorder({
    setSongName,
    setArtistName,
    setIsIdentifying,
  });

  const handleClick = () => {
    setIcon("grommet-icons:assist-listening");
    setIsPulsating(true);
    handleRecording();
  };

  const handleCancel = () => {
    stopRecording(); 
    setIsPulsating(false);
    setIcon("lucide:ear");
  };

  const handleSearchAgain = () => {
    setSongName("");
    setArtistName("");
    setIsPulsating(false);
    setIcon("lucide:ear");
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(0deg, rgba(0,118,163,1) 0%, rgba(0,158,218,1) 100%)",
      }}
    >
      {!songName ? (
        <>
          <RecordingButton
            icon={icon}
            isPulsating={isPulsating || isIdentifying}
            onClick={handleClick}
          />
          {/* {isIdentifying && (
            <button
              onClick={handleCancel}
              className="mt-4 text-white bg-red-500 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )} */}
        </>
      ) : (
        <SongInfo
          songName={songName}
          artistName={artistName}
          onSearchAgain={handleSearchAgain}
        />
      )}
    </div>
  );
}

export default Lysa;
