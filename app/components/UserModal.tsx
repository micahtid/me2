"use client";

import { useUserModal } from "@/hooks/useUserModal";
import Modal from "./Modal";
import { hobbies, curriculums, locations } from "../data";
import { FaClock, FaLocationDot, FaSchoolFlag } from "react-icons/fa6";
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
      <div className="flex flex-col w-full gap-y-2">
        {/* Profile Header */}
        <div className="flex items-center gap-x-4 mb-4">
          <img 
            src={currentUser?.pfp} 
            width={56} 
            height={56}
            className="
              rounded-full shadow-md 
              ring-2 ring-black/5
              object-cover
            " 
            alt="Profile" 
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentUser?.userName}
            </h3>
            <p className={`
              text-sm mt-0.5
              ${currentUser?.online 
                ? 'text-green-500 font-medium' 
                : 'text-gray-500'
              }`}
            >
              {currentUser?.online 
                ? 'Online' 
                : `Active ${formatDistanceToNow(
                    convertTimestampToDate(currentUser?.lastOnline), 
                    { addSuffix: true }
                  )}`
              }
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="
            flex items-center gap-x-2 p-3
            bg-gray-100 rounded-xl
            transition-colors duration-200
            hover:bg-gray-100
          ">
            <FaClock className="text-gray-600 flex-shrink-0" />
            <p className="font-medium text-gray-700 truncate">
              Age {currentUser?.age}
            </p>
          </div>

          <div className="
            flex items-center gap-x-2 p-3
            bg-gray-100 rounded-xl
            transition-colors duration-200
            hover:bg-gray-100
          ">
            <FaLocationDot className="text-gray-600 flex-shrink-0" />
            <p className="font-medium text-gray-700 truncate">
              {locationLabel}
            </p>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="
          flex items-center gap-x-2 p-3
          bg-primary/50 rounded-xl
          transition-colors duration-200
          hover:bg-primary/30
        ">
          <FaSchoolFlag className="text-gray-600 flex-shrink-0" />
          <p className="font-medium text-gray-700 truncate">
            {curriculumLabel}
          </p>
        </div>

        {/* Hobbies Section */}
        <div className="
          p-3 space-y-2
          bg-primary/50 rounded-xl
          transition-colors duration-200
          hover:bg-primary/30
        ">
          <div className="flex items-center gap-x-2">
            <FaRegSmile className="text-gray-600 flex-shrink-0" />
            <p className="font-medium text-gray-700">Hobbies</p>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {hobbiesLabels.slice(0, 10).map((hobby: string, index: number) => (
              <span 
                key={index} 
                className="
                  px-2.5 py-1
                  bg-black/[7%] rounded-lg
                  text-sm font-medium text-gray-700
                "
              >
                {hobby}
                {index < hobbiesLabels.length - 1 && index < 9 ? "," : ""}
              </span>
            ))}
            {hobbiesLabels.length > 10 && (
              <span className="
                text-sm text-gray-500
                px-2 py-1
              ">
                +{hobbiesLabels.length - 10} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;