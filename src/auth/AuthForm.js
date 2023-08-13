import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../src/firebase";

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleAuthAction = async () => {
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Signed in
            const user = userCredential.user;

            navigate("/dashboard");
          }
        );
      } else {
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Signed in
            const user = userCredential.user;

            navigate("/dashboard");
          }
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4">
        <h1 className="text-3xl font-semibold text-center mb-4">
          {isRegistering ? "Register" : "Login"}
        </h1>
        <form className="bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
          {/* Input fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAuthAction}
            >
              {isRegistering ? "Register" : "Login"}
            </button>
            <button
              className="text-sm text-gray-500 hover:text-blue-500 focus:outline-none"
              type="button"
              onClick={handleToggleForm}
            >
              {isRegistering ? "Already have an account?" : "Create an account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
