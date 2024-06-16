"use client";

// Library Imports
import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import { PacmanLoader } from "react-spinners";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { editUser, getUser } from "../utils/usersfunctions";
import { useData } from "@/providers/DataProvider";

const Settings = () => {
  const router = useRouter();
  const { user } = useData();

  const [clicked, setClicked] = useState(false);

  // Getting Initial User Data
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Storing Form Values
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);

  // Fetching User Data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        const data = await getUser(user.uid);
        setUserData(data);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Setting Default Values
  useEffect(() => {
    if (userData) {
      setUserName(userData.userName || "");
      setUserAge(userData.age ? String(userData.age) : "");
      setUserCurriculum(userData.curr || "");
      setUserLocation(userData.location || "");
      setUserHobbies(userData.hobbies || []);
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userName && userAge && userCurriculum && userLocation && userHobbies) {
      editUser(user?.uid, userName, Number(userAge), userCurriculum, userLocation, userHobbies);
      setClicked(true);
      router.replace('./');
  }
  };

  if (loading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-y-4 m-14" onSubmit={handleSubmit}>
      <div className="">
        <h2 className="uppercase font-semibold text-3xl">
          Edit Your Information
        </h2>
        <p className="text-gray-400 italic">
          Me2 ensures your data is kept safe and not used in mal practice.
        </p>
      </div>
      <div className="">
        <p className="sub-heading">User Name</p>
        <input
          type="text"
          value={userName}
          placeholder="Enter Here..."
          onChange={(e) => setUserName(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="">
        <p className="sub-heading">Age</p>
        <input
          type="number"
          value={userAge}
          placeholder="Enter Here..."
          onChange={(e) => setUserAge(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="">
        <p className="sub-heading">Curriculum</p>
        <Select
          options={curriculums}
          value={curriculums.find((curr) => curr.value === userCurriculum)}
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
          value={locations.find((loc) => loc.value === userLocation)}
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
          value={hobbies.filter((hobby) => userHobbies.includes(hobby.value))}
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
  );
};

export default Settings;