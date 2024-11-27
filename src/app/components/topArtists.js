import React from "react";
import Image from "next/image";

function TopArtists({ topArtists }) {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-[1.3rem] md:text-[1.8rem] text-start font-bold">
        Top Artists
      </h1>
      <p className="text-[0.9rem] md:text-[1.2rem] font-semibold text-gray-300">
        Your most listened to artists from the past month
      </p>
      <div className="flex flex-row gap-[1rem] mt-[1.5rem] overflow-x-auto">
        {topArtists.map((artist, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-start w-[11rem] h-[16rem] gap-[1rem] shrink-0"
          >
            <Image
              src={artist.image}
              alt={artist.name}
              width={200}
              height={200}
              className="rounded-xl"
              priority
            />
            <h1 className="text-[1rem] md:text-[1.1rem] font-bold">
              {artist.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtists;
