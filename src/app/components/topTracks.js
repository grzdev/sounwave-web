import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

function TopTracks({ topTracks }) {
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
    <div className="flex w-full flex-col">
      <h1 className="text-[1.3rem] md:text-[1.8rem] text-start font-bold">
        Top Songs
      </h1>
      <p className="text-[0.9rem] md:text-[1.2rem] font-semibold text-gray-300">
        Your top songs from the past month
      </p>
      <div className="flex flex-row gap-[1rem] mt-[1rem] overflow-x-auto">
        {topTracks.map((track, index) => (
          <div
            key={index}
            className="flex flex-col items-start w-[11rem] shrink-0 cursor-pointer"
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
            <h1 className="text-[1rem] md:text-[1.3rem] font-bold mt-[1rem] md:mt-[1.5rem]">
              {track.name}
            </h1>
            <h2 className="text-[0.8rem] text-gray-300 font-bold">
              {track.artists.join(", ")}
            </h2>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedTrack && (
          <div className="flex flex-col items-center">
            <Image
              src={selectedTrack.albumCover}
              alt={`${selectedTrack.name} album cover`}
              width={200}
              height={200}
              className="rounded-xl"
            />
            <h1 className="text-[1.5rem] font-bold mt-4">
              {selectedTrack.name}
            </h1>
            <h2 className="text-[1rem] text-gray-200 font-medium">
              {selectedTrack.artists.join(", ")}
            </h2>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TopTracks;
