import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice.js";
import { BASE_URL } from "../utils/constants.js";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
      console.log(user._id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-30 cursor-pointer">
      <div className="card bg-base-200 w-90 shadow-sm">
        <figure>
          <img
            src={user.photoURL || ""}
            alt="image"
            className="h-60 w-full object-fill"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">
            {user.firstName + " " + user.lastName}
          </h2>
          <p>{user.age + ", " + user.gender}</p>
          <p>{user.about}</p>
          <p>Skills : {user.skills.join(", ")}</p>
          <div className="card-actions justify-center my-5">
            <button
              className="btn btn-error"
              onClick={() => handleSubmit("ignore", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSubmit("intrested", user._id)}
            >
              Intrested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
