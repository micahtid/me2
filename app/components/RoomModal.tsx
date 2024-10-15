"use client";

import { useState, useEffect } from "react";
import { useRoomModal } from "@/hooks/useRoomModal";
import { roomTags } from "../data";
import { addRoom, editRoom } from "../utils/roomfunctions";
import { useData } from "@/providers/DataProvider";

import { ClipLoader } from "react-spinners";
import Modal from "./Modal";
import Select from "react-select";

const selectStyles = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    borderColor: "rgba(198, 203, 210, 0.6)",
    borderWidth: "2px",
    borderRadius: "10px",
    height: "45px",
    marginTop: "-1px",
    color: "rgba(198, 203, 210, 0.6)",
    fontSize: "15.5px",
  }),
};

const createZoomLink = async () => {
  try {
    const tokenResponse = await fetch("/api/accessToken", {
      method: "POST",
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to get access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const zoomResponse = await fetch("/api/zoomLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    });

    if (!zoomResponse.ok) {
      throw new Error("Failed to create Zoom meeting");
    }

    return await zoomResponse.json();
  } catch (err) {
    console.error(err);
    throw new Error("Error creating Zoom meeting");
  }
};

const RoomModal = () => {
  const { isModalOpen, onModalClose, activeRoom, isNewRoom } = useRoomModal();
  const { user } = useData();

  const [roomDescription, setRoomDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userLimit, setUserLimit] = useState("");

  const [startUrl, setStartUrl] = useState<string | null>(null);
  const [joinUrl, setJoinUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRoomDescription(activeRoom?.description || "");
    setSelectedTags(activeRoom?.tags || []);
    setUserLimit(activeRoom?.limit.toString() || "");
  }, [activeRoom]);

  const onChange = (open: boolean) => {
    if (!open) {
      onModalClose();
    }
  };

  const handleSubmit = async () => {
    const parsedUserLimit = parseInt(userLimit, 10);

    if (roomDescription && selectedTags.length > 0 && !isNaN(parsedUserLimit)) {
      setIsLoading(true);

      try {
        const zoomLinks = await createZoomLink();
        setStartUrl(zoomLinks.start_url);
        setJoinUrl(zoomLinks.join_url);

        // Sometimes a zoomLink is not generating!

        if (isNewRoom && startUrl && joinUrl) {
          await addRoom(user?.uid, parsedUserLimit, roomDescription, selectedTags, startUrl, joinUrl);
        } else if (activeRoom?.roomId) {
          await editRoom(activeRoom.roomId, parsedUserLimit, roomDescription, selectedTags);
        }

        setRoomDescription("");
        setSelectedTags([]);
        setUserLimit("");
        console.log("Room successfully handled!");
      } catch (error) {
        console.error("Error handling the room: ", error);
      }
    } else {
      console.error("Please fill in all fields correctly.");
    }

    setIsLoading(false);
    onModalClose();
  };

  return (
    <Modal title="Manage Room" isOpen={isModalOpen} onChange={onChange}>
      <div className="flex flex-col justify-center items-center gap-y-2">
        <input
          type="text"
          placeholder="Room Description..."
          value={roomDescription}
          onChange={(e) => setRoomDescription(e.target.value)}
          className="input-field"
        />
        <Select
          className="w-full"
          options={roomTags}
          isMulti
          placeholder="Relevant Tags..."
          value={roomTags.filter((tag) => selectedTags.includes(tag.value))}
          onChange={(tags) => {
            if (tags) {
              const addedTags = tags.map((tag) => tag.value);
              setSelectedTags(addedTags);
            } else {
              setSelectedTags([]);
            }
          }}
          styles={selectStyles}
        />
        <input
          type="number"
          placeholder="User Limit..."
          value={userLimit}
          onChange={(e) => setUserLimit(e.target.value)}
          className="input-field"
        />
        <div className="w-full flex justify-start items-center gap-x-4 mt-8">
          <button
            className={`bg-primary px-4 py-2 rounded-lg w-[150px]
              relative flex justify-center items-center
              ${isLoading && "bg-gray-800/30"}`}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <ClipLoader size={12} className="mr-2" />
                <p className="text-center">Loading</p>
              </>
            ) : (
              <p className="text-center">Confirm</p>
            )}
          </button>
          <button onClick={onModalClose} className="bg-gray-300 px-4 py-2 rounded-lg w-[150px]">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RoomModal;
