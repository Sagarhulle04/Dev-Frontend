import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants.js";

const EditProfile = ({ user }) => {
  const safeUser = user || {};
  const [firstName, setFirstName] = useState(safeUser.firstName);
  const [lastName, setLastName] = useState(safeUser.lastName);
  const [age, setAge] = useState(safeUser.age);
  const [gender, setGender] = useState(safeUser.gender);
  const [photoURL, setPhotoURL] = useState(safeUser.photoURL);
  const [about, setAbout] = useState(safeUser.about || "");
  const [error, setError] = useState("");
  const [skills, setSkills] = useState(
    Array.isArray(safeUser.skills)
      ? safeUser.skills.join(", ")
      : safeUser.skills || ""
  );
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
          skills: skillsArray,
        },
        { withCredentials: true }
      );

      if (res?.data?.data) {
        dispatch(addUser(res.data.data));
        setToast(true);
        setTimeout(() => {
          setToast(false);
          navigate("/profile");
        }, 1200);
      }
    } catch (error) {
      setError(error.response.data);
      console.error("Update failed", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 p-8 min-h-screen bg-base-100">
      {/* Left Side Form */}
      <div className="w-full md:w-[26rem] bg-base-200 border border-base-300 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Edit Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="label font-semibold">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="label font-semibold">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label className="label font-semibold">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Age"
            />
          </div>
          <div>
            <label className="label font-semibold">Gender</label>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled value="">
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="label font-semibold">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Something about you"
            />
          </div>
          <div>
            <label className="label font-semibold">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div>
            <label className="label font-semibold">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g. React, Node.js, UI/UX"
            />
          </div>
        </div>
        {error && (
          <div role="alert" className=" my-3 alert alert-error alert-outline">
            <span> {error} </span>
          </div>
        )}

        <button
          className="btn btn-primary w-full mt-6 text-lg"
          onClick={saveProfile}
        >
          Update Profile
        </button>
      </div>

      {/* Right Side Live Preview */}
      <div className="w-full md:w-[26rem] flex justify-center">
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            about,
            photoURL,
            skills: skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }}
        />
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-center z-50 fixed">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
