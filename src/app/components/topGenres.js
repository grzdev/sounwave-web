import React, { useState } from "react";
import Image from "next/image";
import Genre1 from "../assets/images/genre1.JPG";
import Genre2 from "../assets/images/genre2.JPG";
import Genre3 from "../assets/images/genre3.JPG";
import Genre4 from "../assets/images/genre4.JPG";
import Genre5 from "../assets/images/genre5.JPG";
import Modal from "./Modal";

function TopGenres({ topGenres }) {
  const genreImages = [Genre1, Genre2, Genre3, Genre4, Genre5];

  // Shuffle the genre images for randomness
  const shuffledImages = [...genreImages].sort(() => Math.random() - 0.5);

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (genre) => {
    setSelectedGenre(genre);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGenre(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col md:mt-[1.5rem]">
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
            className="flex flex-col items-start w-[11rem] gap-[1rem] shrink-0 cursor-pointer"
            onClick={() => openModal(genre)} // Pass the genre string to openModal
          >
            <Image
              src={shuffledImages[index % shuffledImages.length]}
              alt={`${genre}`}
              className="w-[10rem] h-[12rem] rounded-xl"
              priority
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedGenre && (
          <div className="flex flex-col items-center">
            <h1 className="text-[1.5rem] font-bold mt-4">
              {selectedGenre
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TopGenres;
