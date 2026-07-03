import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeeds } from "../utils/feedSlice.js";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants.js";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const feedData = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeeds(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    feedData();
  }, []); // only run once

  if (loading || feed === null) {
    return (
      <div className="flex justify-center mt-20">
        <div className="flex w-92 flex-col gap-4">
          <div className="skeleton h-40 w-full"></div>
          <div className="skeleton h-10 w-60"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="flex justify-center gap-6">
            <div className="skeleton h-12 w-36"></div>
            <div className="skeleton h-12 w-36"></div>
          </div>
        </div>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <h1 className="text-center mt-10 font-semibold text-4xl">
        No Feed(s) Found
      </h1>
    );
  }

  return <UserCard user={feed[0]} />;
};

export default Feed;
