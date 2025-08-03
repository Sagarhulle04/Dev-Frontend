import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/verifyEmail`,
        { code }, // changed from "verificationCode" to "code" to match your backend
        { withCredentials: true }
      );

      if (res.status === 200) {
        setToast(true);
        setTimeout(() => {
          setToast(false);
          navigate("/profile");
        }, 4000);
        return navigate("/profile");
      } else {
        console.error("Verification failed:", res.data);
        setError("Verification failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data || "Invalid verification code");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card w-96 border rounded-xl shadow-md bg-base-100">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-semibold text-center text-white">
            Verify Your Email
          </h2>

          <input
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="input input-bordered w-full"
          />

          {error && (
            <div role="alert" className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center z-50 fixed">
          <div className="alert alert-success">
            <span>Update the profiles!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
