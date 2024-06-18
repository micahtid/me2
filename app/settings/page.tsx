"use client";

// Library Imports
import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import { FaHome } from "react-icons/fa";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { editUser, getUser } from "../utils/usersfunctions";
import { useData } from "@/providers/DataProvider";

// Component Imports
import Loader from "../components/Loader";
import Button from "../components/Button";

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

  /////////////
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [snap, setSnap] = useState("");

  // Setting User Value
  useEffect(() => {
    if (users && user) {
      const userDoc = users.find(u => u.uid === user.uid);
      setLoading(false);
      setUserData(userDoc);
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

    if (userName && userAge && userCurriculum && userLocation && userHobbies) {
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
    return (
      <Loader />
    );
  }

  return (
    <div className="m-14 bg-primary/50 rounded-md p-8 shadow-sm">
      <Button className="mb-6" onClick={() => router.replace("./")}>
        <FaHome size={20} color="white" />
      </Button>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
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
          <p className="sub-heading">Instagram</p>
          <input
            type="text"
            value={instagram}
            placeholder="Enter Here..."
            onChange={(e) => setInstagram(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="">
          <p className="sub-heading">Discord</p>
          <input
            type="text"
            value={discord}
            placeholder="Enter Here..."
            onChange={(e) => setDiscord(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="">
          <p className="sub-heading">Snap Chat</p>
          <input
            type="text"
            value={snap}
            placeholder="Enter Here..."
            onChange={(e) => setSnap(e.target.value)}
            className="input-field"
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

export default Settings;
