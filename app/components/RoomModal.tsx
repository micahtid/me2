"use client";

import { useState } from "react";
import { useRoomModal } from "@/hooks/useRoomModal";
import { roomTags } from "../data";
import { addRoom } from "../utils/roomfunctions";
import { useData } from "@/providers/DataProvider";

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

const RoomModal = () => {
  const { isModalOpen, onModalClose } = useRoomModal();
  const { user } = useData();

  // Add useState for form inputs
  const [roomDescription, setRoomDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userLimit, setUserLimit] = useState("");

  const onChange = (open: boolean) => {
    if (!open) {
      onModalClose();
    }
  };

  const handleSubmit = () => {
    const parsedUserLimit = parseInt(userLimit, 10); // Convert userLimit to an integer

    if (roomDescription && selectedTags.length > 0 && !isNaN(parsedUserLimit)) {
      addRoom(user?.uid, parsedUserLimit, roomDescription, selectedTags);
    } else {
      console.error("Please fill in all fields correctly.");
    }
    
    console.log({
      roomDescription,
      selectedTags,
      userLimit: parsedUserLimit,
    });
    
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
            className="bg-primary px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Create
          </button>
          <button
            onClick={onModalClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RoomModal;
