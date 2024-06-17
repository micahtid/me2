"use client";

import { useUserModal } from "@/hooks/useUserModal";
import Modal from "./Modal";
import { hobbies, curriculums, locations } from "../data";

const UserModal = () => {
  const { isModalOpen, onModalClose, currentUser } = useUserModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onModalClose();
    }
  };

  const curriculumLabel = currentUser
    ? curriculums.find((curr) => curr.value === currentUser.curr)?.label || "Unknown"
    : "";
  const locationLabel = currentUser
    ? locations.find((loc) => loc.value === currentUser.location)?.label || "Unknown"
    : "";
  const hobbiesLabels = currentUser
    ? currentUser.hobbies.map(
        (hobby: string) => hobbies.find((h) => h.value === hobby)?.label || "Unknown"
      )
    : [];

  return (
    <Modal title={currentUser?.userName} isOpen={isModalOpen} onChange={onChange}>
      <div className="flex flex-col w-full justify-start gap-y-2">
        <div className="grid grid-cols-2 items-center px-4">
          <p>Age ⏳</p>
          <p className="text-right">{currentUser?.age}</p>
        </div>
        <div className="grid grid-cols-2 items-start px-4">
          <p>Curriculum 📓</p>
          <p className="text-right">{curriculumLabel}</p>
        </div>
        <div className="grid grid-cols-2 items-start px-4">
          <p>Location 📍</p>
          <p className="text-right">{locationLabel}</p>
        </div>
        <div className="grid grid-cols-2 items-start px-4">
          <p>Hobbies 🎨</p>
          <div className="flex flex-col items-end">
            {hobbiesLabels.map((hobby: string, index: number) => (
              <p key={index} className="text-right">
                {hobby}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
