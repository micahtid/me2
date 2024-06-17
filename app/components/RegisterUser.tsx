"use client";

// Library Imports
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { addUser } from "../utils/usersfunctions";
import { getUserAuth } from "../utils/databasefunctions";

// Component Imports
import Button from "./Button";
import { FaHome } from "react-icons/fa";

// To Do:
// Add verification to check for unique username...

const RegisterUser = () => {
  const [clicked, setClicked] = useState(false);

  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);

  const auth = getUserAuth(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userName && userAge && userCurriculum && userLocation && userHobbies) {
      addUser(
        userName,
        Number(userAge),
        userCurriculum,
        userLocation,
        userHobbies,
        auth.currentUser?.photoURL
      );
      setClicked(true);
      router.refresh();
    }
  };

  return (
    <div className="m-14 bg-primary/50 rounded-md p-8 shadow-sm">
      <Button className="mb-6" onClick={() => router.replace("./")}>
        <FaHome size={20} color="white" />
      </Button>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <div className="">
          <h2 className="uppercase font-semibold text-3xl">
            Register Your Information
          </h2>
          <p className="text-gray-400 italic">
            Me2 ensures your data is kept safe and not used in mal practice.
          </p>
        </div>
        <div className="">
          <p className="sub-heading">User Name</p>
          <input
            type="text"
            placeholder="Enter Here..."
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="">
          <p className="sub-heading">Age</p>
          <input
            type="number"
            placeholder="Enter Here..."
            onChange={(e) => setUserAge(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="">
          <p className="sub-heading">Curriculum</p>
          <Select
            options={curriculums}
            onChange={(curr) => {
              if (curr) {
                setUserCurriculum(curr.value);
              }
            }}
          />
        </div>
        <div className="">
          <p className="sub-heading">Location</p>
          <Select
            options={locations}
            onChange={(loc) => {
              if (loc) {
                setUserLocation(loc.value);
              }
            }}
          />
        </div>
        <div className="">
          <p className="sub-heading">Hobbies</p>
          <Select
            options={hobbies}
            isMulti
            onChange={(hobbies) => {
              if (hobbies) {
                const addedHobbies = hobbies.map((option) => option.value);
                setUserHobbies(addedHobbies);
              } else {
                setUserHobbies([]);
              }
            }}
          />
        </div>
        <div className="">
          <button
            className="uppercase text-xl font-semibold bg-gray-500/10 py-2 px-2 rounded-md shadow-sm mt-5"
            type="submit"
            disabled={clicked}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
