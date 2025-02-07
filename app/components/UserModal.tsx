"use client";

import { useUserModal } from "@/hooks/useUserModal";
import Modal from "./Modal";
import { hobbies, curriculums, locations } from "../data";

import { FaClock, FaLocationDot, FaSchoolFlag  } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";

import { formatDistanceToNow } from 'date-fns';
import { convertTimestampToDate } from "../utils/utilfunctions";

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
        <div className="flex flex-row items-center justify-start gap-x-5 w-full mb-4">
          <img 
            src={currentUser?.pfp} 
            width={40} 
            className="rounded-full shadow-md ring-2 ring-black/5" 
            alt="" 
          />
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-2xl font-semibold">{currentUser?.userName}</h3>
            <p className={`text-sm ${currentUser?.online ? 'text-green-500 font-medium' : 'text-gray-500'}`}>
              {currentUser?.online ? 
              `Online` 
              : `Active ${formatDistanceToNow(convertTimestampToDate(currentUser?.lastOnline), { addSuffix: true })}`}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          <div className="flex flex-row gap-x-2 justify-start items-center
          flex-grow bg-gray-50 hover:bg-gray-100 transition-colors duration-200 px-2 py-1 rounded-lg shadow-sm">
            <FaClock className="text-gray-600" />
            <p className="font-medium">Age {currentUser?.age}</p>
          </div>
          <div className="flex flex-row gap-x-2 justify-start items-center
          flex-grow bg-gray-50 hover:bg-gray-100 transition-colors duration-200 px-2 py-1 rounded-lg shadow-sm">
            <FaLocationDot className="text-gray-600" />
            <p className="font-medium">Location: {locationLabel}</p>
          </div>
        </div>
        <div className="flex flex-row gap-x-2 justify-start items-center
        bg-primary/20 hover:bg-primary/30 transition-colors duration-200 px-2 py-2 rounded-lg shadow-sm">
          <FaSchoolFlag className="text-gray-600" />
          <p className="text-nowrap overflow-hidden font-medium">Curriculum: {curriculumLabel}</p>
        </div>
        <div className="flex flex-col bg-primary/20 hover:bg-primary/30 transition-colors duration-200 px-2 py-2 rounded-lg shadow-sm">
          <div className="flex flex-row gap-x-2 justify-start items-center">
            <FaRegSmile className="text-gray-600" />
            <p className="font-medium">Hobbies: </p>
          </div>
          <div className="flex flex-row gap-1 flex-wrap mt-1">
            {hobbiesLabels.slice(0, 10).map((hobby: string, index: number) => (
              <span 
                key={index} 
                className="bg-black/[5%] px-2 py-0.5 rounded-md text-sm font-medium"
              >
                {hobby}
                {index < hobbiesLabels.length - 1 && index < 9 ? "," : ""}
              </span>
            ))}
            {hobbiesLabels.length > 10 && 
              <span className="text-sm text-gray-500">
                +{hobbiesLabels.length - 10} more
              </span>
            }
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