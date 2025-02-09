import Image from "next/image";
import Lysa from "./lysa/page";
import Metrics from "./metrics/page";
import Navbar from "./components/navbar";
import { Icon } from "@iconify/react";
import SpotifyAuths from "./components/spotifyAuths";

export const metadata = {
  title: "Sounwave",
  description: "",
};

export default function Home() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-[2rem]">
      <h1 className="text-[3.5rem] md:text-[6rem] font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
        sounwave.
      </h1>
      <SpotifyAuths />
    </div>
  );
}
