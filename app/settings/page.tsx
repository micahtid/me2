"use client";

// Version 1.5

// Library Imports
import { useState, useEffect } from "react";

import Select from "react-select";
import { selectStyles } from "../data";

import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import { FaHome } from "react-icons/fa";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { editUser, getUser } from "../utils/usersfunctions";
import { useData } from "@/providers/DataProvider";

// Component Imports
import Loader from "../components/Loader";

const Settings = () => {
  const router = useRouter();
  const { user, users } = useData();

  const [clicked, setClicked] = useState(false);

  // Getting Initial User Data
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Storing Form Values
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);

  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [snap, setSnap] = useState("");

  // Setting User Value
  useEffect(() => {
    if (users && user) {
      setUserData(users.find((u) => u.uid === user.uid));
      setLoading(false);
    }
  }, [users, user]);

  // Setting Default Values
  useEffect(() => {
    if (userData) {
      setUserName(userData.userName || "");
      setUserAge(userData.age ? String(userData.age) : "");
      setUserCurriculum(userData.curr || "");
      setUserLocation(userData.location || "");
      setUserHobbies(userData.hobbies || []);
      setInstagram(userData.instagram || "");
      setDiscord(userData.discord || "");
      setSnap(userData.snap || "");
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userName &&
      userAge &&
      userCurriculum &&
      userLocation &&
      userHobbies &&
      (instagram || discord || snap)
    ) {
      editUser(
        user?.uid,
        userName,
        Number(userAge),
        userCurriculum,
        userLocation,
        userHobbies,
        instagram,
        discord,
        snap
      );
      setClicked(true);
      router.replace("./");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="
        w-full max-w-7xl
        bg-white rounded-2xl shadow-lg
        flex flex-row overflow-hidden
        max-xl:flex-col
      ">
        {/* Left Panel */}
        <div className="
          w-[400px] bg-primary
          flex flex-col justify-center gap-y-4
          p-12
          max-xl:w-full max-xl:py-10
        ">
          <button 
            onClick={() => router.replace("./")}
            className="
              w-fit p-2.5
              bg-secondary 
              text-white rounded-xl
              flex items-center justify-center
            "
          >
            <FaHome size={20} />
          </button>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-900">
              Edit Your Information
            </h3>
            <p className="text-gray-700">
              Me2 ensures your data is kept safe and not used in malpractice.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <form
          onSubmit={handleSubmit}
          className="
            flex-1
            flex flex-col gap-y-6
            p-12
            max-xl:px-8
          "
        >
          <div className="space-y-2 mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Profile Information
            </h3>
            <p className="text-gray-500 text-sm">
              All edits must be saved before being applied.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="text"
              value={userName}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              className="
                w-full px-4 py-2.5
                bg-gray-50
                border border-gray-200
                rounded-xl
                placeholder:text-gray-400
                focus:outline-none focus:border-primary/50
                transition-colors duration-200
              "
            />

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <input
                type="number"
                value={userAge}
                placeholder="Age"
                onChange={(e) => setUserAge(e.target.value)}
                className="
                  w-full px-4 py-2.5
                  bg-gray-50
                  border border-gray-200
                  rounded-xl
                  placeholder:text-gray-400
                  focus:outline-none focus:border-primary/50
                  transition-colors duration-200
                "
              />
              <Select
                options={locations}
                value={locations.find((loc) => loc.value === userLocation)}
                onChange={(loc) => {
                  if (loc) {
                    setUserLocation(loc.value);
                  }
                }}
                styles={selectStyles}
                placeholder="Location"
              />
            </div>

            <Select
              className="w-full"
              options={curriculums}
              value={curriculums.find((curr) => curr.value === userCurriculum)}
              onChange={(curr) => {
                if (curr) {
                  setUserCurriculum(curr.value);
                }
              }}
              styles={selectStyles}
              placeholder="Curriculum"
            />

            <Select
              options={hobbies}
              isMulti
              className="w-full"
              value={hobbies.filter((hobby) => userHobbies.includes(hobby.value))}
              onChange={(hobbies) => {
                if (hobbies) {
                  const addedHobbies = hobbies.map((option) => option.value);
                  setUserHobbies(addedHobbies);
                } else {
                  setUserHobbies([]);
                }
              }}
              styles={selectStyles}
              placeholder="Hobbies"
            />

            {/* Social Media Links */}
            <div className="space-y-4 pt-2">
              <input
                type="text"
                value={instagram}
                placeholder="Instagram"
                onChange={(e) => setInstagram(e.target.value)}
                className="
                  w-full px-4 py-2.5
                  bg-gray-50
                  border border-gray-200
                  rounded-xl
                  placeholder:text-gray-400
                  focus:outline-none focus:border-primary/50
                  transition-colors duration-200
                "
              />
              <input
                type="text"
                value={discord}
                placeholder="Discord"
                onChange={(e) => setDiscord(e.target.value)}
                className="
                  w-full px-4 py-2.5
                  bg-gray-50
                  border border-gray-200
                  rounded-xl
                  placeholder:text-gray-400
                  focus:outline-none focus:border-primary/50
                  transition-colors duration-200
                "
              />
              <input
                type="text"
                value={snap}
                placeholder="Snap Chat"
                onChange={(e) => setSnap(e.target.value)}
                className="
                  w-full px-4 py-2.5
                  bg-gray-50
                  border border-gray-200
                  rounded-xl
                  placeholder:text-gray-400
                  focus:outline-none focus:border-primary/50
                  transition-colors duration-200
                "
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 max-xl:justify-start">
            <button
              type="submit"
              disabled={clicked}
              className="
                px-6 py-2.5
                bg-secondary
                text-white font-medium
                rounded-xl
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
