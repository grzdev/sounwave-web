"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SCOPES = process.env.NEXT_PUBLIC_SPOTIFY_SCOPES;
const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_ENDPOINT;
const API_ENDPOINT = process.env.NEXT_PUBLIC_SPOTIFY_API_ENDPOINT;
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI_PROD
    : process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

function SpotifyAuths() {
  const [accessToken, setAccessToken] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);

  // Validate the token and optionally fetch user info
  const validateToken = async (token) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userInfo = await response.json();
        console.log("User Info:", userInfo);
        localStorage.setItem("spotify_user", JSON.stringify(userInfo)); // Save user info locally
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      console.log("Token found in URL:", token);
      localStorage.setItem("spotify_access_token", token);
      setAccessToken(token);
      window.location.hash = "";
    } else {
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        console.log("Token found in LocalStorage:", storedToken);
        setAccessToken(storedToken);
      } else {
        console.log("No token found in URL or LocalStorage.");
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      validateToken(accessToken).then((isValid) => {
        setIsValidToken(isValid);
        if (!isValid) {
          localStorage.removeItem("spotify_access_token");
          setAccessToken(null);
        }
      });
    }
  }, [accessToken]);

  const getLoginURL = () => {
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
  };

  return (
    <div>
      <a href={getLoginURL()}>
        <button className="w-[13rem] h-[4.5rem] md:w-[15rem] md:h-[5rem] bg-[#212328] hover:bg-[#31343c] flex flex-row gap-[0.7rem] items-center justify-center rounded-xl transition duration-300 ease-in">
          <h1 className="text-[1rem] md:text-[1.1rem] font-bold text-white">
            {isValidToken ? "Go to Metrics" : "Login with"}
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
