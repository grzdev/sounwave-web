import React from "react";

function SongInfo({ songName, artistName, onSearchAgain }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <h2 className="text-white text-2xl font-bold">{songName}</h2>
        <p className="text-white text-lg">{artistName}</p>
      </div>
      {/* Button to search for another song */}
      <button
        onClick={onSearchAgain}
        className="mt-4 text-white bg-blue-500 px-4 py-2 rounded"
      >
        Search Another Song
      </button>
    </div>
  );
}

export default SongInfo;
