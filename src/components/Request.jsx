import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice.js";
import { BASE_URL } from "../utils/constants.js";

const Request = () => {
  const dispatch = useDispatch();
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Loading state

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setRequest((prev) => prev.filter((r) => r.fromUserId._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      setRequest(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // <-- Done loading
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-3xl text-gray-600 flex justify-center  gap-10 items-center">
        <span className="loading loadings-ring loading-xl"></span>
        <span className="loading loadings-ring loading-xl"></span>
        <span className="loading loadings-ring loading-xl"></span>
        <span className="loading loadings-ring loading-xl"></span>
        <span className="loading loadings-ring loading-xl"></span>
      </div>
    );
  }

  if (!request || request.length === 0) {
    return (
      <h1 className="text-center mt-10 font-semibold text-4xl">
        No Request(s) Found
      </h1>
    );
  }

  return (
    <div>
      <div className="w-full md:w-6/12 m-auto mt-8 mb-25">
        <h1 className="text-center font-bold text-4xl mb-6">Requests</h1>
        <ul className="space-y-4 cursor-pointer">
          {request.map((data) => (
            <li
              key={data.fromUserId._id}
              className="flex items-center justify-between bg-base-300 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-6">
                <img
                  className="size-10 rounded-full w-2/12 h-full object-cover"
                  src={data.fromUserId.photoURL}
                  alt={data.fromUserId.firstName}
                />
                <div>
                  <div className="font-semibold">
                    {data.fromUserId.firstName + " " + data.fromUserId.lastName}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {data.fromUserId.age + ", " + data.fromUserId.gender}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {data.fromUserId.about}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {data.fromUserId.skills.join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="btn btn-error"
                  onClick={() => handleRequest("rejected", data.fromUserId._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleRequest("accepted", data.fromUserId._id)}
                >
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Request;
