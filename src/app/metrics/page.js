"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import TopTracks from "../components/topTracks";
import TopArtists from "../components/topArtists";
import RecentlyPlayed from "../components/recentlyPlayed";
import TopGenres from "../components/topGenres";
import Loader from "../components/loader";
import Image from "next/image";

const API_ENDPOINT = process.env.NEXT_PUBLIC_SPOTIFY_API_ENDPOINT;

function Metrics() {
  const [spotifyData, setSpotifyData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with the loader
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Extract and validate the access token
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("spotify_access_token", token); // Save for reuse
      setAccessToken(token);
      window.location.hash = ""; // Clean up the URL
    } else {
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        setLoading(false); // Stop loader and show error
      }
    }
  }, []);

  useEffect(() => {
    // Load user info from localStorage
    const savedUser = localStorage.getItem("spotify_user");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  // Fetch Spotify data
  useEffect(() => {
    const fetchSpotifyData = async () => {
      if (!accessToken) return;

      try {
        const fetchFromSpotify = async (endpoint) => {
          const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
          return await response.json();
        };

        const [recentlyPlayed, topTracks, topArtists] = await Promise.all([
          fetchFromSpotify("/me/player/recently-played?limit=5"),
          fetchFromSpotify("/me/top/tracks?time_range=short_term&limit=5"),
          fetchFromSpotify("/me/top/artists?limit=5"),
        ]);

        setSpotifyData({
          recentlyPlayed: recentlyPlayed.items.map((item) => ({
            name: item.track.name,
            albumCover: item.track.album.images[0]?.url,
          })),
          topTracks: topTracks.items.map((track) => ({
            name: track.name,
            albumCover: track.album.images[0]?.url,
            artists: track.artists.map((artist) => artist.name),
          })),
          topArtists: topArtists.items.map((artist) => ({
            name: artist.name,
            image: artist.images[0]?.url,
          })),
          topGenres: topArtists.items
            .flatMap((artist) => artist.genres)
            .slice(0, 5),
        });

        setLoading(false); // Stop the loader after data loads
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
        localStorage.removeItem("spotify_access_token");
        setAccessToken(null);
        setLoading(false); // Stop the loader and show error
      }
    };

    fetchSpotifyData();
  }, [accessToken]);

  return (
    <div className="bg-black text-white w-full py-[2rem] flex flex-col md:overflow-x-hidden md:justify-center md:items-center">
      <div className="flex items-center justify-center w-full md:w-[70rem]">
        {userInfo && (
          <div className="flex w-full justify-between items-center px-[1rem] md:px-[3rem]">
            <Image
              src={userInfo.images?.[0]?.url || "/default-profile.png"}
              alt="Profile"
              className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-full"
              width={70}
              height={60}
              cl
            />
            <h1 className="text-center text-[1.7rem] md:text-[2.5rem] font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
              {userInfo.display_name || "Your"}&apos;s metrics
            </h1>
          </div>
        )}
      </div>
      {loading ? (
        <div className="w-full flex px-[1rem] py-[2rem] md:px-[8rem] md:py-[3rem]">
          <Loader />
        </div>
      ) : spotifyData ? (
        <div className="flex flex-col gap-[2rem] mt-[2rem] md:mt-[4rem] mb-[8rem] px-[1rem] md:px-[14rem]">
          <TopTracks topTracks={spotifyData.topTracks} />
          <TopArtists topArtists={spotifyData.topArtists} />
          <RecentlyPlayed recentlyPlayed={spotifyData.recentlyPlayed} />
          <TopGenres topGenres={spotifyData.topGenres} />
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-center text-white text-lg">
            Something went wrong. Please log in again from the home page.
          </p>
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
