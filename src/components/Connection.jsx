import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants.js";
import { Link, useNavigate } from "react-router-dom";

const Connection = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const navigate = useNavigate();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      console.log(res.data);
    } catch (error) {
      console.error(error); // ✅ fixed typo
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  // const handleChat = () => {
  //   try {
  //     return navigate("/chat/" + connection._id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  if (!connection) {
    return (
      <div className="text-center mt-15 text-3xl text-gray-600 ">
        <span className="loading loading-ring loading-xl"></span>
        <span className="loading loading-ring loading-xl"></span>
        <span className="loading loading-ring loading-xl"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (connection.length === 0) {
    return (
      <h1 className="text-center mt-10 font-semibold text-2xl">
        No Connections
      </h1>
    );
  }

  return (
    <div className="w-full md:w-6/12 m-auto mt-8 mb-32">
      <h1 className="text-center font-bold text-4xl mb-6">Connections</h1>
      <ul className="space-y-4 cursor-pointer">
        {connection.map((data) => (
          <li
            key={data._id}
            className="flex items-center justify-between bg-base-300 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-6">
              <img
                className="size-10 rounded-full w-2/12 h-full object-cover"
                src={data.photoURL}
                alt={data.firstName}
              />
              <div>
                <div className="font-semibold">
                  {data.firstName + " " + data.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {data.age + ", " + data.gender}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {data.about.split(" ").slice(0, 7).join(" ") + "..."}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {data.skills.join(", ")}
                </div>
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3.75h6m7.5-1.5a9 9 0 11-17.657 4.248c-.166-.408-.638-.598-1.041-.415l-1.714.774a.563.563 0 01-.76-.663l.774-1.714c.183-.403-.007-.875-.415-1.04A9 9 0 1121 10.5z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connection;
