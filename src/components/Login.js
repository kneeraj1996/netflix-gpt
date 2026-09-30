import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    console.log(email.current.value);
    console.log(password.current.value);

    //Handle
    const message = checkValidData(
      email.current.value,
      password.current.value,
      fullName.current ? fullName.current.value : "",
      isSignInForm,
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //signup logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMoDAZbOAdKUDP3oa7JkeXK5H5beqi-bjZzRY7Q-bWw&s=10",
          })
            .then((res) => {
              console.log("user of registeration===", user);
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
              navigate("/browse");

              //    const myForm = document.getElementById("myForm");
              //     myForm.reset();
              //     setErrorMessage("");
            })
            .catch((error) => {
              setErrorMessage(error.code + "-" + error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + "-" + error.message);
        });
    } else {
      //sign in logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user coming===", user);

          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + "-" + error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4263c437-c678-4724-ad80-e3ba0dc8761e/web/IN-en-20260921-TRIFECTA-perspective_95810136-2c4a-4ab4-a323-50418521e261_large.jpg"></img>
      </div>
      <form
        id="myForm"
        onSubmit={(e) => e.preventDefault()}
        className=" p-12 bg-black w-3/12 mx-auto right-0 left-0 my-36 absolute text-white rounded-sm bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full rounded-sm bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full rounded-sm bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full rounded-sm bg-gray-700"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="py-4 my-6 bg-red-700 w-full rounded-sm"
        >
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="py-6 cursor-pointer">
          {isSignInForm
            ? "Are you new to Netflix? Sign up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
