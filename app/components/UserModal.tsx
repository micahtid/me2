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
      <div className="flex flex-col w-full gap-y-3">
        {/* Profile Header */}
        <div className="flex items-center gap-x-4 mb-2">
          <img
            src={currentUser?.pfp}
            width={56}
            height={56}
            className="
              rounded-full border-2 border-gray-200
              object-cover
            "
            alt="Profile"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentUser?.userName}
            </h3>
            <p className={`
              text-xs mt-1 font-medium
              ${currentUser?.online
                ? 'text-green-500'
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
            flex items-center gap-x-2 p-2.5
            bg-white border border-gray-200 rounded-lg
            transition-all duration-200
            hover:border-primary/40 hover:bg-primary/5
          ">
            <FaClock className="text-gray-600 flex-shrink-0 w-4 h-4" />
            <p className="font-medium text-sm text-gray-700 truncate">
              Age {currentUser?.age}
            </p>
          </div>

          <div className="
            flex items-center gap-x-2 p-2.5
            bg-white border border-gray-200 rounded-lg
            transition-all duration-200
            hover:border-primary/40 hover:bg-primary/5
          ">
            <FaLocationDot className="text-gray-600 flex-shrink-0 w-4 h-4" />
            <p className="font-medium text-sm text-gray-700 truncate">
              {locationLabel}
            </p>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="
          flex items-center gap-x-2 p-2.5
          bg-primary/30 border border-primary/50 rounded-lg
          transition-all duration-200
          hover:bg-primary/40 hover:border-primary/60
        ">
          <FaSchoolFlag className="text-header flex-shrink-0 w-4 h-4" />
          <p className="font-medium text-sm text-header truncate">
            {curriculumLabel}
          </p>
        </div>

        {/* Hobbies Section */}
        <div className="
          p-3 space-y-2.5
          bg-primary/30 border border-primary/50 rounded-lg
          transition-all duration-200
          hover:bg-primary/40 hover:border-primary/60
        ">
          <div className="flex items-center gap-x-2">
            <FaRegSmile className="text-header flex-shrink-0 w-4 h-4" />
            <p className="font-medium text-sm text-header">Hobbies</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {hobbiesLabels.slice(0, 10).map((hobby: string, index: number) => (
              <span
                key={index}
                className="
                  px-2.5 py-1
                  bg-white border border-gray-200 rounded-lg
                  text-xs font-medium text-gray-700
                  hover:border-primary/40 hover:bg-primary/5 transition-all duration-200
                "
              >
                {hobby}
                {index < hobbiesLabels.length - 1 && index < 9 ? "," : ""}
              </span>
            ))}
            {hobbiesLabels.length > 10 && (
              <span className="
                text-xs text-gray-500 font-medium
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