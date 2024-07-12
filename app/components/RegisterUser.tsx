"use client";

// Library Imports
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { addUser } from "../utils/usersfunctions";
import { getUserAuth, signOut } from "../utils/databasefunctions";

// Component Imports
import Button from "./Button";

// To Do:
// Add verification to check for unique username...

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
        className="w-[1500px] h-[1000px]
      flex flex-row shadow-md
      max-md:w-full max-md:h-full
      max-md:flex-col"
      >
        <div
          className="w-[500px] h-full bg-[#54ACFD]
        flex flex-col justify-center items-start gap-y-2 px-16
        max-md:max-w-[100vw] max-md:w-full
        max-md:py-14
        max-xl:w-[400px] max-lg:w-[300px]
        "
        >
          <h3 className="dynamic-subheading text-white font-semibold">
            Welcome to Me2!
          </h3>
          <p className="text-white mt-[10px]">
            The platform where you will connect and bond with like-minded individuals.
          </p>
          <Button onClick={signOut} className="shadow-none text-sm mt-[20px] ml-auto mr-[20px]">
            Return
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-grow h-full bg-white px-52 pt-40 pb-20  
        flex flex-col justify-center items-center gap-y-3 overflow-y-scroll
        max-md:overflow-y-visible max-md:items-start
        max-xl:px-28 max-lg:px-12 
        max-xl:pt-64 max-lg:pt-64 max-md:py-96 no-scrollbar"
        >
          <h3
            className="dynamic-subheading font-semibold text-center
          max-md:text-left mt-[-90px]"
          >
            Register
          </h3>
          <p
            className="dynamic-text text-gray-700 italic text-center
          max-md:text-left mt-[10px]"
          >
            Me2 ensures your data is kept safe and not used in malpractice.
          </p>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            className="input-field mt-[10px] hover:border-[#939393] hover:border-[1px] ease-in-out duration-100"
          />
          <div className="w-full grid grid-cols-2 gap-x-[10px] mt-[5px]">
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setUserAge(e.target.value)}
              className="input-field hover:border-[#939393] hover:border-[1px] ease-in-out duration-100"
            />
            <Select
              placeholder="Location"
              options={locations}
              onChange={(loc) => {
                if (loc) {
                  setUserLocation(loc.value);
                }
              }}
              styles={{
                control: (baseStyles: any, state: any) => ({
                  ...baseStyles,
                  borderColor: "rgba(198, 203, 210, 0.6)",
                  borderWidth: "2px",
                  borderRadius: "10px",
                  height: "45px",
                  marginTop: "-1px",
                  color: "rgba(198, 203, 210, 0.6)",
                  fontSize: "15.5px",
                  boxShadow: state.isFocused ? "0 0 0 0 rgba(198, 203, 210, 0.6)" : "none",
                  "&:hover": {
                    borderColor: "#a1a1a1",
                  },
                }),
              }}
            />
          </div>
          <Select
            placeholder="Curriculum"
            className="w-full mt-[6px]"
            options={curriculums}
            onChange={(curr) => {
              if (curr) {
                setUserCurriculum(curr.value);
              }
            }}
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                borderColor: "rgba(198, 203, 210, 0.6)",
                borderWidth: "2px",
                borderRadius: "10px",
                height: "45px",
                marginTop: "-1px",
                color: "rgba(198, 203, 210, 0.6)",
                fontSize: "15.5px",
                boxShadow: state.isFocused ? "0 0 0 0 rgba(198, 203, 210, 0.6)" : "none",
                "&:hover": {
                  borderColor: "#a1a1a1",
                },
              }),
            }}
          />
          <Select
            placeholder="Hobbies"
            options={hobbies}
            className="w-full mt-[5px]"
            isMulti
            onChange={(hobbies) => {
              if (hobbies) {
                const addedHobbies = hobbies.map((option) => option.value);
                setUserHobbies(addedHobbies);
              } else {
                setUserHobbies([]);
              }
            }}
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                borderColor: "rgba(198, 203, 210, 0.6)",
                borderWidth: "2px",
                borderRadius: "10px",
                marginTop: "-1px",
                color: "rgba(198, 203, 210, 0.6)",
                fontSize: "15.5px",
                boxShadow: state.isFocused ? "0 0 0 0 rgba(198, 203, 210, 0.6)" : "none",
                "&:hover": {
                  borderColor: "rgba(198, 203, 210, 0.6)",
                },
              }),
            }}
          />
          <p
            className="dynamic-text text-gray-700 italic text-center
          max-md:text-left mt-[30px]"
          >
            *Fill out at least one of these forms below.
          </p>
          <input
            type="text"
            placeholder="Instagram"
            onChange={(e) => setInstagram(e.target.value)}
            className="input-field mt-[10px] hover:border-[#939393] hover:border-[1px] ease-in-out duration-100"
          />
          <input
            type="text"
            placeholder="Discord"
            onChange={(e) => setDiscord(e.target.value)}
            className="input-field mt-[5px] hover:border-[#939393] hover:border-[1px] ease-in-out duration-100"
          />
          <input
            type="text"
            placeholder="Snap Chat"
            onChange={(e) => setSnap(e.target.value)}
            className="input-field mt-[5px] hover:border-[#939393] hover:border-[1px] ease-in-out duration-100"
          />
          <div
            className="w-full flex justify-end
          max-md:justify-start"
          >
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
