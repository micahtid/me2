"use client";

// Library Imports
import { useState } from "react";
import Select from "react-select";
import { selectStyles } from "../data";
import { useRouter } from "next/navigation";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { addUser } from "../utils/usersfunctions";
import { getUserAuth, signOut } from "../utils/databasefunctions";

const RegisterUser = () => {
  const [clicked, setClicked] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [snap, setSnap] = useState("");

  const auth = getUserAuth(false);
  const router = useRouter();

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
      addUser(
        userName,
        Number(userAge),
        userCurriculum,
        userLocation,
        userHobbies,
        auth.currentUser?.photoURL,
        instagram,
        discord,
        snap
      );
      setClicked(true);
      router.refresh();
    }
  };

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
            onClick={signOut}
            className="
              w-fit p-2.5
              font-medium
              bg-secondary
              text-white rounded-xl
              flex items-center justify-center
            "
          >
            Return
          </button>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-900">
              Welcome to Me2!
            </h3>
            <p className="text-gray-500 text-sm">
              The platform to find like-minded students.
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
              Register
            </h3>
            <p className="text-gray-500 text-sm">
              Me2 ensures your data is kept safe and not used in malpractice.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="text"
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
                placeholder="Location"
                options={locations}
                onChange={(loc) => {
                  if (loc) {
                    setUserLocation(loc.value);
                  }
                }}
                styles={selectStyles}
              />
            </div>

            <Select
              placeholder="Curriculum"
              className="w-full"
              options={curriculums}
              onChange={(curr) => {
                if (curr) {
                  setUserCurriculum(curr.value);
                }
              }}
              styles={selectStyles}
            />

            <Select
              placeholder="Hobbies"
              options={hobbies}
              className="w-full"
              isMulti
              onChange={(hobbies) => {
                if (hobbies) {
                  const addedHobbies = hobbies.map((option) => option.value);
                  setUserHobbies(addedHobbies);
                } else {
                  setUserHobbies([]);
                }
              }}
              styles={selectStyles}
            />

            {/* Social Media Links */}
            <div className="space-y-4 pt-2">
              <p className="text-gray-500 text-sm italic">
                *Fill out at least one of these forms below.
              </p>
              <input
                type="text"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;