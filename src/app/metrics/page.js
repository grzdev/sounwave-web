"use client";

import React, { useState } from "react";
import SpotifyAuths from "../components/spotifyAuths";
import Navbar from "../components/navbar";
import Image from "next/image";
import Genre1 from "../assets/images/genre1.JPG";
import Genre2 from "../assets/images/genre2.JPG";
import Genre3 from "../assets/images/genre3.JPG";
import Genre4 from "../assets/images/genre4.JPG";
import Genre5 from "../assets/images/genre5.JPG";

function Metrics() {
  const [spotifyData, setSpotifyData] = useState(null);
  const genreImages = [Genre1, Genre2, Genre3, Genre4, Genre5];

  const shuffledImages = [...genreImages].sort(() => Math.random() - 0.5);

  return (
    <div className="bg-black text-white w-full py-[2rem] flex flex-col">
      {/* Page Header */}
      <div className="flex items-center justify-center">
        <h1 className="text-center text-[2rem] md:text-[3rem] font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
          Your metrics
        </h1>
      </div>

      {/* Top Tracks Section */}
      {spotifyData ? (
        <div className="flex flex-col gap-[3rem] mt-[2rem] mb-[8rem] px-[2rem] md:px-[4rem]">
          <div className="flex w-full flex-col">
            <h1 className="text-[1.5rem] md:text-[1.8rem] text-start font-bold">
              Top Songs
            </h1>
            <p className="text-[1rem] md:text-[1.2rem] font-semibold text-gray-300">
              Your top songs from the past month
            </p>

            {/* Map Top Tracks */}
            <div className="flex flex-row gap-[1rem] mt-[1.5rem] overflow-x-auto">
              {spotifyData.topTracks.map((track, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start w-[11rem] shrink-0"
                >
                  <Image
                    src={track.albumCover}
                    alt={`${track.name} album cover`}
                    width={160}
                    height={160}
                    className="rounded-xl"
                  />
                  <h1 className="text-[1.1rem] font-bold">{track.name}</h1>
                  <h2 className="text-[0.9rem] text-gray-300 font-bold">
                    {track.artists.join(", ")}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col">
            <h1 className="text-[1.5rem] md:text-[1.8rem] text-start font-bold">
              Top Artists
            </h1>
            <p className="text-[1rem] md:text-[1.2rem] font-semibold text-gray-300">
              Your most listened to artists from the past month
            </p>

            {/* Map Top Tracks */}
            <div className="flex flex-row gap-[1rem] mt-[1.5rem] overflow-x-auto">
              {spotifyData.topArtists.map((artist, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start w-[11rem] gap-[1rem] shrink-0"
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={200}
                    height={200}
                    className="rounded-xl"
                  />
                  <h1 className="text-[1.1rem] font-bold">{artist.name}</h1>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col">
            <h1 className="text-[1.5rem] md:text-[1.8rem] text-start font-bold">
              Recently Played Songs
            </h1>
            <p className="text-[1rem] md:text-[1.2rem] font-semibold text-gray-300">
              Songs you played recently
            </p>

            {/* Map Top Tracks */}
            <div className="flex flex-row gap-[1rem] mt-[1.5rem] overflow-x-auto">
              {spotifyData.recentlyPlayed.map((track, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start w-[11rem] gap-[0.5rem] shrink-0"
                >
                  <Image
                    src={track.albumCover}
                    alt={`${track.name} album cover`}
                    width={160}
                    height={160}
                    className="rounded-xl"
                  />
                  <h1 className="text-[1.1rem] font-bold">{track.name}</h1>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col">
            <h1 className="text-[1.5rem] md:text-[1.8rem] text-start font-bold">
              Top Genres
            </h1>
            <p className="text-[1rem] md:text-[1.2rem] font-semibold text-gray-300">
              The genres you resonate with the most
            </p>

            {/* Map Top Tracks */}
            <div className="flex flex-row gap-[1.5rem] mt-[1.5rem] overflow-x-auto">
              {spotifyData.topGenres.map((genre, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start w-[11rem] gap-[1rem] shrink-0"
                >
                  <Image
                    src={shuffledImages[index % shuffledImages.length]}
                    alt={`${genre}`}
                    className="w-[10rem] h-[12rem] rounded-xl"
                  />
                  <h1 className="text-[1.1rem] font-bold">
                    {genre
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <SpotifyAuths onDataFetched={setSpotifyData} />
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
