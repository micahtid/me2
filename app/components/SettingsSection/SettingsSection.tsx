"use client";

// Library Imports
import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";

// Own Function Imports
import { curriculums, locations, hobbies, selectStyles } from "@/app/data";
import { editUser } from "@/app/utils/usersfunctions";
import { useData } from "@/providers/DataProvider";

// Component Imports
import Loader from "../Loader";

const SettingsSection = () => {
  const router = useRouter();
  const { user, users } = useData();

  const [clicked, setClicked] = useState(false);
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
        <h3 className="text-2xl font-semibold text-gray-900">Profile Information</h3>
        <p className="text-gray-500 text-sm">All edits must be saved before being applied.</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={userName}
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
        />

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <input
            type="number"
            value={userAge}
            placeholder="Age"
            onChange={(e) => setUserAge(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
          />
          <Select
            options={locations}
            value={locations.find((loc) => loc.value === userLocation)}
            onChange={(loc) => loc && setUserLocation(loc.value)}
            styles={selectStyles}
            placeholder="Location"
          />
        </div>

        <Select
          className="w-full"
          options={curriculums}
          value={curriculums.find((curr) => curr.value === userCurriculum)}
          onChange={(curr) => curr && setUserCurriculum(curr.value)}
          styles={selectStyles}
          placeholder="Curriculum"
        />

        <Select
          options={hobbies}
          isMulti
          className="w-full"
          value={hobbies.filter((hobby) => userHobbies.includes(hobby.value))}
          onChange={(hobbies) => setUserHobbies(hobbies.map((option) => option.value))}
          styles={selectStyles}
          placeholder="Hobbies"
        />
      </div>

      <div className="flex justify-end pt-4 max-xl:justify-start">
        <button
          type="submit"
          disabled={clicked}
          className="px-6 py-2.5 bg-secondary text-white font-medium rounded-xl"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SettingsSection;
