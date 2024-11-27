import React from "react";
import Image from "next/image";
import Genre1 from "../assets/images/genre1.JPG";
import Genre2 from "../assets/images/genre2.JPG";
import Genre3 from "../assets/images/genre3.JPG";
import Genre4 from "../assets/images/genre4.JPG";
import Genre5 from "../assets/images/genre5.JPG";

function TopGenres({ topGenres }) {
  const genreImages = [Genre1, Genre2, Genre3, Genre4, Genre5];

  const shuffledImages = [...genreImages].sort(() => Math.random() - 0.5);

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-[1.3rem] md:text-[1.8rem] text-start font-bold">
        Top Genres
      </h1>
      <p className="text-[0.9rem] md:text-[1.2rem] font-semibold text-gray-300">
        The genres you resonate with the most
      </p>
      <div className="flex flex-row gap-[1.5rem] mt-[1.5rem] overflow-x-auto">
        {topGenres.map((genre, index) => (
          <div
            key={index}
            className="flex flex-col items-start w-[11rem] gap-[1rem] shrink-0"
          >
            <Image
              src={shuffledImages[index % shuffledImages.length]}
              alt={`${genre}`}
              className="w-[10rem] h-[12rem] rounded-xl"
            />
            <h1 className="text-[1rem] md:text-[1.1rem] font-bold">
              {genre
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopGenres;
