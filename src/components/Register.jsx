import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants.js";

const Register = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const registerUser = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        dispatch(addUser(res.data.data));
        return navigate("/verifyEmail");
      }
    } catch (error) {
      setError(error?.response?.data);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <fieldset className="fieldset bg-base-200 m-auto border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Register</legend>

        <label className="label">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input"
          placeholder="sagar"
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
          placeholder="hulle"
        />

        <label className="label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="abc@gmail.com"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="abc"
        />

        <div
          role="alert"
          className="alert alert-error alert-soft"
          style={{ display: error ? "block" : "none" }}
        >
          <span>{error}</span>
        </div>

        <button className="btn btn-neutral mt-4" onClick={registerUser}>
          Register
        </button>

        <div className="flex justify-center font-bold items-center my-3">
          <p>Already Have An Account : </p>
          <Link to="/login" className="text-blue-600 mx-2">
            Sign In
          </Link>
        </div>
      </fieldset>
    </div>
  );
};

export default Register;
