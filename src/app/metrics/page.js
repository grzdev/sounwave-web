"use client";

import React, { useState } from "react";
import SpotifyAuths from "../components/spotifyAuths";
import Navbar from "../components/navbar";
import TopTracks from "../components/topTracks";
import TopArtists from "../components/topArtists";
import RecentlyPlayed from "../components/recentlyPlayed";
import TopGenres from "../components/topGenres";
import Loader from "../components/loader";

function Metrics() {
  const [spotifyData, setSpotifyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDataFetched = (data) => {
    setSpotifyData(data);
    setLoading(false); // Stop showing the loader when data is fetched
  };

  const handleAuthClick = () => {
    setLoading(true); // Show the loader when the SpotifyAuths button is clicked
  };

  return (
    <div className="bg-black text-white w-full py-[2rem] flex flex-col">
      {/* Page Header */}
      <div className="flex items-center justify-center">
        <h1 className="text-center text-[2rem] md:text-[3rem] font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
          Your metrics
        </h1>
      </div>

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : spotifyData ? (
        <div className="flex flex-col gap-[2rem] mt-[2rem] mb-[8rem] px-[1rem] md:px-[4rem]">
          <TopTracks topTracks={spotifyData.topTracks} />
          <TopArtists topArtists={spotifyData.topArtists} />
          <RecentlyPlayed recentlyPlayed={spotifyData.recentlyPlayed} />
          <TopGenres topGenres={spotifyData.topGenres} />
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <SpotifyAuths
            onDataFetched={handleDataFetched}
            onAuthClick={handleAuthClick}
          />
        </div>
      )}

      {/* Navbar */}
      <div className="fixed bottom-0 flex justify-center items-center w-full z-50">
        <Navbar />
      </div>
    </div>
  );
}

export default Metrics;
