import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import "./SignIn.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  //signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../Config/firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to the Login component after successful sign-in
      navigate("/components/Login");
    } catch (err) {
      console.error(err);
    }
  };
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/components/Login");
    } catch (err) {
      alert("user not found/Input your credentials");
    }
  };
  console.log(auth?.currentUser?.email);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Navigate to the Login component after successful sign-in
      navigate("/components/Login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-profile">
      <div className="sub-user-profile">
        <input
          className="email-field"
          placeholder="email"
          type="text"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password-field"
          placeholder="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button className="sign-button" onClick={signUp}>
            Sign Up
          </button>
          <button className="sign-button" onClick={signIn}>
            Sign In
          </button>
          <br />
          <button className="signIn-google" onClick={signInWithGoogle}>
            <i class="fa fa-google"></i>
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
