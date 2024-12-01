import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { fetchTrackDetails } from "../components/fetchTrackDetails";

function TopTracks({ topTracks }) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [writers, setWriters] = useState([]);
  const [producers, setProducers] = useState([]);

  const openModal = async (track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);

    // Fetch writers and producers from MusicBrainz
    const { writers, producers } = await fetchTrackDetails(
      track.name,
      track.artists[0] // Use the first artist as a search parameter
    );
    setWriters(writers);
    setProducers(producers);
  };

  const closeModal = () => {
    setSelectedTrack(null);
    setIsModalOpen(false);
    setWriters([]);
    setProducers([]);
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
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-[1rem]">
            <Image
              src={selectedTrack.albumCover}
              alt={`${selectedTrack.name} album cover`}
              width={200}
              height={200}
              className="rounded-xl w-[13rem] h-[13rem] md:w-[22rem] md:h-[22rem]"
            />
            <div className="flex flex-col justify-center items-center md:items-start">
              <h1 className="text-[1.3rem] md:text-[1.7rem] font-bold">
                {selectedTrack.name}
              </h1>
              <h2 className="text-[1.1rem] w-[10rem] md:w-full text-center md:text-start md:text-[1.2rem] text-gray-200 font-medium">
                {selectedTrack.artists.join(", ")}
              </h2>
              <div className="flex md:w-full gap-[8rem] md:justify-between flex-row mt-[1.2rem] md:mt-[0.8rem]">
                <h1 className="text-[1rem] md:text-[1.1rem] text-gray-200 font-medium">
                  {selectedTrack.plays} plays
                </h1>
                <h1 className="text-[1rem] md:text-[1.1rem] text-gray-200 font-medium">
                  {selectedTrack.releaseDate}
                </h1>
              </div>
              <div className="w-[18rem] h-[14.8rem] md:w-[25rem] md:h-[14.5rem] p-[1rem] bg-[#2d3038] mt-[0.6rem] md:mt-[0.8rem] flex justify-center flex-col gap-[1rem] rounded-xl">
                <div className="flex flex-col">
                  <h1 className="font-medium text-[1.1rem]">Performed by</h1>
                  <h1 className="text-gray-400 font-medium">
                    {selectedTrack.performers}
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-medium text-[1.1rem]">Written by</h1>
                  <h1 className="text-gray-400 font-medium">
                    {writers.join(", ")}
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-medium text-[1.1rem]">Produced by</h1>
                  <h1 className="text-gray-400 font-medium">
                    {producers.join(", ")}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TopTracks;
