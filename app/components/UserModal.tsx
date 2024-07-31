"use client";

import { useUserModal } from "@/hooks/useUserModal";
import Modal from "./Modal";
import { hobbies, curriculums, locations } from "../data";

import { FaClock, FaLocationDot, FaSchoolFlag  } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";

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
    <Modal isOpen={isModalOpen} onChange={onChange}>
      <div className="flex flex-col w-full justify-start gap-y-2">
        <div className="flex flex-row items-center justify-start gap-x-5
        w-full mb-4">
          <img src={currentUser?.pfp} width={40} className="rounded-full" alt="" />
          <h3 className="text-2xl">{currentUser?.userName}</h3>
        </div>
        <div className="flex flex-row gap-x-2">
          <div className="flex flex-row gap-x-2 justify-start items-center
          flex-grow border-2 border-primary px-2 py-1 rounded-lg">
            <FaClock />
            <p className="">Age {currentUser?.age}</p>
          </div>
          <div className="flex flex-row gap-x-2 justify-start items-center
          flex-grow border-2 border-primary px-2 py-1 rounded-lg">
            <FaLocationDot />
            <p className="">Location: {locationLabel}</p>
          </div>
        </div>
        <div className="flex flex-row gap-x-2 justify-start items-center
        bg-primary px-2 py-2 rounded-lg">
          <FaSchoolFlag />
          <p className="text-nowrap overflow-hidden">Curriculum: {curriculumLabel}</p>
        </div>
        <div className="flex flex-col
        bg-primary px-2 py-2 rounded-lg">
          <div className="flex flex-row gap-x-2 justify-start items-center">
            <FaRegSmile />
            <p className="">Hobbies: </p>
          </div>
          <div className="flex flex-row gap-x-2 flex-wrap">
            {hobbiesLabels.map((hobby: string, index: number) => (
              <p key={index} className="text-right">
                {hobby};
              </p>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;

{/* <div className="grid grid-cols-2 items-center px-4">
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
</div> */}