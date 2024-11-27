"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SCOPES = process.env.NEXT_PUBLIC_SPOTIFY_SCOPES;
const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_ENDPOINT;
const API_ENDPOINT = process.env.NEXT_PUBLIC_SPOTIFY_API_ENDPOINT;

// Dynamically choose the redirect URI based on the environment
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI_PROD
    : process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

function SpotifyAuths({ onDataFetched }) {
  const [accessToken, setAccessToken] = useState("");

  // Extract the token from the URL and validate it
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      // Save the token to state and localStorage
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
      window.location.hash = ""; // Clean up URL
    } else {
      // Attempt to retrieve token from localStorage
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }, []);

  // Validate and fetch Spotify data securely
  useEffect(() => {
    const fetchSpotifyData = async (endpoint) => {
      try {
        const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          return await response.json();
        } else {
          throw new Error("Failed to fetch Spotify data.");
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return null;
      }
    };

    if (accessToken) {
      const fetchData = async () => {
        try {
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
        } catch (error) {
          console.error("Error in fetchData:", error);
          localStorage.removeItem("spotify_access_token");
          setAccessToken(""); // Clear access token state
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
      <a href={getLoginURL()}>
        <button className="w-[13rem] h-[4.5rem] md:w-[15rem] md:h-[5rem] bg-[#212328] hover:bg-[#31343c] flex flex-row gap-[0.7rem] items-center justify-center rounded-xl transition duration-300 ease-in ">
          <h1 className="text-[1rem] md:text-[1.1rem] font-bold text-white">
            {accessToken ? "Go to Metrics" : "Login with"}
          </h1>
          <h1 className="text-[1.2rem] md:text-[1.4rem]">
            <Icon icon="logos:spotify" />
          </h1>
        </button>
      </a>
    </div>
  );
}

export default SpotifyAuths;
