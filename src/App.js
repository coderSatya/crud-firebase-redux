import logo from "./logo.svg";
import "./App.css";
import AllUsers from "./components/AllUsers";
import { Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

import { signInWithEmailAndPassword } from "firebase/auth";

import AuthForm from "./auth/AuthForm";
import { signOut } from "firebase/auth";
import { auth } from "../src/firebase";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AuthForm />} />

          {/* Protected routes */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<AllUsers />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/edit/:id" element={<UpdateUser />} />
            </>
          ) : (
            navigate("/") // Redirect unauthenticated users to AuthForm
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
