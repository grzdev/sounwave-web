"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const CLIENT_ID = "5bcca6b883264779b8d171252699e684";
const REDIRECT_URI = "http://localhost:3000/metrics"; // Adjust based on your Next.js app URL
const SCOPES = "user-read-recently-played user-top-read";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const API_ENDPOINT = "https://api.spotify.com/v1";

function SpotifyAuths({ onDataFetched }) {
  const [accessToken, setAccessToken] = useState("");

  // Extract the token from the URL
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
      window.location.hash = ""; // Clean up URL
    }
  }, []);

  // Function to fetch data from Spotify API
  const fetchSpotifyData = async (endpoint) => {
    try {
      const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      return null;
    }
  };

  // Fetch and process Spotify data
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        const recentlyPlayed = await fetchSpotifyData(
          "/me/player/recently-played?limit=5"
        );
        const topTracks = await fetchSpotifyData(
          "/me/top/tracks?time_range=short_term&limit=5"
        );
        const topArtists = await fetchSpotifyData("/me/top/artists?limit=5");

        if (recentlyPlayed && topTracks && topArtists) {
          onDataFetched({
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
        } else {
          console.error("Failed to fetch Spotify data");
        }
      };

      fetchData();
    }
  }, [accessToken, onDataFetched]);

  // Generate Spotify Login URL
  const getLoginURL = () => {
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
  };

  return (
    <div>
      {!accessToken && (
        <a href={getLoginURL()}>
          <button className="w-[15rem] h-[5rem] bg-[#212328] hover:bg-[#31343c] flex flex-row gap-[0.7rem] items-center justify-center rounded-xl transition duration-300 ease-in ">
            <h1 className="text-[1.1rem] font-bold text-white">login with</h1>
            <h1 className="text-[1.4rem]">
              <Icon icon="logos:spotify" />
            </h1>
          </button>
        </a>
      )}
    </div>
  );
}

export default SpotifyAuths;
