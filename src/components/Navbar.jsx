import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice.js";
import { BASE_URL } from "../utils/constants.js";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-base-200 h-18 shadow-sm">
      <div className="flex-1 m-4">
        <Link className="btn btn-ghost text-xl" to="/">
          DevTinder
        </Link>
      </div>
      {user ? (
        <div className="flex gap-2 m-4 font-bold items-center mx-5 mr-5">
          <div>
            <p>Welcome : {user.firstName}</p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/">
                  Home
                </Link>
                <Link className="justify-between" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="mx-5 space-x-6">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
