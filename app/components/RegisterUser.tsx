"use client";

// Library Imports
import { useState } from "react";
import Select from "react-select";
import { StylesConfig } from "react-select";
import { useRouter } from "next/navigation";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { addUser } from "../utils/usersfunctions";
import { getUserAuth, signOut } from "../utils/databasefunctions";

// Component Imports
import Button from "./Button";
import { FaHome } from "react-icons/fa";

// To Do:
// Add verification to check for unique username...

const customStyles: StylesConfig = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderColor: 'rgba(198, 203, 210, 0.6)',
    borderWidth: '2px',
    borderRadius: '10px',
    height: '45px',
    marginTop: '-1px',
    color: 'rgba(198, 203, 210, 0.6)',
    fontSize: '15.5px',
  }),
};

const RegisterUser = () => {
  const [clicked, setClicked] = useState(false);

  /////////////
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);

  /////////////
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
    <div
      className="bg-[#D5E6FF] w-[100vw] h-[100vh]
    flex justify-center items-center"
    >
      <div
        className="w-[calc(100vw-8rem)] h-[calc(100vh-4rem)]
      flex flex-row"
      >
        <div
          className="w-[500px] h-full bg-[#54ACFD]
        flex flex-col justify-center items-start gap-y-2 px-16"
        >
          <Button onClick={signOut} className="mb-6 shadow-none text-sm">
            Return
          </Button>
          <h3 className="dynamic-subheading text-white font-semibold">
            Welcome to Me2!
          </h3>
          <p className="text-white/70">
            The platform where you'll connect with like-minded individuals.
          </p>
        </div>
        <form
          className="flex-grow h-full bg-white px-52 pt-40 pb-20  
        flex flex-col justify-center items-center gap-y-3 overflow-y-scroll"
        >
          <h3 className="dynamic-subheading font-semibold">Register Here</h3>
          <p className="dynamic-text text-gray-700 italic text-center">
            Me2 ensures your data is kept safe and not used in malpractice.
          </p>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
          />
          <div className="w-full grid grid-cols-2 gap-x-3">
            <input
              type="number"
              placeholder="Enter Here..."
              onChange={(e) => setUserAge(e.target.value)}
              className="input-field"
            />
            <Select
              placeholder="Location"
              options={locations}
              onChange={(loc) => {
                if (loc) {
                  setUserLocation(loc.value);
                }
              }}
              styles={customStyles}
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
            styles={customStyles}
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
            styles={customStyles}
          />
          <p className="dynamic-text text-gray-700 italic text-center">
            *Fill out at least one of these forms below.
          </p>
          <input
            type="text"
            placeholder="Instagram"
            onChange={(e) => setInstagram(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Discord"
            onChange={(e) => setDiscord(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Snap Chat"
            onChange={(e) => setSnap(e.target.value)}
            className="input-field"
          />
          <div className="w-full flex justify-end">
            <button
              className="dynamic-text font-semibold 
              bg-[#FFD99F] py-2 px-6 rounded-md mt-5"
              type="submit"
              disabled={clicked}
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

{
  /* <div className="m-14 bg-primary/50 rounded-md p-8 shadow-sm">
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
    <p className="sub-heading">Instagram</p>
    <input
      type="text"
      placeholder="Enter Here..."
      onChange={(e) => setInstagram(e.target.value)}
      className="input-field"
    />
  </div>
  <div className="">
    <p className="sub-heading">Discord</p>
    <input
      type="text"
      placeholder="Enter Here..."
      onChange={(e) => setDiscord(e.target.value)}
      className="input-field"
    />
  </div>
  <div className="">
    <p className="sub-heading">Snap Chat</p>
    <input
      type="text"
      placeholder="Enter Here..."
      onChange={(e) => setSnap(e.target.value)}
      className="input-field"
    />
  </div>
  <button
    className="uppercase text-xl font-semibold bg-gray-500/10 py-2 px-2 rounded-md shadow-sm mt-5"
    type="submit"
    disabled={clicked}
  >
    Submit
  </button>
</form>
</div> */
}
