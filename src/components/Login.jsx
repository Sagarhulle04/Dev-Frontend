import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { BASE_URL } from "../utils/constants.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data);
      return navigate("/login");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div role="alert" className=" my-3 alert alert-error alert-outline">
            <span> {error} </span>
          </div>
        )}

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>

        <div className="flex justify-center font-bold items-center my-3">
          <p>Create Account : </p>
          <Link to="/register" className="text-blue-600 mx-2">
            Sign Up
          </Link>
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
