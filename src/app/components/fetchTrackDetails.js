import axios from "axios";

/**
 * Fetch writers and producers of a track from MusicBrainz API.
 * @param {string} trackName - The name of the track from Spotify.
 * @param {string} artistName - One of the artist names from Spotify.
 * @returns {Promise<{writers: string[], producers: string[]}>} - Writers and producers of the track.
 */
export const fetchTrackDetails = async (trackName, artistName) => {
  try {
    // Step 1: Search for the track in MusicBrainz
    const searchResponse = await axios.get(
      `https://musicbrainz.org/ws/2/recording`,
      {
        params: {
          query: `${trackName} AND artist:${artistName}`,
          fmt: "json",
        },
      }
    );

    // Log the search response
    console.log("Search Response:", searchResponse.data);

    // Step 2: Check if the track exists in MusicBrainz
    const recording = searchResponse.data.recordings?.[0];
    console.log("Selected Recording:", recording);

    if (!recording) {
      console.log("No matching track found in MusicBrainz.");
      return { writers: ["Unknown"], producers: ["Unknown"] };
    }

    // Step 3: Fetch detailed recording info from MusicBrainz
    const recordingResponse = await axios.get(
      `https://musicbrainz.org/ws/2/recording/${recording.id}`,
      {
        params: {
          inc: "artist-rels",
          fmt: "json",
        },
      }
    );

    // Log the full detailed recording response
    console.log("Detailed Recording Response:", recordingResponse.data);

    const recordingData = recordingResponse.data;

    // Step 4: Safely extract writers and producers, providing empty arrays if undefined
    const writers =
      recordingData["artist-relation-list"]
        ?.filter((rel) => rel.type === "composer")
        .map((rel) => rel.artist?.name || "Unknown") || []; // Empty array fallback

    const producers =
      recordingData["artist-relation-list"]
        ?.filter((rel) => rel.type === "producer")
        .map((rel) => rel.artist?.name || "Unknown") || []; // Empty array fallback

    return {
      writers: writers.length ? writers : ["Unknown"],
      producers: producers.length ? producers : ["Unknown"],
    };
  } catch (error) {
    console.error("Error fetching track details from MusicBrainz:", error);
    return { writers: ["Unknown"], producers: ["Unknown"] }; // Fallback in case of an error
  }
};
