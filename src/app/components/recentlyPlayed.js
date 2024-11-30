import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

function RecentlyPlayed({ recentlyPlayed }) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTrack(null);
    setIsModalOpen(false);
  };
  return (
    <div className="flex w-full flex-col md:mt-[1.5rem]">
      <h1 className="text-[1.3rem] md:text-[1.8rem]  text-start font-bold">
        Recently Played Songs
      </h1>
      <p className="text-[0.9rem] md:text-[1.2rem] font-semibold text-gray-300">
        Songs you played recently
      </p>
      <div className="flex flex-row gap-[1rem] mt-[1.5rem] overflow-x-auto">
        {recentlyPlayed.map((track, index) => (
          <div
            key={index}
            className="flex flex-col items-start cursor pointer w-[11rem] gap-[0.6rem] md:gap-[1.5rem] shrink-0"
            onClick={() => openModal(track)}
          >
            <Image
              src={track.albumCover}
              alt={`${track.name} album cover`}
              width={160}
              height={160}
              className="rounded-xl"
              priority
            />
            <h1 className="text-[1rem] md:text-[1.1rem] font-bold">
              {track.name}
            </h1>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedTrack && (
          <div className="flex flex-col items-center">
            <Image
              src={selectedTrack.albumCover}
              alt={`${selectedTrack.name}`}
              width={200}
              height={200}
              className="rounded-xl"
            />
            <h1 className="text-[1.5rem] font-bold mt-4">
              {selectedTrack.name}
            </h1>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default RecentlyPlayed;
