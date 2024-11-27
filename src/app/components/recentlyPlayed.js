import React from "react";
import Image from "next/image";

function RecentlyPlayed({ recentlyPlayed }) {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-[1.3rem] md:text-[1.8rem] text-start font-bold">
        Recently Played Songs
      </h1>
      <p className="text-[0.9rem] md:text-[1.2rem] font-semibold text-gray-300">
        Songs you played recently
      </p>
      <div className="flex flex-row gap-[1rem] mt-[1.5rem] overflow-x-auto">
        {recentlyPlayed.map((track, index) => (
          <div
            key={index}
            className="flex flex-col items-start w-[11rem] gap-[1.5rem] shrink-0"
          >
            <Image
              src={track.albumCover}
              alt={`${track.name} album cover`}
              width={160}
              height={160}
              className="rounded-xl"
            />
            <h1 className="text-[1rem] md:text-[1.1rem] font-bold">
              {track.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyPlayed;
