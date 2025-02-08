"use client";

import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { IoVideocamOutline } from "react-icons/io5";
import { selectStyles } from "@/app/data";
import { addRoom, editRoom } from "@/app/utils/roomfunctions";
import { useData } from "@/providers/DataProvider";
import { roomTags } from "@/app/data";
import { useRoomModal } from "@/hooks/useRoomModal";
import Modal from "../Modal";

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
  const { isModalOpen, onModalClose, activeRoom, isNewRoom, isUpdated } = useRoomModal();
  const { user } = useData();

  const [roomDescription, setRoomDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userLimit, setUserLimit] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRoomDescription(activeRoom?.description || "");
    setSelectedTags(activeRoom?.tags || []);
    setUserLimit(activeRoom?.limit.toString() || "");
  }, [activeRoom, isUpdated]);

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
        const zoomStartUrl = zoomLinks.start_url;
        const zoomJoinUrl = zoomLinks.join_url;
  
        if (isNewRoom && zoomStartUrl && zoomJoinUrl) {
          await addRoom(user?.uid, parsedUserLimit, roomDescription, selectedTags, zoomStartUrl, zoomJoinUrl);
        } else if (activeRoom?.roomId) {
          await editRoom(activeRoom.roomId, parsedUserLimit, roomDescription, selectedTags);
        }
  
      } catch (error) {
        console.error("Error handling the room: ", error);
      } finally {
        setIsLoading(false);
        onModalClose();
      }
    }
  };
  
  return (
    <Modal 
      title={isNewRoom ? "Create Study Room" : "Edit Study Room"} 
      isOpen={isModalOpen} 
      onChange={onChange}
    >
      <div className="flex flex-col gap-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="
            w-16 h-16 
            flex items-center justify-center 
            bg-primary/30 rounded-full
          ">
            <IoVideocamOutline className="w-8 h-8 text-secondary" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Room Description
            </label>
            <textarea
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              placeholder="What will you be studying?"
              className="
                w-full px-3 py-2
                border border-gray-300 
                outline-none
                rounded-xl
                min-h-[100px]
                resize-none
              "
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Study Tags
            </label>
            <Select
              isMulti
              options={roomTags}
              value={roomTags.filter(tag => selectedTags.includes(tag.value))}
              onChange={(tags) => setSelectedTags(tags.map(tag => tag.value))}
              styles={selectStyles}
              placeholder="Select study tags..."
            />
          </div>

          {/* User Limit */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              User Limit
            </label>
            <input
              type="number"
              value={userLimit}
              onChange={(e) => setUserLimit(e.target.value)}
              placeholder="How many students?"
              min="1"
              className="
                w-full px-3 py-2
                rounded-xl
                border border-gray-300 
                outline-none
              "
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="
            w-full px-4 py-2.5
            bg-secondary text-white font-medium
            rounded-lg
            hover:bg-primary/90
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center
          "
        >
          {isLoading ? (
            <ClipLoader size={20} color="#FFFFFF" />
          ) : (
            isNewRoom ? "Create Room" : "Save Changes"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default RoomModal;
